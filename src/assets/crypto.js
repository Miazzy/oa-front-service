import CryptoJS from 'crypto-js'
export default {
    install(Vue) {

        //DES 加密
        var key = "ZO02J82K9A"; //默认key

        function getAesString(data, key) { //加密
            var encrypted = CryptoJS.DES.encrypt(data, key);
            return encrypted.toString(); //返回的是密文
        }

        function getDAesString(encrypted, key) { //解密
            var decrypted = CryptoJS.DES.decrypt(encrypted.toString(), key);
            return decrypted.toString(CryptoJS.enc.Utf8); //返回加密信息
        }

        //DES 解密 加密
        function getDesString(message, key) {
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return encrypted.toString();
        }
        //DES 解密
        function getDDesString(ciphertext, key) {
            var keyHex = CryptoJS.enc.Utf8.parse(key);
            // direct decrypt ciphertext
            var decrypted = CryptoJS.DES.decrypt({
                ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
            }, keyHex, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return decrypted.toString(CryptoJS.enc.Utf8);
        }

        //MD5 加密
        Vue.prototype.encodeMD5 = function getMD5(data) {
            var md5 = CryptoJS.MD5(data);
            return md5;
        }

        Vue.prototype.encodeAES = function getAES(data) { //加密             
            var encrypted = getAesString(data, key); //密文
            return encrypted;
        }

        Vue.prototype.decodeAES = function getDAes(data) { //解密
            var decryptedStr = getDAesString(data, key);
            return decryptedStr;
        };

        Vue.prototype.encodeDES = function getDES(data) { //加密             
            var encrypted = getDesString(data, key); //密文
            return encrypted;
        }

        Vue.prototype.decodeDES = function getDDes(data) { //解密
            var decryptedStr = getDDesString(data, key);
            return decryptedStr;
        };
    }

}