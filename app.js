const axios = require('axios');
const fs = require('fs');
const Path = require('path');
const jwt = require("jsonwebtoken");
const program = require('commander');

program.requiredOption('-b, --bid <type>', 'require book id')
    .requiredOption('-p, --page <type>', 'require page')
    .option('-r, --redownlod <items>', 'Fill in the number of pages that need to be downloaded again',commaSeparatedList);
program.parse(process.argv);
const bid = `${program.bid}`;
const page = `${program.page}`;
const r = program.redownlod;
const tokenUrl = "https://lib-nuanxin.wqxuetang.com/v1/read/k?bid=" + bid;
const secret = 'g0NnWdSE8qEjdMD8a1aq12qEYphwErKctvfd3IktWHWiOBpVsgkecur38aBRPn2w';
const referer = 'https://lib-nuanxin.wqxuetang.com/read/pdf/3207897';
let downloadLink = 'https://lib-nuanxin.wqxuetang.com/page/img/';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function commaSeparatedList(value, dummyPrevious) {
    return value.split(',');
}

function getToken(url,p) {
    axios.get(url).then(res => {
        var k = JSON.stringify(res.data.data);
        var t = Date.parse(new Date());
        var iat = t / 1000;
        var payload = {
            "p": p,
            "t": t,
            "b": bid,
            "w": 1000,
            "k": k,
            "iat": iat
        };
        var token = jwt.sign(payload, secret);
        var link = downloadLink + bid + '/' + p + '?k=' + token;
        download(link,p)
    })
}

function download(url,p) {
    var filename = p + '.jpeg';
    fs.mkdir(bid+"",err => {});
    var path = Path.resolve(__dirname, bid+"", filename);
    axios.get(url, {responseType: 'stream',headers:{referer: referer}}).then(res => {
        res.data.pipe(fs.createWriteStream(path));
    })
}




const run =async  () => {
    for(let i=1;i<=page;i++) {
        console.log("正在下载第"+i+"页");
        getToken(tokenUrl,i);
        await sleep(1000);
    }
    console.log("下载完成,Ctrl+c退出程序")
};

const rerun =async () => {
    for (j = 0; j < r.length; j++) {
        console.log("正在重新下载第"+r[j]+"页");
        getToken(tokenUrl, r[j]);
        await sleep(1000);
    }
    console.log("下载完成,Ctrl+c退出程序")

};

if(r) {
    rerun()
} else {
    run();
}
