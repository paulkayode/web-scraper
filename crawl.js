
function normaliseURL(url) {
    let i = 0;
    while(url[i] !== '/' && i < url.length)i++;
    if(i >= url.length || (i +1 < url.length && url[i+1] !== '/')) i = 0;
    while(url[i] === '/' && i < url.length)i++;
    let j = i;
    while(url[j] !== '/' &&  j < url.length)j++;
    return url.slice(i,j);
}

module.exports = {
    normaliseURL
}