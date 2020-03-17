# 基于Ant Design Pro 开发 ，项目名：VueOA


### Overview

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 开发的OA综合管理系统

Vue 开发的OA系统 

- 具有工作流动态审批、加签、会签等工作流功能，可以对工作流程的审批业务进行评论/讨论
- 具有文档预览、图片预览等功能
- 具有博客编写、预览、查看、搜索等功能
- 具有社区、问答等功能
- 具有OA系统常用功能
- 具有在线网盘等功能

### 源码地址：

github: https://github.com/Miazzy/oa-front-service
- 注意：由于码云仓库最大只支持5G空间，现在容量不足，已经无法提交，故最新代码提交至github仓库，目前由于开发文档、部署文档尚未编写，在后续将抽空编写

### 依赖项目

- https://gitee.com/yunwisdoms/xmysql (数据库API接口Rest服务)
- https://gitee.com/kekingcn/file-online-preview.git (文档预览服务)
- https://gitee.com/yunwisdoms/imgproxy.git (图片压缩、在线裁剪、在线处理服务)
- https://gitee.com/jeecg/jeecg-boot.git (SpringBoot后端服务,本项目的后端是jeecg-boot改造的，用原始的jeecg-boot也是支持)
- https://gitee.com/sendya/ant-design-pro-vue.git (本项目前端项目由这个开源项目改造而来)
- https://gitee.com/vilson/vue-projectManage.git (本项目的项目管理系统，就是把这个集成过来，尚未完成)
- https://gitee.com/miazzy/mili (米粒网开源社区的项目，集成到本项目，提供社区论坛，第三方博客功能)

### 预览地址

- https://www.shengtai.club （账户 zhaoziyun/zhaoziyun@163.com 各位大大，请不要胡乱操作哦，测试环境懒得部署，这个算个小的正式环境）

### Nginx配置


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

