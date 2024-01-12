const crawl = require('./crawl');
const { normaliseURL, getUrlsFromHtml}= crawl

test('Testing Normalise Url',()=>{
     const testUrls = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path', 'http://blog.boot.dev/path/','http://blog.boot.dev/path','blog.boot.dev','blog.boot.dev/path']
     const expected = 'blog.boot.dev'
     for(let testUrl of testUrls){
        expect(normaliseURL(testUrl)).toBe(expected);
     }
});

test('Testing get Url from Html', () =>{
   const testCases = {
      '<html>\
      <body>\
         <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>\
      </body>\
      </html>\
      ': ['https://blog.boot.dev'],
    
      '<html>\
      <body>\
         <a href="https://example.com">Example</a>\
         <a href="https://google.com">Google</a>\
         <a href="https://github.com">GitHub</a>\
      </body>\
      </html>\
      ': ['https://example.com', 'https://google.com', 'https://github.com'],
    
      '<html>\
      <body>\
         <a href="https://example.com">Example</a>\
         <a href="https://example.com/path1">Path 1</a>\
         <a href="https://example.com/path2">Path 2</a>\
      </body>\
      </html>\
      ': ['https://example.com', 'https://example.com/path1', 'https://example.com/path2'],
    
      '<html>\
      <body>\
         <a href="https://example.com">Example</a>\
         <a href="https://example.com/path1">Path 1</a>\
         <a href="https://example.com/path2">Path 2</a>\
         <a href="https://example.com/path3">Path 3</a>\
      </body>\
      </html>\
      ': ['https://example.com', 'https://example.com/path1', 'https://example.com/path2', 'https://example.com/path3'],
    };
      
    for( let [testinput, expectedResult] of Object.entries(testCases)){
      const actualResult = getUrlsFromHtml(testinput);
      expect(actualResult).toBe(expectedResult);
    }

      
})


