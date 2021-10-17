// const Product = require("../models/product");


// exports.addProduct = (req, res) => {
//     const pro = new Product(req.body);
//     pro.save((err, saved) => {
//         if (err) {
//             return res.status(400).json({
//                 err: err
//             })
//         }
//         return res.json(
//             saved
//         )
//     });
// }



// exports.getAllProducts = (req, res) => {
//     Product.find({}, (err, allPro) => {
//         if (err) {
//             return res.json({
//                 err: err
//             })
//         }
//         return res.json({
//             allpro
//         })
//     })
// }



// exports.getAProducts = (req, res) => {
//     Product.findById(req.params.proId, (err, apro) => {
//         if (err) {
//             return res.json({
//                 err: err
//             })
//         }
//         return res.json({
//             apro
//         })
//     })
// }