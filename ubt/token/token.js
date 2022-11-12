const jwt = require('jsonwebtoken');

// 密钥
const jwtSecret = 'dkfjdjfkdfdfd';  //签名

//登录接口 生成token的方法
// setToken携带的参数及参数的数量自定义
const setToken = function (user_id) { 
    return new Promise((resolve, reject) => {
        const token = jwt.sign(
            // 存储的数据
            { user_id: user_id }, 
            // 密钥
            jwtSecret, 
            // 过期时间
            { expiresIn: '24h' }
        );
        // console.log(token);
        resolve(token)
    })
}
//各个接口需要验证token的方法
const getToken = function (token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({
                code:0,
                value:"token是空的"
            })
        } else {
            // 验证token
            var info = jwt.verify(token.split(' ')[1], jwtSecret);
            resolve(info);  //解析返回的值（sign 传入的值）
        }
    })
}

module.exports = {
    setToken,
    getToken
}