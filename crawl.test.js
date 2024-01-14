const crawl = require('./crawl');
const { normaliseURL, getUrlsFromHtml}= crawl

test('Testing Normalise Url', () => {
   const testUrls = [
      'https://blog.boot.dev/path/',
      'https://blog.boot.dev/path',
      'http://blog.boot.dev/path/',
      'http://blog.boot.dev/path',
      'https://blog.boot.dev',
      'https://blog.boot.dev/path',
      'https://example.com',
      'https://example.com/path1',
      'https://example.com/path2',
      'https://example.com/path3',
   ];
   const expected = [
      'blog.boot.dev/path',
      'blog.boot.dev/path',
      'blog.boot.dev/path',
      'blog.boot.dev/path',
      'blog.boot.dev',
      'blog.boot.dev/path',
      'example.com',
      'example.com/path1',
      'example.com/path2',
      'example.com/path3',
   ];
   for (let i = 0; i < testUrls.length; i++) {
      expect(normaliseURL(testUrls[i])).toBe(expected[i]);
   }
});

test('Testing get Url from Html', () =>{
   const baseUrl = "https://blog.boot.dev"
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
      
      '<html>\
      <body>\
         <a href="/relative-url">Relative URL</a>\
         <a href="/relative-url1">Relative URL 1</a>\
         <a href="/relative-url2">Relative URL 2</a>\
      </body>\
      </html>\
      ': ['https://blog.boot.dev/relative-url', 'https://blog.boot.dev/relative-url1', 'https://blog.boot.dev/relative-url2'],
      
      
      '<html>\
      <body>\
         <a href="https://example.com/path1">Path 1</a>\
         <a href="https://example.com/path2">Path 2</a>\
         <a href="https://example.com/path3">Path 3</a>\
      </body>\
      </html>\
      ': ['https://example.com/path1', 'https://example.com/path2', 'https://example.com/path3'],
      
      '<html>\
      <body>\
         <a href="https://example.com/path1">Path 1</a>\
         <a href="https://example.com/path2">Path 2</a>\
         <a href="https://example.com/path3">Path 3</a>\
         <a href="https://example.com/path4">Path 4</a>\
      </body>\
      </html>\
      ': ['https://example.com/path1', 'https://example.com/path2', 'https://example.com/path3', 'https://example.com/path4'],
    };
      
    for( let [testinput, expectedResult] of Object.entries(testCases)){
      const actualResult = getUrlsFromHtml(testinput,baseUrl);
      expect(actualResult).toEqual(expectedResult);
    }
   
      
})
