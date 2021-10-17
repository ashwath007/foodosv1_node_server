const User = require('../models/user');
const Product = require('../../Admin/models/product');
const random = require('random')
const Order = require('../../Admin/models/order');
const axios = require('axios');


exports.findUser = (req, res) => {
    User.findOne({ wa_chatId: req.body.chatId }, (err, gotUser) => {
        if (err) {
            console.log(err)

        }
        if (!gotUser) {
            res.json({
                gotUser: null
            })
        } else if (gotUser.profile_completed === false) {

            res.json({
                gotUser: gotUser
            })


        } else {
            console.log("Here")
            delivery_msg = "☺️ Ok, It will take ~18 min delivery 🏍️. Please wait ⌚ \n Do you need anything else ?"
            res.json({
                gotUser: true,
                delivery_msg
            })
        }
    })


}

exports.adduserLocation = (req, res) => {
    console.log(req.body)
    User.findOne({ wa_chatId: req.body.chatId }, (err, gotUser) => {
        if (err) {
            console.log(err)

        }

        gotUser.location.coordinates.push(req.body.lat, req.body.lng);
        gotUser.profile_completed = true;
        gotUser.save((err, profileComplete) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    gotUser: profileComplete
                })
            }
        })

    })
}


exports.completeUserProfile = (req, res) => {
    console.log(req.body);
    const user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.sex = req.body.sex;
    user.wa_chatId = req.body.userId;
    user.profile_completed = false;
    user.nick_name = req.body.name;
    user.cart = [];
    user.order_active = [];
    user.order_history = [];
    user.save((err, created) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't save the user",
                error_msg: err
            })
        } else {
            return res.json({
                msg: "User profile created",
                status: true,
                data: created
            })
        }
    })
}

exports.getUserData = (req, res) => {
    console.log(req.body);
    User.findOne({ wa_chatId: req.body.chatId }, (err, isUser) => {
        console.log(isUser)
        if (err) {
            return res.status(400).json({
                error: "Couldn't find the user, or new user",
                error_msg: err
            })
        } else {

            if (isUser !== undefined) {
                return res.json({
                    msg: "User exist",
                    user_data: isUser,
                    is_exist: true
                })
            } else {

                // axios.post()
                //     .then((res) => {

                //     })
                //     .catch((err) => {
                //         console.log(err)
                //     });
                return res.json({
                    is_exist: false
                })
            }
        }
    })
}


exports.summaTestWA = (req, res) => {
    // async function start(client) {
    //     await client.sendText(req.body.chatId, "Oii Triggered Here");
    // }
    // create(launchConfig).then(start);
}


exports.isUserExist = (req, res) => {
    console.log(req.body);
    User.findOne({ wa_chatId: req.body.chatId }, (err, isUser) => {
        if (err) {
            return res.status(400).json({
                error: "Couldn't find the user, or new user",
                error_msg: err
            })
        } else {
            console.log(isUser === null)

            if (isUser !== undefined && isUser !== null) {
                console.log('isUser - 1')
                console.log(isUser)
                return res.json({
                    msg: "User exist",
                    user_data: isUser,
                    is_exist: true
                })
            } else if (isUser === null) {
                console.log('isUser - 2')
                return res.json({
                        msg: "User does not exist",
                        is_exist: false
                    })
                    // axios.post("http://localhost:5005/webhooks/rest/webhook", {
                    //         "sender": req.body.chatId,
                    //         "message": "formgenerate"
                    //     })
                    //     .then(ress => {
                    //         console.log(ress)
                    //         return res.json({
                    //             msg: "User does not exist",
                    //             is_exist: false
                    //         })
                    //     })
                    //     .catch(err => {
                    //         console.log(err)
                    //     })


            } else {
                console.log('isUser - 3')


                return res.json({
                    msg: "User does not exist",
                    is_exist: false
                })

            }
        }
    })
}




exports.addToCart = (req, res) => {
    console.log("Hoooo", req.body)
    console.log("Hoooo", req.params.userId)

    function ckeckProductIdInCart(gotUser, pID) {
        result = gotUser.cart.filter((i) => i.productId === pID)
        console.log(result)
        if (result.length === 0)
            return false
        else
            return true
    }

    User.findById(req.params.userId, (err, gotUser) => {
        if (err) {
            return res.status(400).json({
                err: err
            })
        } else if (gotUser === undefined) {
            return res.json({
                msg: "User doesn't exist"
            })
        } else {
            if (gotUser.cart.length === 0 || !ckeckProductIdInCart(gotUser, req.body.productId)) {
                gotUser.cart.push({ productId: req.body.productId, qty: 1 });

            } else {
                itemIndex = gotUser.cart.findIndex(p => p.productId == req.body.productId)
                console.log(itemIndex)
                if (itemIndex > -1) {

                    let productItem = gotUser.cart[itemIndex];
                    productItem.qty = productItem.qty + 1;
                    gotUser.cart[itemIndex] = productItem;
                }

                // item["qty"] = item["qty"] + 1;
                // console.log(item)

            }
            gotUser.save((err, savedCart) => {
                if (err) {
                    return res.status(400).json({
                        err: err
                    })
                }
                return res.json({
                    savedCart,
                    cart_cation: true
                })
            })

        }

    })


    // User.findById(req.params.userId).where('cart').in(req.body.productId)
    //     .exec((err, gotProduct) => {
    //         if (err) {
    //             return res.status(400).json({
    //                 err: err
    //             })
    //         } else if (gotProduct === undefined) {

    //             console.log("Add to cart", gotProduct);

    //             const cart_data = { productId: req.body.productId, qty }
    //             gotProduct.cart.push(cart_data);
    //             gotProduct.save((err, saved) => {
    //                 if (err) {
    //                     return res.status(400).json({
    //                         err: err
    //                     })
    //                 }
    //                 return res.json({
    //                     saved
    //                 })
    //             })
    //         }
    //     });



}


