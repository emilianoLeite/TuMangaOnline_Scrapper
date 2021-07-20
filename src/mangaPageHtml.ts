import fetch from 'node-fetch'
export function mangaPageHtml(mangaPage: string): Promise<string> {
  
  return fetch(`https://lectortmo.com/library/manga/${mangaPage}`, 
  // {
  //   headers: {
  //     "Host": "lectortmo.com",
  //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0)/*;q=0.8",
  //     "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
  //     "Accept-Encoding": "gzip, deflate, br",
  //     "DNT": "1",
  //     "Connection": "keep-alive",
  //     "Cookie": "XSRF-TOKEN=eyJpdiI6ImRWcXBRTk5VVEw1QVpwUytEdXVZM3c9PSIsInZhbHVlIjoiTGtQa3dmY3dkXC95NVJzaFhHTGNPU2pDc2lmc21DdUxJTGtxWURyZ2RIMXhrajJMQ1JpUmxsVmxUR1lsbm1IS0kiLCJtYWMiOiI4NGE4ZGI0NDBkMzUyYTQ4MzYzNjU3ZWVjOGNiYjVkNWUwZTE4MjFlMWY4ODYxY2VjYzc5N2YyYjU2OGMwNWNjIn0%3D; tumangaonline_session=eyJpdiI6IjlhSklRRFFjMGxSckV0K1hTUmZDVmc9PSIsInZhbHVlIjoiMFhmQ1RyVTdxaExjbDJ0NVwvV0R1bGprSFBRNGFGdVJUS1o2Y2w5TmNQNVVHWW9jSEQ4SUhVR2FnY21LNlJCMmg0bFErYTFlN3duZjBDZGFNMzluWGl6dm50a1piYldnZm5oN2pCVzBJeFZsYlhFaERtY1g1S1JIbk5PK24rQjNHIiwibWFjIjoiNTYxMjQ0M2E2MWJiMzc4MzQzNzdiYWE0OWI3YjBlOGY1NjE3Njc1Mzc4MGQ1NDhhOTJiODI3NTE0Y2UwZmQzNCJ9; __cf_bm=ba68d0573532d3d39a8d7db9e5025b6aaafbc851-1624934921-1800-ASp5KKDszikJiv/KHnRnK7mwRmp2hOz61nnGIayk35rymJUjNVS9/zoe+rxoAy3pvqXpKuo+aWpUOJ+d7b0i1RYNr6+uvfJzTv/ka3tgd3Wxh5Wlf8CYJIWobw+LcQ5nRA==",
  //     "Upgrade-Insecure-Requests": "1",
  //     "Pragma": "no-cache",
  //     "Cache-Control": "no-cache",
  //   }
  // }
  )
    .then(function(response) {
      console.log('response', response);
      
      if (response.status >= 400) {
        throw new Error(`${response.status}: Bad response from server. \n ${response.body}`);
      }
      return response.text();
    })
    .catch(function(err) {
      console.error(err);
      return err.toString();   
    })
    
}