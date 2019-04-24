const fs = require('fs');
const moment = require('moment');

const Converter = require('./src/converter');
const AccessTester = require('./src/accessTester');
const ArgChecker = require('./src/argChecker.js');

const CSV_FILE_TITLES = 'ページ名,HTTPレスポンスコード,URL\n';

fs.readFile('./master/urlLinks.csv', 'utf8', function(err, text) {
  let accessTestList = Converter.convertToJson(text);

  let opt = {};

  if (ArgChecker.hasImageOpt(process.argv)) {
    opt.withImage = true;
  }

  fs.appendFileSync(`./result/result-${moment().format('YYYYMMDDhhmm')}.csv`, CSV_FILE_TITLES);

  accessTestList.forEach(async targetData => {
    let result = await AccessTester.access(targetData, opt);

    let convertedResult = `${result.title},${result.responseCode},${result.url}\n`;
    fs.appendFileSync(`./result/result-${moment().format('YYYYMMDDhhmm')}.csv`, convertedResult);
  });
});
