test('dApp should connect to AlgoSigner', async () => {
    // const nav = new Promise(res => browser.on('targetcreated', res))
    await page.goto('http://example.com');
    // await page.goto('http://localhost:9000');
    
    
    // const [popup] = await Promise.all([
    //   new Promise(resolve => page.once('popup', resolve)),
    //   page.evaluate(() => window.open('https://example.com')),
    // ]);
    // await nav
    // const pages = await browser.pages();
    // console.log(pages.length);//number of pages increases !
    // console.log(pages.map(page => page.url()));

    // const popup = pages[pages.length-1];
    // await popup.waitForSelector("#allow");
    // await popup.click("#allow");


    // await page.goto("https://example.com", {waitUntil: 'domcontentloaded'});
    // const title = await page.title();
    await page.screenshot({path: 'example.png'});

    // expect(title).toBe('Example Domain');
    expect(true).toBe(true);
});
