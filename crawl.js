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

module.exports = {
    normaliseURL,
    getUrlsFromHtml
}