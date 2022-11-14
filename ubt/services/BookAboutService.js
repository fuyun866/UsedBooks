const conn = require("../model/conn")
const BookAboutService = {
    addBook: (bookA_isbn, bookA_old_degree, bookA_price, bookA_image, bookA_stand, bookA_kind, callback) => {
        console.log("---" + bookA_isbn, bookA_old_degree, bookA_price, bookA_image, bookA_stand, bookA_kind + "----");

        let bookA_id = new Date().getTime() + Math.random().toString(36).substring(4, 9);
        let bookA_date = new Date();
        let sql_insert = `INSERT INTO bookabout VALUES(?,?,?,?,?,?,?,default,?)`;
        let sql_insertParams = [bookA_id, bookA_isbn, bookA_old_degree, bookA_price, bookA_image, bookA_stand, bookA_kind, bookA_date];

        conn.query(sql_insert, sql_insertParams, (err, results) => {
            if (err) {
                throw err
            }
            // console.log(results, "444");
            if (err) callback({ code: 0, value: "插入失败！" })
            else callback({ code: 1, value: "插入成功" })
        })
    },
    getBook_idTrue: (bookA_id, callback) => {
        console.log(bookA_id,'666');
        let sql_find = `select * from bookabout a LEFT OUTER JOIN books s  ON a.bookA_isbn=s.book_isbn where bookA_id=?`;

        try {
            conn.query(sql_find, bookA_id, function (err, results, fields) {
                if (err) {
                    throw err
                }
                //将查询出来的数据返回给回调函数
                callback &&
                    callback(
                        results ? JSON.parse(JSON.stringify(results)) : null
                    )
            })
        } catch (error) {
            console.log(error);
        }
    },

    updateBook_kind: ({ bookA_kind }, bookA_id, callback) => {
        console.log(bookA_id + "====" + bookA_kind);

        let sql_update = `UPDATE bookabout set bookA_kind=? where bookA_id=?`;
        let sql_updateParams = [bookA_kind, bookA_id];
        let sql_look_id = `SELECT * FROM bookabout WHERE bookA_id= ?`
        conn.query(sql_look_id, bookA_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            // console.log(result1);
            if (!result1.length) callback({ code: 0, value: "该书籍不存在！" })
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

    updateBook_state: ({ bookA_state }, bookA_id, callback) => {
        console.log(bookA_id + "====" + bookA_state);

        let sql_update = `UPDATE bookabout set bookA_state=? where bookA_id=?`;
        let sql_updateParams = [bookA_state, bookA_id];
        let sql_look_id = `SELECT * FROM bookabout WHERE bookA_id= ?`
        conn.query(sql_look_id, bookA_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            if (!result1.length) callback({ code: 0, value: "该书籍不存在！" })
            else {
                conn.query(sql_update, sql_updateParams, (err2, results2) => {
                    if (err2) {
                        throw err2
                    }
                    if (err2) callback({ code: 0, value: "更新失败！" })
                    else callback({ code: 1, value: "更新成功" })
                })
            }
        })
    },
    updateBook_collection: ({ bookA_collection , bookA_id},callback) => {
        let sql_update = `UPDATE bookabout set bookA_collection=? where bookA_id=?`;
        let sql_updateParams = [bookA_collection, bookA_id];
        conn.query(sql_update, sql_updateParams, (err1, result1) => {
            if (err1) {
                callback({ code: 0, value: "收藏失败！" })
            }
            else {
                callback({ code: 1, value: "收藏成功！",data:result1 })
            }
        })
    },

    deleteCollectionAll: (callback) => {
        let sql_update = `UPDATE bookabout set bookA_collection=0`;
        conn.query(sql_update, (err1, result1) => {
            if (err1) {
                callback({ code: 0, value: "操作失败！" })
            }
            else {
                callback({ code: 1, value: "收藏夹已清空",data:result1 })
            }
        })
    },

    updateBook_price: ({ bookA_price }, bookA_id, callback) => {
        console.log(bookA_id + "====" + bookA_price);

        let sql_update = `UPDATE bookabout set bookA_price=? where bookA_id=?`;
        let sql_updateParams = [bookA_price, bookA_id];
        let sql_look_id = `SELECT * FROM bookabout WHERE bookA_id= ?`
        conn.query(sql_look_id, bookA_id, (err1, result1) => {
            if (err1) {
                throw err1
            }
            // console.log(result1);
            if (!result1.length) callback({ code: 0, value: "该书籍不存在！" })
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

    deleteBook: (bookA_id, callback) => {
        console.log(bookA_id);

        let sql_delete = `delete from bookabout where bookA_id=?`;

        conn.query(sql_delete, bookA_id, (err, results) => {
            if (err) {
                throw err
            }
            console.log(results, "444");
            if (err) callback({ code: 0, value: "删除失败！" })
            else callback({ code: 1, value: "删除成功" })
        })
    },

    getBook: (args, callback) => {
        let sql_find = `select * from bookabout a LEFT OUTER JOIN books s  ON a.bookA_isbn=s.book_isbn `;
        conn.query(sql_find, function (err, results) {
            if (err) {
                throw err
            }
            //将查询出来的数据返回给回调函数
            callback &&
                callback(
                    { code: 1, value: "书籍获取成功", data: results }
                )
        })
    },

    // 获取收藏夹书籍
    getCollections: (callback) => {
        let sql_find = `select * from bookabout a LEFT OUTER JOIN books s  on a.bookA_isbn = s.book_isbn  WHERE bookA_collection=1`;
        conn.query(sql_find, function (err, results) {
            if (err) {
                throw err
            }
            else{
                callback({code:1,value:"书籍获取成功",data:results})
            }

        })
    },

    getBooknum: (args, callback) => {
        let sql_find = `select count(1) as total from bookabout`;
        conn.query(sql_find, function (err, results) {
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

    getBook_isbnlink: ({ bookA_isbn, bookA_state }, callback) => {
        console.log(bookA_isbn, bookA_state);
        let sql_find = `select * from bookabout a LEFT OUTER JOIN books s ON a.bookA_isbn=s.book_isbn where bookA_isbn=? and bookA_state=?`;
        let sql_findParams = [bookA_isbn, bookA_state];
        conn.query(sql_find, sql_findParams, function (err, results, fields) {
            if (err) {
                throw err
            }
            //将查询出来的数据返回给回调函数
            callback &&
                callback(
                    { code: 1, value: "查询成功", data: results }
                )
        })
    },

    getBook_standlink: ({ bookA_stand, bookA_state }, callback) => {
        console.log(bookA_stand, bookA_state);
        let sql_find = `select * from bookabout a LEFT OUTER JOIN books s ON a.bookA_isbn=s.book_isbn where bookA_stand=? and bookA_state=?`;
        let sql_findParams = [bookA_stand, bookA_state];
        conn.query(sql_find, sql_findParams, function (err, results, fields) {
            if (err) {
                throw err
            }
            //将查询出来的数据返回给回调函数
            callback &&
                callback(
                    { code: 1, value: "查询成功", data: results }
                )
        })
    },

    getLinkbook: ({ onset, offset, classify }, callback) => {
        console.log(onset, offset, classify,'查询书籍');
        let sql_find;
        if (classify !== '全部') sql_find = `select * from bookabout a LEFT OUTER JOIN books s  ON a.bookA_isbn=s.book_isbn WHERE bookA_kind = '${classify}' limit ?,?`;
        else sql_find = `select * from bookabout a LEFT OUTER JOIN books s  ON a.bookA_isbn=s.book_isbn limit ?,?`;

        let sql_count = `SELECT COUNT(bookA_kind = '${classify}' or null) as classify from bookabout`;
        let sql_findParams = [parseInt(onset), parseInt(offset)];
        conn.query(sql_find, sql_findParams, function (err, results) {
            if (err) {
                throw err
            }
            else {
                conn.query(sql_count, (err1, result1) => {
                    //将查询出来的数据返回给回调函数
                    let totalResult = {
                        books:results,
                        count:result1[0].classify
                    }
                    callback &&
                        callback(
                            results ? JSON.parse(JSON.stringify(totalResult)) : null
                        )
                })
            }
        })
    },

    getBook_id: (bookA_id, callback) => {
        let sql_find = `select * from bookabout where bookA_id=?`;
        conn.query(sql_find, bookA_id, function (err, results, fields) {
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

    getBook_isbn: (bookA_isbn, callback) => {
        let sql_find = `select * from bookabout where bookA_isbn=?`;
        conn.query(sql_find, bookA_isbn, function (err, results, fields) {
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

    getBook_kind: (bookA_kind, callback) => {

        let sql_find = `select * from bookabout where bookA_kind=?`;
        conn.query(sql_find, bookA_kind, function (err, results, fields) {
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

    getBook_stand: (bookA_stand, callback) => {
        let sql_find = `select * from bookabout where bookA_stand=?`;
        conn.query(sql_find, bookA_stand, function (err, results) {
            if (err) {
                throw err
            }
            //将查询出来的数据返回给回调函数
            callback &&
                callback(
                    results ? JSON.parse(JSON.stringify(results)) : null
                )
        })
    }
}

module.exports = BookAboutService
