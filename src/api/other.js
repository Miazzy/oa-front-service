//import * as $ from 'jquery'
export function getYiYan(callback, type) {

    //定义API地址
    let api = 'https://v1.hitokoto.cn/?c=' + type + '&encode=json';
    //定义type默认值
    type = type === undefined ? 'f' : type;

    try {
        $.get({
            url: api,
            success: function(data) {
                callback(data);
            }
        })
    } catch (error) {
        console.error(error);
    }

}