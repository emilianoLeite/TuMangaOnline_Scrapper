import HCCrawler from 'headless-chrome-crawler';

export const crawlMangaPage = async (mangaPage: string) => {
  const crawler = await HCCrawler.launch({
    // headless: false, slowMo: 10,
    obeyRobotsTxt: false,
    // Function to be evaluated in browsers
    evaluatePage: (() => ({
      title: $('body').text()
    })),
    // Function to be called with evaluated results from browsers
    onSuccess: (result => {
      console.log(typeof result);
    }),
    onError: (result => {
      console.error(result);
    }),
    // cookies: [{name: "Cookie", value: "remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6Ijd3czdUQktKWmxaM1VUTzNHbjc3RXc9PSIsInZhbHVlIjoiNU8rY0tObkU5V09kZVI3Y0RcL21WWFFhZ21seXVQeDdlTHo3V3RodzhDdm1zREdXd0FDdE5QVGtlcFBNZ1wvMnhFbWtqVkVHZlVja1VOODI3a2F1amU3ZWJtaWU4YTgrbUhCdHY0YjFtbzMrWDlGdG55K3poeEwrcW5xbWJON0hoSFk3NktQQVFzalphOG5JTSt0WVplNnkyWVNtOFl2cFFGVFFVMHhjcGNqYjBydXEwckx6c2RcL2xBNEZTOEQzWmtwOUdFaG1la0tyZGJRa2FoNlJLRVd3TWN1amE3bG82RXBPKzRIZTBVQjVMWT0iLCJtYWMiOiJlMmM4MDM4N2M2MzQyNGQzYWUzODJkYTAzM2IxYjhjNGQzYzhjM2QyN2Y0ZGNlYjJjNGNmNT…SNzErWlBBQ213VFpJdUZsWVZZUTFTbVdlRUxoNkhEVjJUbXlyOXRiT2ciLCJtYWMiOiIwNWZiMGU0ZWZlOTA0ODY1YjZkYjk2MTgxOWYxNDY4MTkzY2MwYjJhNWQzYjNjZWMwYjk3OWQ3ZTYwMTM5ZDYyIn0%3D; tumangaonline_session=eyJpdiI6InpNWU83TjlVczJkcnV2RmVoNG83dEE9PSIsInZhbHVlIjoiQlVEZW5tZTV5UnB5empCUnNRdkNsbDArcXlqSFExMkZPb2tWd2poV1hXMU1UNzJFR2RTSWpwcnp6b09HR0Z3K0VKK01aWnYwTUh0UktudDlDODV4OUZTb1N2N0hMXC96Mkh4ZDNTdVFmMk1weHRRR05uQzZOR2Y3SHhHTExYRlhNIiwibWFjIjoiMzNhNmZiYjVlYTU1NzcyN2UxZWY3YjA5NDAyZjUwYmZmZTgyZjg1ZWIwY2NmNDg1NDMwNTMyNzExMjQzZGI3NiJ9"}]
    retryCount: 1
  });
  // Queue a request
  await crawler.queue(`https://lectortmo.com/library/manga/${mangaPage}`);
  // Queue multiple requests
  // await crawler.queue(['https://example.net/', 'https://example.org/']);
  // // Queue a request with custom options
  // await crawler.queue({
  //   url: 'https://example.com/',
  //   // Emulate a tablet device
  //   device: 'Nexus 7',
  //   // Enable screenshot by passing options
  //   screenshot: {
  //     path: './tmp/example-com.png'
  //   },
  // });
  await crawler.onIdle(); // Resolved when no queue is left
  await crawler.close(); // Close the crawler
}