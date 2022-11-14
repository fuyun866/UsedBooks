var express = require('express');
const UserController = require('../controllers/UserController');
const { upload_userImg } = require('../services/Upload')
var router = express.Router();

//添加用户
router.post("/", UserController.addUser)
//获取用户信息
router.post("/getUserInfo", UserController.getUserInfo)
//更新用户信息
router.post("/updateInfo", UserController.updateInfo)
//更改手机号
router.put("/tele/:id", UserController.changeTele)
//更改微信号
router.put("/weichat/:id", UserController.changeWeichat)
//修改密码
router.put("/password/:id", UserController.changepwd)
//更改头像
router.post("/avater",  UserController.changeAvater)
//获取用户列表
router.get("/", UserController.getUser)
//获取验证码
router.post("/getSvg", UserController.getSvg)
// 添加取消收藏
router.post("/collect", UserController.changeCollect)
//查询收藏夹内容
router.get("/getCollections/:id", UserController.getCollections)
// 清空收藏夹
router.get("/deleteCollectionAll/:id", UserController.deleteCollectionAll)


module.exports = router;
