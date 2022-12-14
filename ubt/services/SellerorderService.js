const conn = require("../model/conn")
const SellerorderService = {
    addOrder: ({ sellerorder_sellerid, sellerorder_book_isbn, sellerorder_address }, callback) => {

        let sellerorder_id = new Date().getTime() + Math.random().toString(36).substring(4, 9);
        let sellerorder_date = new Date();
        console.log(sellerorder_id, sellerorder_sellerid, sellerorder_book_isbn, sellerorder_date, sellerorder_address + "----");

        let sql_insert = `INSERT INTO sellerorder VALUES(?,?,?,?,?,default)`;
        let sql_insertParams = [sellerorder_id, sellerorder_sellerid, sellerorder_book_isbn, sellerorder_date, sellerorder_address];

        conn.query(sql_insert, sql_insertParams, (err, results) => {
            if (err) {
                throw err
            }
            // console.log(results, "444");
            if (err) callback({ code: 0, value: "插入失败！" })
            else callback({ code: 1, value: "插入成功" })
        })
    },

    updateOrder: ({ sellerorder_status }, sellerorder_id, callback) => {
        console.log(sellerorder_id + "====" + sellerorder_status);

        let sql_update = `UPDATE sellerorder set sellerorder_status=? where sellerorder_id=?`;
        let sql_updateParams = [sellerorder_status, sellerorder_id];
        let sql_look_id = `SELECT * FROM sellerorder WHERE sellerorder_id= ?`
        conn.query(sql_look_id, sellerorder_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            // console.log(result1);
            if (!result1.length) callback({ code: 0, value: "该订单不存在！" })
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

    getOrder_idstat: ({sellerorder_sellerid, sellerorder_status}, callback) => {
        let sql_find = `select * from sellerorder where sellerorder_sellerid=? and sellerorder_status=?`;
        let sql_findParams = [sellerorder_sellerid, sellerorder_status];
        conn.query(sql_find, sql_findParams, function (err, results) {
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

    deleteOrder: (sellerorder_id, callback) => {
        console.log(sellerorder_id);

        let sql_delete = `delete from sellerorder where sellerorder_id=?`;
        let sql_look_id = `SELECT * FROM sellerorder WHERE sellerorder_id= ?`;

        conn.query(sql_look_id, sellerorder_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            // console.log(result1);
            if (!result1.length) callback({ code: 0, value: "该订单不存在！" })
            else {
                if (result1[0].sellerorder_status === 1) {
                    conn.query(sql_delete, sellerorder_id, (err, results) => {
                        if (err) {
                            throw err
                        }
                        // console.log(results, "444");
                        if (err) callback({ code: 0, value: "删除失败！" })
                        else callback({ code: 1, value: "删除成功" })
                    })
                } else {
                    callback({ code: 0, value: "该订单未完成！" })
                }
            }
        })


    },

    getOrder_id: (sellerorder_sellerid, callback) => {
        console.log(sellerorder_sellerid);
        let sql_find = `select * from sellerorder where sellerorder_sellerid=?`;
        conn.query(sql_find, sellerorder_sellerid, function (err, results) {
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

    getOrder_status: ({sellerorder_status}, callback) => {
        let sql_find = `select * from sellerorder where sellerorder_status=?`;
        conn.query(sql_find, sellerorder_status, function (err, results) {
            if (err) {
                throw err
            }
            //将查询出来的数据返回给回调函数
            callback &&
                callback({code:1,value:"卖家订单获取成功",data:results})
        })
    }
}

module.exports = SellerorderService
