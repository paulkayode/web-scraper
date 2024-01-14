const {JSDOM} = require('jsdom');

function normaliseURL(url) {
    let urlobject = new URL(url);
    let fullUrl = `${urlobject.hostname}${urlobject.pathname}`;
    if(fullUrl.length > 0 && fullUrl[fullUrl.length -1] == '/'){
      return fullUrl.slice(0,-1);
    }
    return fullUrl;
}

function  getUrlsFromHtml(htmlBody, baseUrl){
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    const ans = []
    for(let i = 0; i < anchors.length; i++){
        let url = anchors[i].getAttribute('href');
        if(url[0] !== '/'){
            ans.push(url);
        }else{
           ans.push(new URL(url,baseUrl).href)
        }
    }
    return ans;
}

async function crawlPage(url,currentUrl, pages){
    const currUrl = new URL(currentUrl);
    const baseUrl = new URL(url);
    if(currUrl.hostname !== baseUrl.hostname){
        return pages;
    }
    const normalisedUrl = normaliseURL(currentUrl)
    if(normalisedUrl in pages){
      if(currentUrl !== url){
        pages[normalisedUrl]++;
      }
      return pages;
    }
    if(currentUrl === url){
      pages[normalisedUrl] = 0;
    }else{
      pages[normalisedUrl] = 1;
    }
    console.log("crawling " + currentUrl);
    let htmlBody = '';
    try{
    const response = await fetch(currentUrl)
    if(response.status >= 400){
        console.log(`Error error-code: ${response.status}`);
        return pages;
    }
    if(!response.headers.get('content-type').includes('text/html')){
        console.log(`Error content-type: ${response.headers.get('content-type')}`);
        return pages;
    }
    htmlBody = await response.text();
  }catch(err){
    console.log(err.message);
    return pages;
}
    const listUrls = getUrlsFromHtml(htmlBody,url);
    for(let i = 0; i < listUrls.length; i++){
        pages = await crawlPage(url, listUrls[i], pages);
    }
    return pages;
}

module.exports = {
    normaliseURL,
    getUrlsFromHtml,
    crawlPage
}