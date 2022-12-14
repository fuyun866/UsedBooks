const conn = require("../model/conn")
const AdminService = {
    addAdmin: ({ admin_account, admin_name, admin_login_password, admin_permission }, callback) => {
        let admin_id = new Date().getTime() + Math.random().toString(36).substring(3, 10);
        console.log(admin_id, admin_account, admin_name, admin_login_password, admin_permission);

        let sql_insert = `INSERT INTO admin VALUES(?,?,?,?,?)`;
        let sql_insertParams = [admin_id, admin_account, admin_name, admin_login_password, admin_permission];
        let sql_look_account = `SELECT * FROM admin WHERE admin_account = ?`

        conn.query(sql_look_account, admin_account, (err, result) => {
            if (err) {
                throw err
            }
            // console.log(result);
            if (result.length) callback({ code: 0, value: "该账号已经被注册！" })
            else {
                conn.query(sql_insert, sql_insertParams, (err1, results2) => {
                    if (err1) {
                        throw err1
                    }
                    console.log(results2, "444");
                    if (err) callback({ code: 0, value: "注册失败！" })
                    else callback({ code: 1, value: "注册成功",id:admin_id })
                })
            }
        })
    },

    getAdminInfo: ({ admin_id }, callback) => {
        let sql_find = `select * from admin where admin_id=?`;
        conn.query(sql_find, admin_id, function (err, results) {
            if (err) {
                throw err
            }
            // console.log(results)
            //将查询出来的数据返回给回调函数
            callback &&
                callback(
                    results ? JSON.parse(JSON.stringify(results)) : null
                )
        })
    },

    update_name: (admin_id, admin_name, callback) => {
        console.log(admin_id + "====" + admin_name)

        let sql_update = `UPDATE admin set admin_name=? where admin_id=?`;
        let sql_updateParams = [admin_name, admin_id];
        let sql_look_id = `SELECT * FROM admin WHERE admin_id= ?`
        conn.query(sql_look_id, admin_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            // console.log(result1);
            if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
            else {
                conn.query(sql_update, sql_updateParams, (err2, results2) => {
                    if (err2) {
                        throw err2
                    }
                    // console.log(results2, "444");
                    if (err2) callback({ code: 0, value: "更新失败！" })
                    else callback({ code: 1, value: "更新成功" })
                })
            }
        })
    },

    update_permission: (admin_id, admin_permission, callback) => {
        console.log(admin_id + "====" + admin_permission)

        let sql_update = `UPDATE admin set admin_permission=? where admin_id=?`;
        let sql_updateParams = [admin_permission, admin_id];
        let sql_look_id = `SELECT * FROM admin WHERE admin_id= ?`
        conn.query(sql_look_id, admin_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            // console.log(result1);
            if (!result1.length) callback({ code: 0, value: "该用户不存在！" })
            else {
                conn.query(sql_update, sql_updateParams, (err2, results2) => {
                    if (err2) {
                        throw err2
                    }
                    // console.log(results2, "444");
                    if (err2) callback({ code: 0, value: "更新失败！" })
                    else callback({ code: 1, value: "更新成功" })
                })
            }
        })
    },

    getAdmin: (callback) => {
        let sql_find = `select * from admin`;
        conn.query(sql_find, function (err, results, fields) {
            if (err) {
                throw err
            }
            //将查询出来的数据返回给回调函数
            callback &&
                callback(
                    results ? JSON.parse(JSON.stringify(results)) : null
                )
        })
    },

    deleteAdmin: (admin_id, callback) => {

        let sql_delete = `delete from admin where admin_id=?`;
        conn.query(sql_delete, admin_id, (err, results) => {
            // console.log(results, "444");
            if (err) {
                callback({ code: 0, value: "删除失败！" })
                throw err
            } else {
                callback({ code: 1, value: "删除成功" })
            }
        })
    },

    loginAdmin: ({ userAccount, password }, callback) => {
        let sql_look_id = `SELECT * FROM admin WHERE admin_account = ?`
        conn.query(sql_look_id, userAccount, (err, result) => {
            if (err) {
                throw err
            }
            if (!result || !result?.length)
                callback({ code: 0, value: "该账号不存在！" })
            else if (result[0].admin_login_password != password)
                callback({ code: 0, value: "密码错误！" })
            else
                callback({ code: 1, value: "登陆成功", data: result[0] })
        })
    },
    
}

module.exports = AdminService
