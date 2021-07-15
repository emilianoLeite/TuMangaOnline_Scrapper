// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
import puppeteer from 'puppeteer-extra'

// add stealth plugin and use defaults (all evasion techniques)
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
import assert from "assert";

type Chapter = {
  chapterNumber: number
  title: string | undefined
}

function parseChapterName(rawChapterName: string): Chapter {
  const splitChapterName = rawChapterName.split(':').map(x => x.trim())
  const chapterHeader = splitChapterName[0]
  const title = splitChapterName[1] as string | undefined /* if String.split does not find the separator, 
  it'll return a single element array */

  const chapterNumberRegex = /Capítulo\s([0-9]+\.[0-9]+)/ // Exmaple: "Capítulo 229.50"
  const regexMatch = chapterHeader.match(chapterNumberRegex)
  
  assert(regexMatch != null, "Chapter regex failed")
  const chapterNumber = parseFloat(regexMatch[1])

  return {chapterNumber, title}
}

export const getChapterList = async (mangaPage: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log(`Fetching ${mangaPage}...`);
  
  try {
    await page.goto(`https://lectortmo.com/library/manga/${mangaPage}`, {
      waitUntil: 'domcontentloaded'
    });
  } catch (fetchError) {
    console.error(`Error fetching ${mangaPage}: ${fetchError}`);

    await browser.close();
     
    throw fetchError;
  }

  try {
    const listItems = await page.$$eval(
      "#chapters > ul.list-group > li.list-group-item",
      (chapterListItems) => {
        return (chapterListItems as HTMLElement[]).map((li) => li.innerText);
      }
    );

    assert(listItems.length > 0, "No .list-group-item found")

    return listItems.map(parseChapterName);
  } catch (parseError) {
    console.error(`Error parsing ${mangaPage}: ${parseError}`);

    throw parseError;
  } finally {
    browser.close();
  }
  
}