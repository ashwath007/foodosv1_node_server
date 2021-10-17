const Restaurant = require("../models/register");
const pig = require('pigcolor');

// Create Restaurnt 
exports.registerRestaurant = (req, res) => {
    pig.box("RESTAURANT REGISTER");
    const rest = new Restaurant();
    rest.name = req.body.name;
    rest.description = req.body.description;
    rest.logo = req.body.logo;
    rest.password = req.body.password;
    rest.save((err, restaurantCreated) => {
        if (err) {
            return res.status(400).json({
                err: "Could't Create Restaurant",
                error: err
            })
        }
        return res.json({
            msg: "Restaurant Created Scuessfuly"
        })
    })
}

// Get All Restaurant
exports.getAllRestaurants = (req, res) => {
    pig.box("GET ALL RESTAURANT");
    Restaurant.find({}, (err, allRestaurnats) => {
        if (err) {
            return res.status(400).json({
                err: "Could't Get All Restaurant",
                error: err
            })
        }
        return res.json({
            msg: "All Restaurants Data",
            data: allRestaurnats
        })
    })
}

// Get A Restaurant
exports.getARestaurant = (req, res) => {
    pig.box("GET A RESTAURANT");
    Restaurant.findById(req.params.resId, (err, aRestaurant) => {
        if (err) {
            return res.status(400).json({
                err: "Could't Get A Restaurant",
                error: err
            })
        }
        return res.json({
            msg: "All Restaurants Data",
            data: aRestaurant
        })
    })
}