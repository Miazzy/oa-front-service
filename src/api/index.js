const api = {
    Login: `${window._CONFIG['domain']}/sys/login`,
    Logout: `${window._CONFIG['domain']}/sys/logout`,
    ForgePassword: `${window._CONFIG['domain']}/auth/forge-password`,
    Register: `${window._CONFIG['domain']}/auth/register`,
    SendSms: `${window._CONFIG['domain']}/account/sms`,
    UserInfo: `${window._CONFIG['domain']}/user/info`
}
export default api