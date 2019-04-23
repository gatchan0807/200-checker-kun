class AccessTester {
  static test(testTarget) {
    const { configureToMatchImageSnapshot } = require('jest-image-snapshot');
    const toMatchImageSnapshot = configureToMatchImageSnapshot({
      failureThreshold: '0.05',
      failureThresholdType: 'percent'
    });
    expect.extend({ toMatchImageSnapshot });

    describe(testTarget.title, () => {
      beforeEach(async () => {
        // 初回アクセス時のポップアップを非表示化
        await page.setCookie({
          domain: 'smocca.jp',
          name: 'popup_visited',
          value: 'true'
        });
        await page.goto(testTarget.url);
      });
    
      it('初期表示', async () => {
        expect(await page.screenshot()).toMatchImageSnapshot();
      });
    })
  }
}

module.exports = AccessTester