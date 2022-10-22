const LoginService = require("../services/LoginService")
const UserService = require("../services/UserService")
const AdminService = require("../services/AdminService")
const verToken = require("../token/token")
const express = require("express")
const LoginController = {
    userLogin: async (req, res) => {
        // console.log(req.body)

        await UserService.loginUser(req.body, (result) => {
            if (result.code) {
                verToken.setToken(result.data.user_id).then(token => {
                    res.send({ code: 1, value: "登陆成功", token: token, data: result.data })
                })
            } else { 
                res.send(result) 
            }
        });
    },

    adminLogin: async (req, res) => {
        // console.log(req.body)

        await AdminService.loginAdmin(req.body, (result) => {
            if (result.code) {
                req.session.user = result;
                res.send({ code: 1, value: "登陆成功", data: result.data })
                // verToken.setToken(result.data.admin_id).then(token => {
                //     res.send({ code: 1, value: "登陆成功", token: token, data: result.data })
                // })
            } else { 
                res.send(result) 
            }
        });
    },

    avoidAdminLogin:(req,res)=>{
        if(req.session.user){
            res.send({code:1,value:"免登录测试",data:req.session.user})
        }else{
            res.send({code:0,value:"请登录",data:{}})
        }
    },

    avoidLogin: async (req, res) => {
        console.log(req)
        await LoginService.avoidLogin(req, (result) => {
            res.send(result)
        });
    },
    getWeather:async(req,res)=>{
        let result =await LoginService.handerWeather();
        res.send(result);
    }
}


module.exports = LoginController
