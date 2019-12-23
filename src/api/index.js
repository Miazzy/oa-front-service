const api = {
    Login: `${window._CONFIG['domian']}/sys/login`,
    Logout: `${window._CONFIG['domian']}/sys/logout`,
    ForgePassword: `${window._CONFIG['domian']}/auth/forge-password`,
    Register: `${window._CONFIG['domian']}/auth/register`,
    SendSms: `${window._CONFIG['domian']}/account/sms`,
    UserInfo: `${window._CONFIG['domian']}/user/info`
}
export default api