// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase, getNotifications } from '../../db/mongodb';
import { getChapterList } from "./pupeteer-stealth";
import assert from "assert";

type Response = {
  error?: unknown
  [prop: string]: unknown
}

function assertValidMangaIdentifier(mangaQueryString: NextApiRequest["query"]['any']): asserts mangaQueryString is string {

  assert(typeof(mangaQueryString) === 'string', "You must supply a valid TMO manga identifier. Required query string: ?manga=<number>/<manga_name>")

  const [mangaNumber, mangaName] = mangaQueryString.split('/')

  assert(typeof(mangaNumber) === 'string', "You must supply a valid TMO manga identifier. Required query string: ?manga=<number>/<manga_name>") // Should actually check if it is a number, but this is good enough

  assert(typeof(mangaName) === 'string', "You must supply a valid TMO manga identifier. Required query string: ?manga=<number>/<manga_name>")
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  try {
    const { client, db } = await connectToDatabase()

    const isConnected = client.isConnected()

    if (isConnected) {
      getNotifications(db, async (err, result) => {

        const documents = await result.find().toArray()
        console.log('documents', documents);
      })
    }
    // } else {
      // res.status(500).json({ error: "MongoDB client is not connected" })
    // }


    assertValidMangaIdentifier(req.query.manga)
    const pageHtml = await getChapterList(req.query.manga);

    res.status(200).json({pageHtml})
  } catch(e) {
    console.error(e);

    res.status(500).json({error: e.toString()})
  }
}

