import JsEncrypt from 'jsencrypt'
import service from "@/plugins/axios";
// 实例化一个JSEncrypt对象
const jse = new JsEncrypt();
jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCuZt6OvWwONCITSSNyMrHnDdat
i3Yy6uR8mALjDRyEAWSNMbL6I3KdyyEK+n5GMF/Sp2WLk0fF1KKEk87dExN1hb+/
3DVkSoMu40ig+cjdsnAKc7sQ7txlqddm7zg88nDxiVHurMwu3GEmMHS12pRCLMOU
+YPSMibpNfjZcjWGPwIDAQAB
-----END PUBLIC KEY-----`);

export default jse;
