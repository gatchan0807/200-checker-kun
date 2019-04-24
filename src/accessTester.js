class AccessTester {
  static async access(testTarget) {
    const puppeteer = require('puppeteer');

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      timeout: 30000
    });
    const page = await browser.newPage();
    await page.setCookie({
      domain: 'smocca.jp',
      name: 'popup_visited',
      value: 'true'
    });

    await page.goto(testTarget.url);
    await page.screenshot({
      path: './screenshot/' + testTarget.title + '.jpg'
    });
    await browser.close();
  }
}

module.exports = AccessTester;
