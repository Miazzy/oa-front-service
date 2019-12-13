import { isURL } from '@/utils/validate';

export function timeFix() {
    const time = new Date();
    const hour = time.getHours();
    return hour < 9 ?
        '早上好' :
        hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好';
}

export function welcome() {
    const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了'];
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
    let event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, true);
    event.eventType = 'message';
    window.dispatchEvent(event);
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
    if (!(typeof obj == 'object')) {
        return;
    }

    for (var key in obj) {
        if (
            obj.hasOwnProperty(key) &&
            (obj[key] == null || obj[key] == undefined || obj[key] === '')
        ) {
            delete obj[key];
        }
    }
    return obj;
}

/**
 * 时间格式化
 * @param value
 * @param fmt
 * @returns {*}
 */
export function formatDate(value, fmt) {
    var regPos = /^\d+(\.\d+)?$/;
    if (regPos.test(value) || value instanceof Date) {
        //如果是数字
        let getDate = value instanceof Date ? value : new Date(value);
        let o = {
            'M+': getDate.getMonth() + 1,
            'd+': getDate.getDate(),
            'h+': getDate.getHours(),
            'm+': getDate.getMinutes(),
            's+': getDate.getSeconds(),
            'q+': Math.floor((getDate.getMonth() + 3) / 3),
            S: getDate.getMilliseconds(),
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (getDate.getFullYear() + '').substr(4 - RegExp.$1.length)
            );
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length === 1 ?
                    o[k] :
                    ('00' + o[k]).substr(('' + o[k]).length)
                );
            }
        }

        try {
            fmt = fmt.replace('T', ' ');
        } catch (error) {
            console.log('formate date error : ' + error);
        }

        return fmt;
    } else {
        //TODO
        try {
            if (typeof value == 'undefined' || value == null) {
                value = '--';
            }
            value = value.trim();
            fmt = value.substr(0, fmt.length);
            fmt = fmt.replace('T', ' ');
        } catch (error) {
            console.log('formate date error : ' + error);
        }

        return fmt;
    }
}

export function deNull(data) {
    if (typeof data == 'undefined' || data == null || data == '') {
        return '';
    } else {
        return data;
    }
}

// 生成首页路由
export function generateIndexRouter(data) {
    let indexRouter = [{
            path: '/',
            name: 'dashboard',
            //component: () => import('@/components/layouts/BasicLayout'),
            component: resolve =>
                require(['@/components/layouts/TabLayout'], resolve),
            meta: { title: '首页' },
            redirect: '/dashboard/analysis',
            children: [...generateChildRouters(data)],
        },
        {
            path: '*',
            redirect: '/404',
            hidden: true,
        },
    ];
    return indexRouter;
}

// 生成嵌套路由（子路由）

function generateChildRouters(data) {
    const routers = [];
    for (var item of data) {
        let component = '';
        if (item.component.indexOf('layouts') >= 0) {
            component = 'components/' + item.component;
        } else {
            component = 'views/' + item.component;
        }

        // eslint-disable-next-line
        let URL = (item.meta.url || '')
            .replace(/{{([^}}]+)?}}/g, (s1, s2) => eval(s2)); // URL支持{{ window.xxx }}占位符变量
        if (isURL(URL)) {
            item.meta.url = URL;
        }

        let menu = {
            path: item.path,
            name: item.name,
            redirect: item.redirect,
            component: resolve => require(['@/' + component + '.vue'], resolve),
            hidden: item.hidden,
            //component:()=> import(`@/views/${item.component}.vue`),
            meta: {
                title: item.meta.title,
                icon: item.meta.icon,
                url: item.meta.url,
                permissionList: item.meta.permissionList,
                keepAlive: item.meta.keepAlive,
            },
        };
        if (item.alwaysShow) {
            menu.alwaysShow = true;
            menu.redirect = menu.path;
        }
        if (item.children && item.children.length > 0) {
            menu.children = [...generateChildRouters(item.children)];
        }
        //--update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
        //判断是否生成路由
        if (item.route && item.route === '0') {
            //console.log(' 不生成路由 item.route：  '+item.route);
            //console.log(' 不生成路由 item.path：  '+item.path);
        } else {
            routers.push(menu);
        }
        //--update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    }
    return routers;
}

/**
 * 深度克隆对象、数组
 * @param obj 被克隆的对象
 * @return 克隆后的对象
 */
export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * 随机生成数字
 *
 * 示例：生成长度为 12 的随机数：randomNumber(12)
 * 示例：生成 3~23 之间的随机数：randomNumber(3, 23)
 *
 * @param1 最小值 | 长度
 * @param2 最大值
 * @return int 生成后的数字
 */
