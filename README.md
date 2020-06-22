# 基于Ant Design Pro 开发 ，项目名：OA-System


### Overview

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 开发的OA办公系统

Vue 开发的OA系统 

- 具有工作流动态审批、加签、会签等工作流功能，可以对工作流程的审批业务进行评论/讨论
- 具有文档预览、图片预览等功能
- 具有博客编写、预览、查看、搜索等功能
- 具有社区、问答等功能
- 具有OA系统常用功能
- 具有在线网盘等功能
- 工作流引擎完全手写且开源，可以类似钉钉/飞书那样，动态选择审批人员。
- 目前最新代码仓库：[https://gitee.com/shengtaii/oa-system](http://https://gitee.com/shengtaii/oa-system)（因为目前此仓库容量超限，故转移到其他仓库，最新代码用这个仓库）

### 开发教程

 _Wiki文档：[https://gitee.com/yunwisdoms/oa-front-service/wikis/OA%20System%20介绍](https://gitee.com/yunwisdoms/oa-front-service/wikis/OA%20System%20%E4%BB%8B%E7%BB%8D)_ 

### Docker启动

#### MySQL数据库

```docker run -p 3306:3306 --name oa-mysql-service -v $PWD/conf/my.cnf:/etc/mysql/my.cnf -v $PWD/logs:/logs -v $PWD/data:/mysql_data -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7```

_启动前请先准备数据库配置文件，my.cnf里面注意配置数据库大小写不明感，否则后端服务可能启动报错,数据库启动后请使用初始化脚本导入数据库即可。_

 _最新数据库脚本地址：`https://cdn.jsdelivr.net/gh/Miazzy/jeecg-database@lastest//2020-04-26-jeecg.sql.gz`。导入前先建数据库默认名称 `jeecg` , 数据库脚本请用vim打开，否则乱码，然后` :w xxx.sql `进行另存为SQL_ 

 _数据库建表语句 `CREATE DATABASE db_name DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci; ` 可以把字符集换成 `utf8mb4`_ 

  _如果事先未准备配置文件，则直接启动 `docker run -p 3306:3306 --name oa-mysql-service -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7` 然后手动到/etc/mysql/my.cnf修改配置即可，执行命令 `vim /etc/mysql/mysql.conf.d/mysqld.cnf` ， 配置文件里面添加一行  `lower_case_table_names=1`_  

![输入图片说明](https://images.gitee.com/uploads/images/2020/0427/120743_17ca7ae7_499098.png "截屏2020-04-2712.07.15.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0427/141556_a52a9aca_499098.png "截屏2020-04-2714.15.33.png")

> 注：`docker run -d -p 3306:3306 yunwisdom/oa-mysql-service` 这个是预装后sql的docker容器


#### 后端项目

```docker run --name oa-api-service -p 8082:8080 docker.io/yunwisdom/oa-api-service```

[默认启动后连接的远程数据库地址，请启动后，进入find / -name application-dev.yml 里面修改mysql连接地址 redis连接地址]

_输入以上命令，即可快速启动后端项目，访问地址 `http://10.8.0.1:8082/jeecg-boot/` 可以看见接口文档信息，即启动无误，启动无误后，请修改容器里面tomcat/webapps/.../application-dev.yml里面的数据库连接地址为你本地数据库连接地址_

#### 前端项目

```docker run --name oa-vue-service -p 8080:80 -p 8443:443 docker.io/yunwisdom/oa-vue-service```

[默认启动后可以登录，但是请修改docker容器里面的/etc/nginx/nginx.conf里面配置，里面的服务连接的远程后端服务，改成本地后端服务的ip地址即可，重启nginx即可]

_输入以上命令，即可快速启动前端项目，访问地址：`http://127.0.0.1:8080` `账户：zhaoziyu/Miazzy@163.com$`，如果端口占用，切换其他端口即可。_ 

#### MySQL-Rest-API服务

``` docker run -d --name oa-xmysql-service -p 3000:80 -e DATABASE_HOST=mysql_host -e DATABASE_USER=root -e DATABASE_PASSWORD=password -e DATABASE_NAME=sys markuman/xmysql:0.4.2 ```

_输入以上命令，即可快速启动RestAPI服务,访问 `http://127.0.0.1:3000/_health`，如果看见如下信息：`{"process_uptime":735.626,"mysql_uptime":"1691940"}` 即启动成功，注意：数据库地址、账户、密码、数据库名请修改为本地数据库信息_

#### 文档预览服务

```docker run -d --name oa-fileview-service -p 30001:8012 --restart always docker.io/yunwisdom/oa-fileview-service```

_输入以上命令，即可快速启动文档预览服务，访问`http://127.0.0.1:30001`,可以上传文档进行预览，关于文档预览服务更多信息，请搜索kkfileview_

#### 文档资料showdoc服务
```docker run -d -p 4999:80 --restart=always --name oa-showdoc-service yunwisdom/oa-showdoc-service```

_输入以上命令，即可快速启动showdoc文档服务，访问`https://showdoc.shengtai.club/web/#/user/login`, 可以编辑文档进行预览类似雀语，第一次请默认创建公司账户admin/admin，后续会自动登录此账户，因为这个文档服务，主要是用于展示OA系统的规章制度，共享资料的，只需要一个账户就行了，关于文档预览服务更多信息，请Github上搜索showdoc_


### 源码地址

 - github: https://github.com/Miazzy/oa-front-service 
 
 - gitee: https://gitee.com/yunwisdoms/oa-front-service  

 - 注意：由于码云仓库最大只支持5G空间，现在容量不足，已经无法提交，故最新代码提交至github仓库，目前由于开发文档、部署文档尚未编写，在后续将抽空编写


### 后端项目

 - gitee: https://gitee.com/yunwisdoms/oa-back-service


### 依赖项目

- https://gitee.com/yunwisdoms/xmysql (数据库API接口Rest服务)
- https://gitee.com/kekingcn/file-online-preview.git (文档预览服务)
- https://gitee.com/yunwisdoms/imgproxy.git (图片压缩、在线裁剪、在线处理服务)
- https://gitee.com/jeecg/jeecg-boot.git (SpringBoot后端服务,本项目的后端是jeecg-boot改造的，用原始的jeecg-boot也是支持)
- https://gitee.com/sendya/ant-design-pro-vue.git (本项目前端项目由这个开源项目改造而来)
- https://gitee.com/vilson/vue-projectManage.git (本项目的项目管理系统，就是把这个集成过来，尚未完成)
- https://gitee.com/miazzy/mili (米粒网开源社区的项目，集成到本项目，提供社区论坛，第三方博客功能)
- https://gitee.com/june000/lemon-im (聊天项目，后续集成)

### 预览地址

- https://www.shengtai.club 
`zhaoziyu/Miazzy@163.com ` 
`admin/admin@123 `
`zhaoziyun/zhaoziyun@123 `

### 部署文件
- 部署本地mysql数据库 （支持mysql5.7/mysql8.0 , 数据库SQL传送门：https://gitee.com/yunwisdoms/jeecg-database-sync , 下载最新的一个sql.gz，然后用vim打开即可）
- 部署本地redis缓存服务器 （redis-4/redis-5）
- 部署xmysql (xmysql要配置本地的mysql数据库，xmysql项目有配置教程，传送门：https://gitee.com/yunwisdoms/xmysql)
   ```
    ## 使用PM2启动xmysql服务
    pm2 start xmysql -h yourmysqlurl.mysql.rds.aliyuncs.com -u username -p password -d jeecg --watch -i 1
   ```
- https://www.shengtai.club/apache-tomcat.tar （下载解压缩，修改里面的application-dev.yml里面数据库连接地址,Redis连接地址）
- git clone https://gitee.com/yunwisdoms/oa-front-service . (克隆本项目，yarn install后，yarn run serve 运行测试环境，测试环境请修改index.html中的后端服务器、rest服务器连接地址，其他文档预览，图片裁剪的暂时不管)
- 前端部署打包，在前端项目中运行 yarn run build , 然后将打包后的目录放入Nginx的html文件夹中，配置nginx服务器
- 部署Nginx ，请先确保安装docker， ```docker run --name docker-nginx -p 80:80 -p 8080:80 -p 443:443 -p 8443:443 nginx``` (未安装docker不影响哈，自行在linux上部署nginx即可 ，然后把 打包后的前端目录放入Nginx对应的目录中，修改Nginx配置，在下文中列出了一个线上版本的Nginx配置文件)


### 前端技术

- 基础框架：[ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- JavaScript 框架：Vue
- Webpack
- node
- yarn
- eslint
- @vue/cli 3.2.1
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - Alipay AntV 数据可视化图表
- [Viser-vue](https://viserjs.github.io/docs.html#/viser/guide/installation) - antv/g2 封装实现

### 项目下载和运行

- 拉取项目代码

```bash
git clone https://gitee.com/yunwisdoms/oa-front-service.git .
```

- 安装依赖

```
yarn install
```

- 开发模式运行

```
yarn run serve
```

- 编译项目

```
yarn run build
```

- Lints and fixes files

```
yarn run lint
```


### 其他说明

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请更新您的 cli

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码

- 修改 Ant Design 配色，在文件 `vue.config.js` 中，其他 less 变量覆盖参考 [ant design](https://ant.design/docs/react/customize-theme-cn)

官方说明

```ecmascript 6
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  }
```

### 项目截图

首页，含有我的待办，我的已办，行政公告，红头文件，新闻资讯，市场观察等内容，提交审批后，待处理人会收到我的待办消息，点击进入我的审批详情进行审批操作

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/171825_bc44836f_499098.png "截屏2020-06-12 17.15.30.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/171833_e82a0263_499098.png "截屏2020-06-12 17.15.38.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/171842_c312b329_499098.png "截屏2020-06-12 17.15.45.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/171851_0ae59a61_499098.png "截屏2020-06-12 17.15.52.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/171900_8f8056ee_499098.png "截屏2020-06-12 17.16.02.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/232242_0c9d86bf_499098.png "截屏2020-06-12 17.16.08.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/232258_64499246_499098.png "截屏2020-06-12 17.16.21.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/232316_6948bc08_499098.png "截屏2020-06-12 17.16.33.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/232332_b87d457b_499098.png "截屏2020-06-12 17.16.40.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/232408_200081c1_499098.png "截屏2020-06-12 17.16.49.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0612/232427_5b815073_499098.png "截屏2020-06-12 17.17.15.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0313/161147_e437d684_499098.png "截屏2020-03-1316.11.18.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0312/162306_d845abf5_499098.png "截屏2020-03-1216.21.37.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0313/122638_7672c492_499098.png "截屏2020-03-1312.25.59.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0312/162319_13d5c4be_499098.png "截屏2020-03-1216.21.45.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0316/200729_c7371e52_499098.png "截屏2020-03-1620.06.34.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0316/202131_ea6df10f_499098.png "截屏2020-03-1620.20.40.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0317/190850_ea46ffdb_499098.png "截屏2020-03-1719.08.21.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0317/190909_625cbc9d_499098.png "截屏2020-03-1719.08.59.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0317/193228_07f89f73_499098.png "截屏2020-03-1719.30.57.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0324/204911_be57a82c_499098.png "截屏2020-03-2420.48.11.png")

![整合问卷调查](https://images.gitee.com/uploads/images/2020/0402/232532_d4d214ef_499098.png "截屏2020-04-0223.25.18.png")

![整合问卷调查](https://images.gitee.com/uploads/images/2020/0402/232550_4f61658b_499098.png "截屏2020-04-0223.25.03.png")

![整合问卷调查](https://images.gitee.com/uploads/images/2020/0402/232603_feb7d50c_499098.png "截屏2020-04-0223.24.54.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0610/174348_da387bd2_5574915.png "截屏2020-06-10 17.17.19.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0610/174504_4a4a81ef_5574915.png "截屏2020-06-10 17.44.42.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0610/174657_eaed6944_5574915.png "截屏2020-06-10 17.46.18.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0610/174706_cbcb8f44_5574915.png "截屏2020-06-10 17.46.43.png")

### 附属文档

- [Ant Design Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn)

- [报表 viser-vue](https://viserjs.github.io/demo.html#/viser/bar/basic-bar)

- [Vue](https://cn.vuejs.org/v2/guide)

- [路由/菜单说明](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/router/README.md)

- [ANTD 默认配置项](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/defaultSettings.js)

- 其他待补充...

### 备注

> @vue/cli 升级后，eslint 规则更新了。由于影响到全部 .vue 文件，需要逐个验证。既暂时关闭部分原本不验证的规则，后期维护时，在逐步修正这些 rules

### 前端项目 Nginx配置文件示例

```
load_module modules/ngx_http_image_filter_module.so;

user  root;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    client_max_body_size 200m;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;
    include /etc/nginx/conf.d/*.conf;

    proxy_cache_path ./web_cache levels=1:2 keys_zone=web_cache:1024m inactive=1m max_size=1g;
   
    upstream cwbase {
	server 172.18.231.224:3000 weight=10 max_fails=3 fail_timeout=30s;
    }

    upstream xmysql {
        server 172.18.231.224:3000 weight=10 max_fails=3 fail_timeout=30s;
    }

    upstream fileview {
	#server 172.18.231.224:30000 weight=10 max_fails=3 fail_timeout=30;
        server 172.18.231.224:30001 weight=10 max_fails=3 fail_timeout=30;
        server 172.18.231.224:30002 weight=10 max_fails=3 fail_timeout=30;
    }

    upstream jeecg-api {
	#server 172.18.231.224:8080 weight=10 max_fails=3 fail_timeout=30;
	server 172.18.231.224:8082 weight=10 max_fails=3 fail_timeout=30;
	#server 172.18.201.235:10000 weight=10 max_fails=3 fail_timeout=30;
	#server 172.18.201.235:10002 weight=10 max_fails=3 fail_timeout=30;
    }

    server {
        listen 80;
        listen       443 ssl;
        server_name  www.shengtai.club;

	ssl_certificate /cert/www.shengtai.club.pem;
        ssl_certificate_key /cert/www.shengtai.club.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        root /usr/share/nginx/html;

        gzip on;
        gzip_min_length 1k;
        gzip_comp_level 1;
        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;

        gzip_vary on;
        gzip_disable "MSIE [1-6]\.";
        gzip_buffers 32 4k;
        gzip_http_version 1.0;

        location ^~ /api {

            rewrite ^/(.*) /$1 break;

            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';

            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_pass http://cwbase/;

        }

        location ^~ /jeecg-boot {
            proxy_pass              http://jeecg-api/jeecg-boot/;

            proxy_set_header        X-Real-IP $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;

            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';

            proxy_connect_timeout 1800s;
            proxy_send_timeout 1800s;
            proxy_read_timeout 1800s;

        }

        location ^~ /sys/ {

            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';

            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_pass http://jeecg-api/jeecg-boot/sys/;

        }

        location ^~ /jeecg-boot/sys/common/view {
            alias   /root/jeecg/upFiles/;
            index  index.html index.htm;
        }

        location ^~ /files {
            root   /root/jeecg/upFiles/;
            index  index.html index.htm;

	    add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';

        }	

        location / {

            root   /usr/share/nginx/html;
            index  index.html index.htm;

            if (!-e $request_filename) {
                rewrite ^(.*)$ /index.html?s=$1 last;
                break;
            }

            #add_header Cache-Control "no-cache, no-store";
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';

            proxy_cache web_cache;
            proxy_cache_valid 200 206 304 301 302 10d;
            proxy_cache_key  $scheme$host$request_uri;

	    proxy_connect_timeout  1800s;
	    proxy_send_timeout  1800s;
	    proxy_read_timeout  1800s;
 
	    gzip_static on;

            expires 30d;

        }

    }

    #配置文档预览
    server {

        listen       80;
        listen 443  ssl;
        server_name  fileview.shengtai.club;
        index index.html index.htm;

        ssl_certificate /cert/fileview.shengtai.club.pem;
        ssl_certificate_key /cert/fileview.shengtai.club.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        location / {
            add_header Cache-Control no-cache;
            proxy_pass http://fileview/;
	    proxy_connect_timeout  1800s;
	    proxy_send_timeout  1800s;
	    proxy_read_timeout  1800s;
            proxy_set_header   Host fileview.shengtai.club;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
        }

    }

    #配置API服务
    server {

        listen 80;
	listen 443 ssl;
        server_name  api.shengtai.club;
 
	ssl_certificate /cert/api.shengtai.club.pem;
	ssl_certificate_key /cert/api.shengtai.club.key;
	ssl_session_timeout 5m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;

        root /workspace/oa-front-system;
 
        gzip on;
        gzip_min_length 1k;
        gzip_comp_level 1;
        gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png application/vnd.ms-fontobject font/ttf font/opentype font/x-woff image/svg+xml;
 
        gzip_vary on;
        gzip_disable "MSIE [1-6]\.";
        gzip_buffers 32 4k;
        gzip_http_version 1.0;
 
        location ^~ /api {
            rewrite ^/(.*) /$1 break;
 
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
 
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 
            proxy_pass http://cwbase/;
        }
 
    }

}

```
