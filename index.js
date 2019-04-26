const fs = require('fs');
const moment = require('moment');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const Converter = require('./src/converter');
const AccessTester = require('./src/accessTester');
const ArgChecker = require('./src/argChecker.js');

const EmulatePatternList = require('./src/emulatePatternList.js');

const CSV_FILE_TITLES = 'ページ名,HTTPレスポンスコード,URL\n';
GLOBAL_FILE_SUFFIX = moment().format('YYYYMMDDHHmm');

fs.readFile('./master/links.csv', 'utf8', async function(_, text) {
  let accessTestList = Converter.convertToJson(text);
  let opt = {};
  let puppeteerOption = {
    args: ['--no-sandbox'],
    timeout: 3000,
    defaultViewport: {
      width: 1440,
      height: 990
    }
  };

  // スクリーンショット撮影設定
  if (ArgChecker.hasImageOpt(process.argv)) {
    opt.withImage = true;
  }

  // エミュレーター設定
  if (ArgChecker.hasEmulateOpt(process.argv)) {
    const emluatePatternArg = ArgChecker.getEmulateArg(process.argv);
    if (emluatePatternArg !== null) {
      let deviceName = EmulatePatternList.findEmulatePattern(emluatePatternArg);
      opt.emulatePattern = devices[deviceName];
    }
  }

  // 調査結果ファイル初期化
  fs.appendFileSync(
    `./result/result-${GLOBAL_FILE_SUFFIX}.csv`,
    CSV_FILE_TITLES
  );
  
  // ブラウザ初期化
  let browser = await puppeteer.launch(puppeteerOption);

  // アクセス開始
  let asyncAccessList = [];
  accessTestList.map(targetData => {
    asyncAccessList.push(asyncAccess(browser, targetData, opt));
  });

  // ブラウザ後処理（終了）
  await Promise.all(asyncAccessList).then(() => {
    browser.close();
  });
});

async function asyncAccess(browser, targetData, opt) {
  // アクセス実行
  let result = await AccessTester.access(browser, targetData, opt);

  // レポート結果テキスト生成
  let convertedResult = `${result.title},${result.responseCode},${result.url}\n`;

  // レポート書き込み
  fs.appendFileSync(
    `./result/result-${GLOBAL_FILE_SUFFIX}.csv`,
    convertedResult
  );
}
