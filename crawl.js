
function normaliseURL(url) {
    let i = 0;
    while(url[i] !== '/')i++;
    while(url[i] === '/')i++;
    let j = i;
    while(url[j] !== '/')j++;
    return url.slice(i,j);
}

module.exports = {
    normaliseURL
}