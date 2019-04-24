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
  if (ArgChecker.hasImageOpt(process.argv)) {
    opt.withImage = true;
  }

  let puppeteerOption = {
    args: ['--no-sandbox'],
    timeout: 3000,
    defaultViewport: {
      width: 1440,
      height: 990
    }
  };

  if (ArgChecker.hasEmulateOpt(process.argv)) {
    const emluatePatternArg = ArgChecker.getEmulateArg(process.argv);
    if (emluatePatternArg !== null) {
      let deviceName = EmulatePatternList.findEmulatePattern(emluatePatternArg);
      opt.emulatePattern = devices[deviceName];
    }
  }

  // ファイル初期化
  fs.appendFileSync(
    `./result/result-${GLOBAL_FILE_SUFFIX}.csv`,
    CSV_FILE_TITLES
  );

  let browser = await puppeteer.launch(puppeteerOption);

  let asyncAccessList = [];
  accessTestList.map(targetData => {
    asyncAccessList.push(asyncAccess(browser, targetData, opt));
  });

  await Promise.all(asyncAccessList).then(() => {
    browser.close();
  });
});

async function asyncAccess(browser, targetData, opt) {
  // アクセスチェック
  let result = await AccessTester.access(browser, targetData, opt);

  // レポート作成
  let convertedResult = `${result.title},${result.responseCode},${result.url}\n`;

  fs.appendFileSync(
    `./result/result-${GLOBAL_FILE_SUFFIX}.csv`,
    convertedResult
  );
}
