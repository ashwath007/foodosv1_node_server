const Hotels = require("../models/hotels");
const Product = require("../models/product");

exports.getAllHotels = (req, res) => {
    Hotels.find({}, (err, allHotels) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        return res.json({
            allHotels
        })
    })
}



exports.getAHotels = (req, res) => {
    Hotels.findById(req.params.hotId, (err, aHotels) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        return res.json({
            aHotels
        })
    })
}



exports.addHotel = (req, res) => {
    const hotel = new Hotels(req.body);
    hotel.save((err, savedHotel) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        return res.json({
            savedHotel
        })
    })
}


// exports.addProductToHotel = (req, res) => {
//     Hotels.findById(req.params.hotelId, (err, getHotel) => {
//         getHotel.products.push(req.body.productId);
//         getHotel.save((err, savedProduct) => {
//             if (err) {
//                 return res.json({
//                     err: err
//                 })
//             }

//             // TODO Here we need to store hotel id or name in the pushed product
//             Product.findById({ _id: req.body.productId }, (err, hoteladdedinProduct) => {
//                 if (err) {
//                     return res.json({
//                         err: err
//                     })
//                 }
//                 hoteladdedinProduct.hotels = req.params.hotelId;
//                 hoteladdedinProduct.save((err, addedProduct) => {
//                     if (err) {
//                         return res.json({
//                             err: err
//                         })
//                     }
//                     return res.json({
//                         addedProduct
//                     })
//                 })

//             });

//         })
//     })
// }


exports.getAllProductsFromHotel = (req, res) => {
    Hotels.findById(req.params.hotelId, (err, getHotels) => {
        if (err) {
            return res.json({
                err: err
            })
        }
        console.log(getHotels.products)
            // getHotels.products.forEach(element => {
            //     console.log(" >> ", element)
            // });
        Product.find().where('_id').in(getHotels.products).exec((err, records) => {
            return res.json({
                records
            })
        });
    });
}




exports.getAllHotelsFromProduct = (req, res) => {
    let hotel_ids = [];
    Product.find({ name: req.params.foodName }).exec((err, got) => {
        if (err) {
            return res.json({
                err: err
            })
        }

        got.forEach(element => {
            hotel_ids.push(element.hotels);
        });
        Hotels.find().where('_id').in(hotel_ids).exec((err, records) => {
            return res.json({
                records
            })
        });
    })
}