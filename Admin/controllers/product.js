const Product = require("../models/product");
const Hotels = require("../models/hotels");

exports.addProduct = (req, res) => {
    const pro = new Product(req.body);
    pro.save((err, saved) => {
        if (err) {
            return res.status(400).json({
                err: err
            })
        }
        Hotels.findById(req.body.hotels, (err, thatHotel) => {
            if (err) {
                return res.status(400).json({
                    err: err
                })
            }
            thatHotel.products.push(saved._id);
            thatHotel.save((err, hotSaved) => {
                if (err) {
                    return res.status(400).json({
                        err: err
                    })
                }
                return res.json(
                    hotSaved
                )
            })

        });

    });
}



exports.getAllProducts = (req, res) => {
    Product.find({}, (err, allPro) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        return res.json({
            allPro
        })
    })
}



exports.getAProducts = (req, res) => {
    Product.findById(req.params.proId, (err, apro) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        return res.json({
            apro
        })
    })
}