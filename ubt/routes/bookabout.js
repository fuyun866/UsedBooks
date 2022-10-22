var express = require('express');
const BookAboutController = require('../controllers/BookAboutController');
const { upload_detailsImg } = require('../services/Upload')
var router = express.Router();

//添加书籍
router.post("/", upload_detailsImg.array('book_image', 4), BookAboutController.addBook)
//更新类别
router.put("/kind/:id", BookAboutController.updateBook_kind)
//更新状态
router.put("/state/:id", BookAboutController.updateBook_state)
//更新价格
router.put("/price/:id", BookAboutController.updateBook_price)
//删除
router.delete("/:id", BookAboutController.deleteBook)
//查询
router.get("/all", BookAboutController.getBook)
router.get("/allnum", BookAboutController.getBooknum)
router.get("/link", BookAboutController.getLinkbook)
router.get("/id/:id", BookAboutController.getBook_id)
router.get("/isbn/:id", BookAboutController.getBook_isbn)
router.get("/kind/:id", BookAboutController.getBook_kind)
router.get("/stand/:id", BookAboutController.getBook_stand)

router.post("/isbnlink", BookAboutController.getBook_isbnlink)      //bookA_isbn和bookA_state联查
router.get("/standlink", BookAboutController.getBook_standlink) //bookA_stand和bookA_state联查


module.exports = router;
