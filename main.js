const { argv } = require('node:process');


function main(){
     if(argv.length !== 3){
        console.log(`Incorrect amount of arguments ${argv.length -2} arguments provided, only one Argument is Needed`);
        return 0;
     }
     let baseUrl = argv[2];
     console.log(`web-crawler starting at ${baseUrl}`);
}

main()