const BookAboutService = require("../services/BookAboutService")
const BookAboutController = {
    addBook: async (req, res) => {
        console.log(req.body, req.files)
        const { bookA_isbn, bookA_old_degree, bookA_price, bookA_stand, bookA_kind } = req.body
        let bookA_image = null;
        if (req.file) {
            bookA_image = `/images/detailsImg/${req.files[0].filename}`
            for (let i = 1; i < req.files.length; i++) {
                bookA_image = bookA_image.concat(` /images/detailsImg/${req.files[i].filename}`)
            }
        } else {
            bookA_image = `/images/detailsImg/default.png`
        }
        await BookAboutService.addBook(bookA_isbn, bookA_old_degree, bookA_price, bookA_image, bookA_stand, bookA_kind, (result) => {
            res.send(result)
        });
    },

    updateBook_kind: async (req, res) => {
        // console.log(req.body, req.params.id)
        await BookAboutService.updateBook_kind(req.body, req.params.id, (result) => {
            res.send(result)
        });

    },

    updateBook_state: async (req, res) => {
        // console.log(req.body, req.params.id)
        await BookAboutService.updateBook_state(req.body, req.params.id, (result) => {
            res.send(result)
        });

    },

    updateBook_price: async (req, res) => {
        // console.log(req.body, req.params.id)
        await BookAboutService.updateBook_price(req.body, req.params.id, (result) => {
            res.send(result)
        });

    },

    deleteBook: async (req, res) => {
        // console.log(req.params.id)
        await BookAboutService.deleteBook(req.params.id, (result) => {
            res.send(result)
        });

    },

    getBook: async (req, res) => {
        await BookAboutService.getBook(null, (results) => {
            // 以json的形式返回
            res.json(results)
        })
    },

    getBooknum: async (req, res) => {
        await BookAboutService.getBooknum(null, (results) => {
            // 以json的形式返回
            res.json({ results })
        })
    },

    getLinkbook: async (req, res) => {
        // console.log(req.query)
        await BookAboutService.getLinkbook(req.query, (results) => {
            // 以json的形式返回
            console.log(results.length)
            res.json({ results })
        })
    },

    getBook_id: async (req, res) => {
        await BookAboutService.getBook_id(req.params.id, (results) => {
            // 以json的形式返回
            res.json({ results })
        })
    },

    getBook_isbnlink: async (req, res) => {
        await BookAboutService.getBook_isbnlink(req.body, (results) => {
            // 以json的形式返回
            res.json(results)
        })
    },

    getBook_standlink: async (req, res) => {
        await BookAboutService.getBook_standlink(req.body, (results) => {
            // 以json的形式返回
            res.json(results)
        })
    },


    getBook_isbn: async (req, res) => {
        // console.log(req.params.id)
        await BookAboutService.getBook_isbn(req.params.id, (results) => {
            // 以json的形式返回
            res.json({ results })
        })
    },

    getBook_kind: async (req, res) => {
        // console.log(req.params.id)
        await BookAboutService.getBook_kind(req.params.id, (results) => {
            // 以json的形式返回
            res.json({ results })
        })
    },

    getBook_stand: async (req, res) => {
        // console.log(req.params.id)
        await BookAboutService.getBook_stand(req.params.id, (results) => {
            // 以json的形式返回
            res.json({ results })
        })
    }
}

module.exports = BookAboutController