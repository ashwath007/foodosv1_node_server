const pig = require('pigcolor');
const Category = require("../models/Category");
const Sub = require("../models/SubCategory");
// ** User


exports.getAllcategory = (req, res) => {
    pig.box("ALL CATEGORIES");
    Category.find({}, (err, allCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't fetch all Category"
            })
        } else {
            return res.json({
                msg: "Categories",
                data: allCategory
            })
        }
    });
}

exports.getAcategory = (req, res) => {
    pig.box("GET A CATEGORY");
    Category.findById({ _id: req.params.categoryId }, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't get a category",
                error_msg: err
            })
        } else {
            return res.json({
                msg: category
            })
        }
    });
}


// ** Admin

// *? Sub-Category
exports.addSubCategory = (req, res) => {
    pig.box("ADD SUB-CATEGORY");
    const sub = new Sub(req.body);
    sub.save((err, saved) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't save the Sub-Category",
                error_msg: err
            })
        } else {
            Category.findById(req.params.categoryId, (err, category) => {
                if (err) {
                    return res.status(400).json({
                        error: "Couldn't get the category"
                    })
                } else {
                    category.sub.push(saved._id);
                    category.save((err, savedsub) => {
                        if (err) {
                            return res.status(400).json({
                                error: "Couldn't puch sub-category"
                            })
                        } else {
                            return res.json({
                                msg: "Sub-Category Saved",
                                data: saved
                            })
                        }
                    });

                }
            })




        }
    });
}

exports.deleteSubCategory = (req, res) => {
    pig.box("DELETE SUB-CATEGORY & REMOVE SUB FROM CATEGORY");
    Category.findById(req.params.categoryId, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't find the Category",
                error_msg: err
            })
        }
        for (var i = 0; i < category.sub.length; i++) {
            if (String(category.sub[i]) === String(req.params.subcategoryId)) {
                category.sub.remove(req.params.subcategoryId);
                break;
            }
        }
        category.save((err, done) => {
            if (err) {
                return res.status(400).json({
                    error: "Couldn't save removed Category",
                    error_msg: err
                })
            }
            Sub.findByIdAndDelete(req.params.subcategoryId, (err, subDeleted) => {
                if (err) {
                    return res.status(400).json({
                        error: "Coudln't Delete the Sub-Category",
                        error_msg: err
                    })
                }
                return res.json({
                    msg: "Deleted Sub-Category Sucessful"
                })
            });
        })
    });
}



// *? Category

exports.addCategory = (req, res) => {
    console.log(req.body);
    const newCategory = Category(req.body);
    newCategory.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't Create Category",
                error_msg: err
            });
        } else {
            return res.json({
                msg: "Category Created Successfully"
            })
        }
    });
    pig.box("Add Category");
}

exports.editCategory = (req, res) => {
    console.log(req.params.categoryId);
    // console.log(req.body);
    if (req.params.categoryId == undefined) return res.json({ error: "Your are not autherised" });
    pig.box("Edit Category");
    Category.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }, (err, edited) => {
        if (err) {
            console.log(edited);
            return res.status(400).json({
                error: "Couldn't Edit Category"
            });
        } else {
            return res.json({
                msg: "Category Edited Successfully"
            })
        }
    });
}

exports.deleteCategory = (req, res) => {
    pig.box("Delete Category");
    Category.findByIdAndDelete(req.params.categoryId, (err, deleted) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't Delete Category"
            });
        } else {
            return res.json({
                msg: "Category Deleted Successfully"
            })
        }
    });
}