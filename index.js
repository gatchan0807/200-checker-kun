const fs = require('fs');

const Converter = require('./src/converter');
const AccessTester = require('./src/accessTester');

fs.readFile('./master/urlLinks.csv', 'utf8', function(err, text) {
  let accessTestList = Converter.convertToJson(text);
  console.dir(accessTestList);

  accessTestList.forEach(targetData => {
    AccessTester.access(targetData);
  });
});
