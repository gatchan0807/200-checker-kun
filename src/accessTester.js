const puppeteer = require('puppeteer');
const moment = require('moment');

class AccessTester {
  static async access(testTarget, opt) {
    // ブラウザの初期設定
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 3000,
      defaultViewport: {
        width: 1440,
        height: 990
      }
    });
    const page = await browser.newPage();
    await page.setCookie({
      domain: 'smocca.jp',
      name: 'popup_visited',
      value: 'true'
    });

    // アクセス
    const response = await page.goto(testTarget.url);

    // スクリーンショット取得
    if (opt.hasOwnProperty('withImage') && opt.withImage) {
      await page.screenshot({
        path: `./screenshot/${testTarget.title}-${moment().format('YYYYMMDDhhmm')}.jpg`
      });
    }

    let result = {
      title: testTarget.title,
      responseCode: response.headers().status,
      url: testTarget.url
    };

    // 後処理
    await browser.close();

    return result;
  }
}

module.exports = AccessTester;
