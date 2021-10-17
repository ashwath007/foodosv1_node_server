// const Hotels = require("../models/hotels");

// exports.getAllHotels = (req, res) => {
//     Hotels.find({}, (err, allHotels) => {
//         if (err) {
//             return res.json({
//                 err: err
//             })
//         }
//         return res.json({
//             allHotels
//         })
//     })
// }



// exports.getAHotels = (req, res) => {
//     Hotels.findById(req.params.hotId, (err, aHotels) => {
//         if (err) {
//             return res.json({
//                 err: err
//             })
//         }
//         return res.json({
//             aHotels
//         })
//     })
// }



// exports.addHotel = (req, res) => {
//     const hotel = new Hotels(req.body);
//     hotel.save((err, savedHotel) => {
//         if (err) {
//             return res.json({
//                 err: err
//             })
//         }
//         return res.json({
//             savedHotel
//         })
//     })
// }