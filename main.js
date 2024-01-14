const { argv } = require('node:process');
const { crawlPage } = require('./crawl');

async function main(){
     if(argv.length !== 3){
        console.log(`Incorrect amount of arguments ${argv.length -2} arguments provided, only one Argument is Needed`);
        return 0;
     }
     let baseUrl = argv[2];
     console.log(`web-crawler starting at ${baseUrl}`);
     const pages = await crawlPage(baseUrl,baseUrl, {});
     console.log(pages);
}

main()