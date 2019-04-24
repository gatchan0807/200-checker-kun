class AccessTester {
  static async access(browser, testTarget, opt) {
    // ブラウザ（タブ）の初期設定
    const page = await browser.newPage();
    // エミュレーション情報の追加
    if (opt.hasOwnProperty('emulatePattern') && opt.emulatePattern) {
      page.emulate(opt.emulatePattern);
    }

    await page.setCookie({
      domain: 'smocca.jp',
      name: 'popup_visited',
      value: 'true'
    });

    // アクセス
    console.log(`Access to: ${testTarget.url}`);
    let response = await page.goto(testTarget.url, {
      waitUntil: 'networkidle2'
    });

    // スクリーンショット取得
    if (opt.hasOwnProperty('withImage') && opt.withImage) {
      await page.screenshot({
        path: `./screenshot/${testTarget.title}-${GLOBAL_FILE_SUFFIX}.jpg`
      });
    }

    let result = {};
    try {
      result = {
        title: testTarget.title,
        responseCode: response.headers().status,
        url: testTarget.url
      };
    } catch (e) {
      // FIXME: `await page.goto` しているが、エミュレートの場合謎にデータが取得できずにerrorを吐くことが有るので、エラーを吐いた場合データだけ再アクセスしている
      response = await page.goto(testTarget.url, {
        waitUntil: 'networkidle2'
      });

      result = {
        title: testTarget.title,
        responseCode: response.headers().status,
        url: testTarget.url
      };
    }
    // 後処理
    await page.close();

    return result;
  }
}

module.exports = AccessTester;
