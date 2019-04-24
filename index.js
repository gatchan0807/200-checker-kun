const fs = require('fs');
const moment = require('moment');
const puppeteer = require('puppeteer');

const Converter = require('./src/converter');
const AccessTester = require('./src/accessTester');
const ArgChecker = require('./src/argChecker.js');

const CSV_FILE_TITLES = 'ページ名,HTTPレスポンスコード,URL\n';

fs.readFile('./master/urlLinks.csv', 'utf8', async function(_, text) {
  let accessTestList = Converter.convertToJson(text);
  
  let opt = {};
  if (ArgChecker.hasImageOpt(process.argv)) {
    opt.withImage = true;
  }

  // ファイル初期化
  fs.appendFileSync(
    `./result/result-${moment().format('YYYYMMDDhhmm')}.csv`,
    CSV_FILE_TITLES
  );

  let browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    timeout: 3000,
    defaultViewport: {
      width: 1440,
      height: 990
    }
  });

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
  let convertedResult = `${result.title},${result.responseCode},${
    result.url
  }\n`;

  fs.appendFileSync(
    `./result/result-${moment().format('YYYYMMDDhhmm')}.csv`,
    convertedResult
  );
}
