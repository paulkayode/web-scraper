const crawl = require('./crawl');

test('Testing Normalise Url',()=>{
     const testUrls = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path', 'http://blog.boot.dev/path/','http://blog.boot.dev/path','blog.boot.dev','blog.boot.dev/path']
     const expected = 'blog.boot.dev'
     for(let testUrl of testUrls){
        expect(crawl.normaliseURL(testUrl)).toBe(expected);
     }
});