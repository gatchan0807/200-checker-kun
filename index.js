const fs = require('fs');

const Converter = require('./spec/converter');
// const AccessTester = require('./spec/accessTester');
const AccessTester = require('./spec/pupetterTester');

fs.readFile('./master/urlLinks.csv', 'utf8', function(err, text) {
  let accessTestList = Converter.convertToJson(text);
  console.dir(accessTestList);

  accessTestList.forEach(targetData => {
    AccessTester.access(targetData);
  });
});
