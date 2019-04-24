const moment = require('moment');

class AccessTester {
  static async access(browser, testTarget, opt) {
    // ブラウザ（タブ）の初期設定
    const page = await browser.newPage();
    await page.setCookie({
      domain: 'smocca.jp',
      name: 'popup_visited',
      value: 'true'
    });

    // アクセス
    console.log(`Access to: ${testTarget.url}`)
    const response = await page.goto(testTarget.url);

    // スクリーンショット取得
    if (opt.hasOwnProperty('withImage') && opt.withImage) {
      await page.screenshot({
        path: `./screenshot/${testTarget.title}-${moment().format(
          'YYYYMMDDhhmm'
        )}.jpg`
      });
    }

    let result = {
      title: testTarget.title,
      responseCode: response.headers().status,
      url: testTarget.url
    };

    // 後処理
    await page.close();

    return result;
  }
}

module.exports = AccessTester;
