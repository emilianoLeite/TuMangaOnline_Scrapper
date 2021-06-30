import { Router } from 'express';
import { mangaPageHtml } from "../mangaPageHtml";
const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const queryString = req.query
  console.log('query', queryString);
  
  mangaPageHtml('8428/boku-no-hero-academia').then((response) => {

    res.json({ response });
  })
});

export default router;
