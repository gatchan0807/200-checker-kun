const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: '0.05',
  failureThresholdType: 'percent'
});
expect.extend({ toMatchImageSnapshot });

describe('smocca', () => {
  fs.readFile('./master/urlLinks.csv', 'utf8', function(err, text) {
    let accessTestList = Converter.convertToJson(text);
    console.dir(accessTestList);

    accessTestList.forEach(element => {
      describe(element.title, () => {
        beforeEach(async () => {
          // 初回アクセス時のポップアップを非表示化
          await page.setCookie({
            domain: 'smocca.jp',
            name: 'popup_visited',
            value: 'true'
          });
          await page.goto(element.url);
        });
      
        it('初期表示', async () => {
          expect(await page.screenshot()).toMatchImageSnapshot();
        });
      });
    });
  });
});