export function randomNumber() {
    // 生成 最小值 到 最大值 区间的随机数
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    if (arguments.length === 1) {
        let [length] = arguments;
        // 生成指定长度的随机数字，首位一定不是 0
        let nums = [...Array(length).keys()].map(
            i => (i > 0 ? random(0, 9) : random(1, 9))
        );
        return parseInt(nums.join(''));
    } else if (arguments.length >= 2) {
        let [min, max] = arguments;
        return random(min, max);
    } else {
        return Number.NaN;
    }
}

/**
 * 随机生成字符串
 * @param length 字符串的长度
 * @param chats 可选字符串区间（只会生成传入的字符串中的字符）
 * @return string 生成的字符串
 */
export function randomString(length, chats) {
    if (!length) length = 1;
    if (!chats) chats = '0123456789qwertyuioplkjhgfdsazxcvbnm';
    let str = '';
    for (let i = 0; i < length; i++) {
        let num = randomNumber(0, chats.length - 1);
        str += chats[num];
    }
    return str;
}

/**
 * 随机生成uuid
 * @return string 生成的uuid
 */
export function randomUUID() {
    let chats = '0123456789abcdef';
    return randomString(32, chats);
}

/**
 * 下划线转驼峰
 * @param string
 * @returns {*}
 */
export function underLine2CamelCase(string) {
    return string.replace(/_([a-z])/g, function(all, letter) {
        return letter.toUpperCase();
    });
}

/**
 * 判断是否显示办理按钮
 * @param bpmStatus
 * @returns {*}
 */
export function showDealBtn(bpmStatus) {
    if (bpmStatus != '1' && bpmStatus != '3' && bpmStatus != '4') {
        return true;
    }
    return false;
}

/**
 * 增强CSS，可以在页面上输出全局css
 * @param css 要增强的css
 * @param id style标签的id，可以用来清除旧样式
 */
export function cssExpand(css, id) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `@charset "UTF-8"; ${css}`;
    // 清除旧样式
    if (id) {
        let $style = document.getElementById(id);
        if ($style != null) $style.outerHTML = '';
        style.id = id;
    }
    // 应用新样式
    document.head.appendChild(style);
}

/**
 * 检查字符串是否包含中文
 * @param {*} val 
 */
export function existChinese(val) {
    var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
    return reg.test(val);
}

/**
 * 获取URL参数值
 * @param {*} val 
 */
export function queryUrlString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 计算两个日期之间的天数
 */
export function queryDateDiff(date1, date2) {
    //如果被解析日期格式为字符串，则先将字符串解析为日期格式
    if (Object.prototype.toString.call(date1).includes('String')) {
        try {
            date1 = parseDate(formatDate(date1, 'yyyy-MM-dd HH:mm:ss'));
            date2 = parseDate(formatDate(date2, 'yyyy-MM-dd HH:mm:ss'));
        } catch (e) {
            date1 = parseDate(date1);
            date2 = parseDate(date2);
        }
    }

    var beginDate = date1;
    var endDate = date2;

    //日期差值,即包含周六日、以天为单位的工时，86400000=1000*60*60*24.
    var workDayVal = (endDate - beginDate) / 86400000;
    //工时的余数
    var remainder = workDayVal % 7;
    //工时向下取整的除数
    var divisor = Math.floor(workDayVal / 7);
    var weekendDay = 2 * divisor;

    //起始日期的星期，星期取值有（1,2,3,4,5,6,0）
    var nextDay = beginDate.getDay();
    //从起始日期的星期开始 遍历remainder天
    for (var tempDay = remainder; tempDay >= 1; tempDay--) {
        //第一天不用加1
        if (tempDay == remainder) {
            nextDay = nextDay + 0;
        } else if (tempDay != remainder) {
            nextDay = nextDay + 1;
        }
        //周日，变更为0
        if (nextDay == 7) {
            nextDay = 0;
        }

        //周六日
        if (nextDay == 0 || nextDay == 6) {
            weekendDay = weekendDay + 1;
        }
    }
    //获取含有小数位的天数
    var timeFloat = parseFloat(workDayVal);
    //获取整数位的天数
    var timeInt = parseInt(workDayVal);
    //实际工时（天） = 起止日期差 - 周六日数目。
    workDayVal = parseInt(workDayVal - weekendDay);

    //取相差天数的小数位
    var decpart = timeFloat - timeInt;

    //如果小数位的天数大于0.5（3小时），按一天统计，如果大于0，按半天统计
    if (decpart * 24 > 4) {
        decpart = 1;
    } else if (decpart > 0) {
        decpart = 0.5;
    } else {
        decpart = 0;
    }

    return workDayVal + decpart;
}

/**
 * @function 字符串转为日期
 * @param {*} date 
 */
export function parseDate(date) {
    var t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, '/')));
    } else {
        return new Date();
    }
}