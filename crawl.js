const {JSDOM} = require('jsdom');

function normaliseURL(url) {
    let i = 0;
    while(url[i] !== '/' && i < url.length)i++;
    if(i >= url.length || (i +1 < url.length && url[i+1] !== '/')) i = 0;
    while(url[i] === '/' && i < url.length)i++;
    let j = i;
    while(url[j] !== '/' &&  j < url.length)j++;
    return url.slice(i,j);
}

function  getUrlsFromHtml(htmlBody,baseUrl){
    dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    const ans = []
    for(let i = 0; i < anchors.length; i++){
        let url = anchors[i].getAttribute('href');
        if(url[0] !== '/'){
            ans.push(url);
        }else{
            ans.push(baseUrl + url)
        }
    }
    return ans;
}

async function crawlPage(url){
    try{
    const response = await fetch(url,
        {
            method: 'GET',
            mode : 'cors'
        })
    if(response.status >= 400){
        console.log(`Error error-code: ${response.status}`);
        return;
    }

    if(!response.headers.get('content-type').includes('text/html')){
        console.log(`Error content-type: ${response.headers.get('content-type')}`);
        return;
    }
    console.log(await response.text());
  }catch(err){
    console.log(err.message);
  }
}

module.exports = {
    normaliseURL,
    getUrlsFromHtml,
    crawlPage
}