![输入图片说明](https://images.gitee.com/uploads/images/2020/0313/161147_e437d684_499098.png "截屏2020-03-1316.11.18.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0312/162306_d845abf5_499098.png "截屏2020-03-1216.21.37.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0313/122638_7672c492_499098.png "截屏2020-03-1312.25.59.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0312/162319_13d5c4be_499098.png "截屏2020-03-1216.21.45.png")


![输入图片说明](https://images.gitee.com/uploads/images/2020/0316/200729_c7371e52_499098.png "截屏2020-03-1620.06.34.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0316/202131_ea6df10f_499098.png "截屏2020-03-1620.20.40.png")


![输入图片说明](https://images.gitee.com/uploads/images/2020/0317/190850_ea46ffdb_499098.png "截屏2020-03-1719.08.21.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/0317/190909_625cbc9d_499098.png "截屏2020-03-1719.08.59.png")

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


        error_page 400 = /400.html;
        error_page 401 = /401.html;
        error_page 402 = /402.html;
        error_page 403 = /403.html;
        error_page 404 = /404.html;

        error_page 500 = /500.html;
        error_page 501 = /501.html;
        error_page 502 = /502.html;
        error_page 503 = /503.html;
        error_page 520 = /520.html;
        error_page 521 = /521.html;
        error_page 533 = /533.html;

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

        location ^~ /apis/ {

            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';

            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_pass http://cwbase/api/;

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

        location ^~ /generic/ {
 
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
 
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
 
            proxy_pass http://jeecg-api/jeecg-boot/generic/;
 
        }

        location ^~ /unsafe {
            add_header Cache-Control no-cache;
            proxy_set_header   Host www.shengtai.club;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_pass         http://127.0.0.1:1000/unsafe/;
            proxy_connect_timeout 30s;
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

	location ^~ /cdn/ {

            alias   /usr/share/nginx/html/cdn;

            proxy_cache web_cache;
            proxy_cache_valid 200 206 304 301 302 10d;
            proxy_cache_key  $scheme$host$request_uri;
	}

	#index no cache
	location = /index.html {
            add_header Cache-Control "no-cache, no-store";
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

    server {

        listen 80;
        listen 443 ssl;
        server_name  erp.brc-beei.com;

        #access_log  logs/host.access.log  main;
        client_max_body_size 100m;

        #ssl on;
        ssl_certificate /cert/erp.brc-beei.com-crt.pem;
        ssl_certificate_key /cert/erp.brc-beei.com-key.pem;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        error_page 404 500 502 503 504 http://view.brc-beei.com:6869/error.html;

        location / {

            add_header Cache-Control no-cache;
            proxy_set_header   Host gsp.brc-ulife.com;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_pass         http://47.106.8.242:8082/;
            #proxy_connect_timeout 30s;
            index  login.aspx;

            proxy_connect_timeout 1800s;
            proxy_send_timeout 1800s;
            proxy_read_timeout 1800s;

            client_max_body_size 100m;

            proxy_cache web_cache;
            proxy_cache_valid 200 304 1m;
            proxy_cache_key  $scheme$host$request_uri;

        }     
    }


    server {
        listen       80;
	listen 443  ssl;
        server_name  thumbor.shengtai.club;
        index index.html index.htm;

	ssl_certificate /cert/thumbor.shengtai.club.pem;
	ssl_certificate_key /cert/thumbor.shengtai.club.key;
	ssl_session_timeout 5m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	ssl_prefer_server_ciphers on;

    	location / {
            add_header Cache-Control no-cache;
            proxy_pass http://120.76.65.212:1000;
            proxy_set_header   Host thumbor.shengtai.club;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_connect_timeout 1800s;
	    proxy_send_timeout  1800s;
	    proxy_read_timeout  1800s;
    	}

    }


    server {
        listen       80;
        listen 443  ssl;
        server_name  office.shengtai.club;
        index index.html index.htm;

        ssl_certificate /cert/office.shengtai.club.pem;
        ssl_certificate_key /cert/office.shengtai.club.key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;

        location / {
            add_header Cache-Control no-cache;
            proxy_pass http://172.18.231.224:8002;
            proxy_set_header   Host thumbor.shengtai.club;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
	    proxy_connect_timeout  1800s;
	    proxy_send_timeout  1800s;
	    proxy_read_timeout  1800s;
        }

    }

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

    server {
        listen 80;      
        server_name  cdn.shengtai.club;
 
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

        location ^~ /apis/ {
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://cwbase/api/;
        }

        location ^~ /jeecg-boot {
            proxy_pass              http://jeecg-api/jeecg-boot/;
 
            proxy_set_header        Host jeecg-api;
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
 
        location ^~ /unsafe {
            add_header Cache-Control no-cache;
            proxy_set_header   Host www.shengtai.club;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_pass         http://127.0.0.1:1000/unsafe/;
            proxy_connect_timeout 30s;
        }      

        location ^~ /jeecg-boot/sys/common/view {
            alias   /root/jeecg/upFiles/;
            index  index.html index.htm;
        }

        location ^~ /files {
            root   /root/jeecg/upFiles/;
            index  index.html index.htm;
        }
 
        location / {
 
            root   /usr/share/nginx/html;
            index  index.html index.htm;
 
            if (!-e $request_filename) {
                rewrite ^(.*)$ /index.html?s=$1 last;
                break;
            }
 
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
 
            proxy_cache web_cache;
            proxy_cache_valid 200 206 304 301 302 10d;
            proxy_cache_key  $scheme$host$request_uri;
 
            proxy_connect_timeout  1800s;
            proxy_send_timeout  1800s;
            proxy_read_timeout  1800s;
 
            expires 30d;
 
        }
 
    }

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

        location ^~ /apis/ {
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://cwbase/api/;
        }

        location ^~ /jeecg-boot {
            proxy_pass              http://172.18.231.224:8080/jeecg-boot/;
 
            proxy_set_header        Host 172.18.231.224;
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
 
            proxy_pass https://www.shengtai.club/jeecg-boot/sys/;
 
        }
 
        location ^~ /unsafe {
            add_header Cache-Control no-cache;
            proxy_set_header   Host www.shengtai.club;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_pass         http://www.shengtai.club:1000/unsafe/;
            proxy_connect_timeout 30s;
        }    

        location ^~ /jeecg-boot/sys/common/view {
            alias   /root/jeecg/upFiles/;
            index  index.html index.htm;
        }
 
        location ^~ /files {
            root   /root/jeecg/upFiles/;
            index  index.html index.htm;
        }
 
        location / {
 
            root   /workspace/oa-front-system;
            index  index.html index.htm;
 
            if (!-e $request_filename) {
                rewrite ^(.*)$ /index.html?s=$1 last;
                break;
            }
 
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET, DELETE, PUT';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
 
            proxy_cache web_cache;
            proxy_cache_valid 200 206 304 301 302 10d;
            proxy_cache_key  $scheme$host$request_uri;
 
	        proxy_connect_timeout  1800s;
	        proxy_send_timeout  1800s;
	        proxy_read_timeout  1800s;
 
            expires 30d;
 
        }
 
    }

    server {
        server_name xapi.shengtai.club;
        listen 80 ;
        location / {
            rewrite ^/(.*) /$1 break;
            proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://172.18.231.224:3000;
        }
    }

}

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

![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/094940_0ccdd375_499098.png "截屏2020-01-1509.31.38.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095056_22ae1ea5_499098.png "截屏2020-01-1509.34.34.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095105_482885e8_499098.png "截屏2020-01-1509.34.40.png")
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095114_1758bd86_499098.png "截屏2020-01-1509.35.29.png")

审批流程详情页面，点击‘打码’按钮可以生成二维码，手机扫码后，可以直接跳转到此详情页面
![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095122_88d97d9f_499098.png "截屏2020-01-1509.35.35.png")

审批流程详情页面，点击‘打码’按钮可以生成短链接，浏览器打开短链接，可以直接跳转到此审批详情页面

![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095221_a185070d_499098.png "截屏2020-01-1509.35.42.png")
审批流程详情页面，上传的附件，可以进行预览，支持Office、PDF、图片预览，后续添加音频、视频等多媒体文件播放功能，Office文档上传后，会触发文档转PDF任务，在文档转换期间，如果预览文档，则调用KKfileView进行预览文档，转换完毕，且文档存在于服务器后端，则直接用已经转换完毕的完毕的PDF文档进行预览，上传的图片会被压缩处理，并生成100x60的缩略图。

![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095308_29e8a2d0_499098.png "截屏2020-01-1509.35.50.png")
![![![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/095437_4e526d78_499098.png "截屏2020-01-1509.36.24.png")](https://images.gitee.com/uploads/images/2020/0115/095431_5c57d6fa_499098.png "截屏2020-01-1509.36.17.png")](https://images.gitee.com/uploads/images/2020/0115/095424_bfb9dee9_499098.png "截屏2020-01-1509.36.11.png")![输入图片说明](https://images.gitee.com/uploads/images/2020/0115/154450_3466efff_499098.png "截屏2020-01-1515.43.48.png")

### 附属文档

- [Ant Design Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn)

- [报表 viser-vue](https://viserjs.github.io/demo.html#/viser/bar/basic-bar)

- [Vue](https://cn.vuejs.org/v2/guide)

- [路由/菜单说明](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/router/README.md)

- [ANTD 默认配置项](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/defaultSettings.js)

- 其他待补充...

### 备注

> @vue/cli 升级后，eslint 规则更新了。由于影响到全部 .vue 文件，需要逐个验证。既暂时关闭部分原本不验证的规则，后期维护时，在逐步修正这些 rules
