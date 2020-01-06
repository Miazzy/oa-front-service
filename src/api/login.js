import api from './index';
import { axios } from '@/utils/request';

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
    try {
        return axios({
            url: `${window._CONFIG['domainURL']}/sys/login`,
            method: 'post',
            data: parameter,
        });
    } catch (error) {
        console.log(error);
    }
}

export function phoneLogin(parameter) {
    try {
        return axios({
            url: `${window._CONFIG['domainURL']}/sys/phoneLogin`,
            method: 'post',
            data: parameter,
        });
    } catch (error) {
        console.log(error);
    }
}

export function getSmsCaptcha(parameter) {
    try {
        return axios({
            url: api.SendSms,
            method: 'post',
            data: parameter,
        });
    } catch (error) {
        console.log(error);
    }
}

export function getInfo() {
    try {
        return axios({
            url: `${window._CONFIG['domainURL']}/api/user/info`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export function logout(logoutToken) {
    try {
        return axios({
            url: `${window._CONFIG['domainURL']}/sys/logout`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Access-Token': logoutToken,
            },
        });
    } catch (error) {
        console.log(error);
    }
}