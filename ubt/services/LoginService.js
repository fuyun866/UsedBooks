const conn = require("../model/conn")
const verToken = require("../token/token")
const axios = require("axios")
const LoginService = {
    avoidLogin: (req, callback) => {
        // 获取请求头中的信息
        const beareHeader = req.headers.authorization;
        verToken.getToken(beareHeader).then((data) => {
            callback({ code: 1, value: "免登录测试", info: data });
        }).catch((err) => {
            callback({ code: 0, value: "请登录------" })
        })
    },
    handerWeather: async () => {
        // let result = await axios.get("http://pv.sohu.com/cityjson?ie=utf-8");
        // let city = result.data.split("省")[1].split("市")[0];
        // console.log(result.data);
        let { data } = await axios.get(`http://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${encodeURI("合肥")}`);
        // let {data} = await axios.get(`http://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=${encodeURI(city)}`);
        let weatherData = {
            city: data.city + '市',
            date: data.update_time,
            week: data.data[0].week,
            weather: data.data[0].wea
        }
        return { code: 1, value: "天气获取成功", data: weatherData };
    }
}

module.exports = LoginService
