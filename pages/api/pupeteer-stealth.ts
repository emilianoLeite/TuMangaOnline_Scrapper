// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
import puppeteer from 'puppeteer-extra'

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())


export const stealh = (mangaPage: string) => {

  // puppeteer usage as normal
  puppeteer.launch().then(async browser => {
    console.log('Running tests..')
    const page = await browser.newPage()
    await page.goto(`https://lectortmo.com/library/manga/${mangaPage}`, {
      waitUntil: 'domcontentloaded'
    }) //catch error here
    const x = await page.$('body') //catch error here also
    // await page.evaluate()
    // console.log(`json`, await x?.$(`div`).then((x) => x.));
    
    await browser.close()
    console.log(`All done, check the screenshot. ✨`)
  })
  
}