exports.removeFromCart = (req, res) => {
    console.log("Remove From Cart", req.body)
    console.log("Remove From Cart From UserId : ", req.params.userId)
    console.log("Remove Product From : ", req.body.productId)

    function ckeckProductIdInCart(gotUser, pID) {
        result = gotUser.cart.filter((i) => i.productId === pID)
        console.log(result)
        if (result.length === 0)
            return false
        else
            return true
    }

    User.findById(req.params.userId, (err, gotUser) => {
        if (err) {
            return res.status(400).json({
                err: err
            })
        } else if (gotUser === undefined) {
            return res.json({
                msg: "User doesn't exist"
            })
        } else {
            if (gotUser.cart.length === 0 || !ckeckProductIdInCart(gotUser, req.body.productId)) {
                return false

            } else {
                itemIndex = gotUser.cart.findIndex(p => p.productId == req.body.productId)
                console.log(itemIndex)
                if (itemIndex > -1) {

                    let productItem = gotUser.cart[itemIndex];
                    let temp_qty = productItem.qty - 1;
                    if (productItem.qty === 1 || temp_qty === 0) {
                        new_cart_list = gotUser.cart.filter((item) => item.productId !== req.body.productId);
                        console.log("new_cart_list -> ", new_cart_list)
                        gotUser.cart = new_cart_list;
                    } else {
                        productItem.qty = productItem.qty - 1;
                        gotUser.cart[itemIndex] = productItem;
                    }
                }

                // item["qty"] = item["qty"] + 1;
                // console.log(item)

            }
            gotUser.save((err, savedCart) => {
                if (err) {
                    return res.status(400).json({
                        err: err
                    })
                }
                return res.json({
                    savedCart,
                    cart_cation: true
                })
            })

        }

    })
}



exports.getAllProductInCart = (req, res) => {
    User.findById(req.params.userId, (err, gotAll) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        return res.json({
            gotAll
        })
    });
}



exports.getallproductDataFromCart = (req, res) => {
    User.findById(req.params.userId, (err, gotAll) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }
        if (gotAll.cart.length > 0) {
            var id_list = []
            gotAll.cart.map((i) => {
                id_list.push(i.productId)
            })
            console.log(id_list);
            Product.find().where('_id').in(id_list).exec((err, records) => {
                return res.json({
                    records
                })
            });
        } else {
            return res.json({
                msg: "Cart is empty"
            })
        }

    });
}


exports.userOrdernow = (req, res) => {
    // console.log("Order Details ", req.body)
    cart_product_ids = [];
    req.body.allCart.map((ele) => {
        cart_product_ids.push(ele.productId)
    });

    Product.find().where('_id').in(cart_product_ids).exec((err, records) => {
        if (records) {
            // console.log(records)

            // First - match productId with categoryId
            // Second - calculate total
            // Third - Push orderId to user order_list 
            // return
            var total = 0;
            var temp_data = 0;
            var order_cart = [];
            records.map((el) => {
                // console.log(el._id)
                temp_data = req.body.allCart.filter(x => x.productId === el._id.toString()).map(x => x.qty);
                console.log(temp_data)
                total = total + (temp_data[0] * el.price)
                order_cart.push({ product: el, qty: temp_data })
            })
            console.log(total)
            var order_id = random.int(9999, 999999)
            const new_order = new Order();
            new_order.orderId = order_id;
            new_order.productData.push(order_cart)
            new_order.totalPrice = total;
            new_order.payment_method = 'payment';
            new_order.order_status = '';
            new_order.save((err, order_saved) => {

                User.findById(req.body.userId, (err, gotUser) => {
                    if (err) {
                        return res.status(400).json({
                            err
                        })
                    }
                    gotUser.order_active.push(order_saved._id)
                    gotUser.cart = [];
                    gotUser.save((err, user_order) => {
                        if (err) {
                            return res.status(400).json({
                                err
                            })
                        }
                        // Server 

                        return res.json({
                            order_food: true
                        })
                    })
                });
            })



        }
    });
}

// exports.userOrderLocation = () => {

// }


exports.userOrderPayment = (req, res) => {
    console.log(req.body);

}





exports.showUserOrders = (req, res) => {
    console.log(req.body)
    User.findById(req.body.userId, (err, getOrder) => {



        // Here we are assuming that we have one active order
        if (getOrder.order_active.length === 1) {
            Order.findById(getOrder.order_active[0], (err, order_data) => {
                console.log(order_data)
                if (err) {
                    return res.json({
                        err
                    })
                }
                return res.json({
                    order_data
                })
            });
        } else if (getOrder.order_active.length > 1) {
            Order.find().where('_id').in(getOrder.order_active).exec((err, order_data) => {
                return res.json({
                    order_data
                })
            })
        }

    });
}