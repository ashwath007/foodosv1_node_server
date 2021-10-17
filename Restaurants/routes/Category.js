const express = require('express');
const router = express.Router();

const { addCategory, editCategory, deleteCategory, getAllcategory, getAcategory, addSubCategory, deleteSubCategory } = require("../controllers/Category");




// Category

router.post("/manage/create", addCategory);
router.put("/manage/edit/:categoryId", editCategory);
router.delete("/manage/delete/:categoryId", deleteCategory);


router.get("/manage/all", getAllcategory);
router.get("/manage/all/:categoryId", getAcategory);


// Sub - Category

router.post("/manage/sub/:categoryId/create", addSubCategory);
router.delete("/manage/sub/:categoryId/edit/:subcategoryId", deleteSubCategory);

// router.get("/manage/sub/all/:categoryId", getAllcategory);
// router.get("/manage/sub/a/:subcategoryId/cate/:categoryId", getAcategory);

module.exports = router;