// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../db/mongodb';
// import https from "https";
// import type { Collection, Db, MongoCallback } from 'mongodb';
import fetch, { Headers } from 'node-fetch';
import { crawlMangaPage } from './crawler';
import { bypassCloudFare } from "./cloudfare-bypass";

type Response = {
  error?: unknown
  [prop: string]: unknown
}

type MangaInfo = unknown;

const MANGA_NOTIFICATIONS_COLLECTION = 'mangaNotifications'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    // const { client, db } = await connectToDatabase()

    // const isConnected = client.isConnected()
    
    // if (isConnected) {
      // getNotifications(db, async (err, result) => {
        
      //   const documents = await result.find().toArray()
      //   console.log('documents', documents);
        
      //   res.status(200).json({ documents })
      // })
      // const pageHtml = await mangaPageHtml('8428/boku-no-hero-academia')
      const pageHtml = await bypassCloudFare();
      // const pageHtml = await crawlMangaPage('8428/boku-no-hero-academia')
      res.status(200).json({pageHtml})
    // } else {
      // res.status(500).json({ error: "MongoDB client is not connected" })
    // }
  } catch(e) { 
    console.error(e);
    
    res.status(500).json({error: e.toString()})
  }
}

// function mangaPageHtml2(mangaPage: string): Promise<string> {
//     var options = {
//       method: "GET",
//       hostname: 'lectortmo.com',
//       path: `/library/manga/${mangaPage}`,
//       maxRedirects: 1,
//     };
  
//     return new Promise(function (resolve, reject) {
//       var req = https.request(options, function (res) {
//         var chunks: Uint8Array[] = [];
  
//         res.on("data", function (chunk) {
//           console.log('chiunk',chunk);
          
//           chunks.push(chunk);
//         });
  
//         res.on("end", function (chunk: unknown) {
//           console.log('size', chunks.length);
//           console.log('type', chunks.map(i => typeof i).join(', '));
          
//           const result = Buffer.concat(chunks).toString()
//           console.log('result', result);
          
//           resolve(result);
//         });
  
//         res.on("error", function (error) {
//           reject("Error getting manga's HTML");
//         });
//       });
  
//       req.end();
//     });
// }
function mangaPageHtml(mangaPage: string): Promise<string> {
  var headers = new Headers();
  headers.append("Cookie", "XSRF-TOKEN=eyJpdiI6Ikdob04wZVRzUEE5ell6VGFGMkE0eEE9PSIsInZhbHVlIjoiWjU3R09aMVBrXC8yT3hnWWNXNjJVSEMya2lRTERWXC84R1VRVjc4aXZVZUJGN0tjYW5KTWdQTzJhM2ZvNFVhdHlSIiwibWFjIjoiOWU4ZDNhMTk2YTQ0ZDJiYjAzYjMyMzUzYjFlMGNmZWJhY2Y1NmEwZWY2YTI3NTNlMTA0Mjc5MDJkMWE0ODkyOSJ9; tumangaonline_session=eyJpdiI6IitWM2h2UVZMWW9PSXpmZUZTV1VwWUE9PSIsInZhbHVlIjoiVGp3MmdMeENVa2xWMDYxYldLR0FycGdpVnVralJhNGVTWnNFZzR1dFZxcEppQ2NpZlBjd2Q5aFwvTklReElJa3hvWU5UbEtIUUozbDArd2w2eXp0b1ZtakFOVk5oYVVBZzgwK2hUZm5rMFFLZ28wYVdZWCtcL0k2VVM0NU9CeWxiSCIsIm1hYyI6ImQ5YWI1ZWRjODBjNGRjMzkwZjIyZjhmMWU3ZjM3NDdhNGUwZjc3ZDYzMjY0N2JkZTZkZWEwNTk5NjU0NTI3ZTAifQ%3D%3D");
  return fetch(`https://lectortmo.com/library/manga/${mangaPage}`, 
  {
    redirect: 'follow',
    method: 'GET',
    headers,
    // headers: {
    //   "Host": "lectortmo.com",
    //   "User-Agent": "Googlebot",
    //   "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
    //   "Accept-Encoding": "gzip, deflate, br",
    //   "DNT": "1",
    //   "Connection": "keep-alive",
    //   "Cookie": "XSRF-TOKEN=eyJpdiI6ImRWcXBRTk5VVEw1QVpwUytEdXVZM3c9PSIsInZhbHVlIjoiTGtQa3dmY3dkXC95NVJzaFhHTGNPU2pDc2lmc21DdUxJTGtxWURyZ2RIMXhrajJMQ1JpUmxsVmxUR1lsbm1IS0kiLCJtYWMiOiI4NGE4ZGI0NDBkMzUyYTQ4MzYzNjU3ZWVjOGNiYjVkNWUwZTE4MjFlMWY4ODYxY2VjYzc5N2YyYjU2OGMwNWNjIn0%3D; tumangaonline_session=eyJpdiI6IjlhSklRRFFjMGxSckV0K1hTUmZDVmc9PSIsInZhbHVlIjoiMFhmQ1RyVTdxaExjbDJ0NVwvV0R1bGprSFBRNGFGdVJUS1o2Y2w5TmNQNVVHWW9jSEQ4SUhVR2FnY21LNlJCMmg0bFErYTFlN3duZjBDZGFNMzluWGl6dm50a1piYldnZm5oN2pCVzBJeFZsYlhFaERtY1g1S1JIbk5PK24rQjNHIiwibWFjIjoiNTYxMjQ0M2E2MWJiMzc4MzQzNzdiYWE0OWI3YjBlOGY1NjE3Njc1Mzc4MGQ1NDhhOTJiODI3NTE0Y2UwZmQzNCJ9; __cf_bm=ba68d0573532d3d39a8d7db9e5025b6aaafbc851-1624934921-1800-ASp5KKDszikJiv/KHnRnK7mwRmp2hOz61nnGIayk35rymJUjNVS9/zoe+rxoAy3pvqXpKuo+aWpUOJ+d7b0i1RYNr6+uvfJzTv/ka3tgd3Wxh5Wlf8CYJIWobw+LcQ5nRA==",
    //   "Upgrade-Insecure-Requests": "1",
    //   "Pragma": "no-cache",
    //   "Cache-Control": "no-cache",
    // }
  }
  )
    .then(function(response) {
      console.log('response', response);
      
      if (response.status >= 400) {
        throw new Error(`${response.status}: Bad response from server`);
      }
      return response.text();
    })
    .catch(function(err) {
      console.error(err);
      return "deu ruim"
    })
    
}

// function getNotifications(db: Db, callback: MongoCallback<Collection<any>>): void {
//   db.collection(MANGA_NOTIFICATIONS_COLLECTION, callback);
// }

// function updateMangaInfo(db: Db, mangaInfo: MangaInfo): void {
//   db.collection(MANGA_NOTIFICATIONS_COLLECTION, async (err, result) => {

//     await result.insertOne(mangaInfo)
//   });
// }