# wqxuetang
wqxuetang🕷🕷🕷

## 安装依赖
```shell script
$ npm install
```

## 使用
访问`https://lib-nuanxin.wqxuetang.com`找到一本书,点击阅读,查看该书的id以及页数
```shell script
$ node app.js -b 书的id -p 页数

[-b]:   书的id
[-p]:   书的总页数
[-r]:   需要重新下载的页数
```
## 例子
```shell script
# To download this book https://lib-nuanxin.wqxuetang.com/read/pdf/3209072
$ node app.js -b 3209072 -p 393

# To download again page 2 and 34 
$ node app.js -b 3209072 -p 393 -r 2,34
```

[图片转PDF](https://gist.github.com/sinceNa/a5f308719f88d61e95152a73e27db3ee)





