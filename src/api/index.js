const api = {
    Login: `${window._CONFIG['domainURL']}/sys/login`,
    Logout: `${window._CONFIG['domainURL']}/sys/logout`,
    ForgePassword: `${window._CONFIG['domainURL']}/auth/forge-password`,
    Register: `${window._CONFIG['domainURL']}/auth/register`,
    SendSms: `${window._CONFIG['domainURL']}/account/sms`,
    UserInfo: `${window._CONFIG['domainURL']}/user/info`
}
export default api