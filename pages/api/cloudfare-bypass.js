const CloudflareBypasser = require('cloudflare-bypasser');

let cf = new CloudflareBypasser();

export async function bypassCloudFare() {
  cf.request('https://lectortmo.com/library/manga/10457/black-clover')
  .then(res => {
    // res - full response
    console.log(res)
  });
}