class AccessTester {
  static async access(browser, testTarget, opt) {
    // ブラウザ（タブ）の初期設定
    const page = await browser.newPage();

    // エミュレーション情報の追加
    let emulateUserAgent = '';
    if (opt.hasOwnProperty('emulatePattern') && opt.emulatePattern) {
      emulateUserAgent = opt.emulatePattern.name;
      page.emulate(opt.emulatePattern);
    }

    // アクセス実行
    console.log(`Access to: ${testTarget.url}`);
    let response = await page.goto(testTarget.url, {
      waitUntil: 'networkidle0',
      timeout: 0
    });

    // スクリーンショット取得
    if (opt.hasOwnProperty('withImage') && opt.withImage) {
      await page.screenshot({
        path: `./screenshot/${GLOBAL_FILE_SUFFIX}-${
          testTarget.title
        }-${emulateUserAgent}.jpg`
      });
      console.log(`Took a Screenshot of: ${testTarget.url}`);
    }

    let result = {};
    try {
      result = {
        title: testTarget.title,
        responseCode: response.status(),
        url: testTarget.url
      };
    } catch (e) {
      // FIXME: `await page.goto` しているが、エミュレートの場合謎にデータが取得できずにerrorを吐くことが有るので、エラーを吐いた場合データだけ再アクセスしている
      response = await page.goto(testTarget.url, {
        waitUntil: 'networkidle2',
        timeout: 0
      });

      result = {
        title: testTarget.title,
        responseCode: response.status(),
        url: testTarget.url
      };
    }
    // 後処理
    await page.close();

    return result;
  }
}

module.exports = AccessTester;
