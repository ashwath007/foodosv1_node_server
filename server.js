require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();
const Pig = require('pigcolor');
const mongoose = require('mongoose');
const axios = require('axios');



// User Schema

const User = require('./User/models/user');
//




const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// const { create, Client, ev } = require('@open-wa/wa-automate');



// All Router Here **********************************************

// *? User profile complete RASA
const userRoute = require('./User/routes/user');

// *? Admin Route
const adminRoute = require('./Admin/routes/register');
const hotelRoute = require('./Admin/routes/hotels');
const productRoute = require('./Admin/routes/product');
// *? Restaurant Route 
// const AdminRoute = require('./Admin/routes/register');
// **************************************************************



// *? Here test routes for showing demo
// const testHotelRoute = require('./TestUser/routes/hotels');
// const testProdRoute = require('./TestUser/routes/product');
//





// const launchConfig = {
//     useChrome: true,
//     autoRefresh: true,
//     cacheEnabled: false,
//     sessionId: 'hr',
//     headless: true
// };



// Database --------------------------------------------------
mongoose.connect(process.env.DATABASE_PROD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        Pig.db();
    });



//------------------------------------------------------------- 


// PORT 
// ------------------------------------------------------------
const Port = process.env.PORT || 8000;
const Rasa_port = "http://35.198.197.210/webhooks/rest/webhook"
const Rasa_port_local = "http://localhost:5005/webhooks/rest/webhook"

// ------------------------------------------------------------






//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());




app.use("/rasaapi", userRoute);
app.use("/api", adminRoute);
app.use("/api", hotelRoute);
app.use("/api", productRoute);
// app.use("/test", testHotelRoute);
// app.use("/test", testProdRoute);




// Test here api

app.get("/", (req, res) => {
    res.json({
        msg: "Working"
    })
});



// ----------------------------- Node -  Rasa Message Transmission -------------------------------------
// function start(client) {
//     client.onMessage(async message => {
//         console.log("Message type -> ", message.type)
//         if (message.type === 'chat') {
//             await client.simulateTyping(message.from, true)
//             axios.post(Rasa_port, {
//                     "sender": message.chatId,
//                     "message": message.body
//                 })
//                 .then(async function(response) {
//                     // console.log("response : ", response.data)
//                     // console.log("response : ", response.data[0].text)
//                     if (response.data[0].text === undefined)
//                         await client.sendText(message.from, '👧🏻 Come on, Chat with me!!! 🤙🏻');
//                     else
//                         await client.simulateTyping(message.from, false)
//                     await client.sendText(message.from, response.data[0].text);
//                 })
//                 .catch(function(error) {
//                     console.log(error);
//                 });
//         }


//     });

// -------------------------------------- User Location Set / Update ---------------------------------
//     client.onMessage(message => {
//             if (message.type === "location") {
//                 //Using destructuring
//                 const {
//                     // The text associated with the location
//                     loc,
//                     //Latitude
//                     lat,
//                     //Longitude
//                     lng
//                 } = message

//                 // post requies to 

//                 User.findOne({ wa_chatId: message.chatId }, async(err, gotUser) => {
//                     if (!gotUser) {
//                         await client.sendText(message.from, '👧🏻 Your profile is incomplete 🤙🏻, Wait');
//                         axios.post(Rasa_port, {
//                                 "sender": message.chatId,
//                                 "message": "profile"
//                             }).then(async function(response) {
//                                 // console.log("response : ", response.data)
//                                 // console.log("response : ", response.data[0].text)
//                                 if (response.data[0].text === undefined)
//                                     await client.sendText(message.from, '👧🏻 Come on,  🤙🏻');
//                                 else
//                                     await client.sendText(message.from, response.data[0].text);
//                             })
//                             .catch(function(error) {
//                                 console.log(error);
//                             });
//                     } else if (gotUser.profile_completed === false) {
//                         console.log(message)
//                         gotUser.location.coordinates.push(lat, lng);
//                         gotUser.profile_completed = true;
//                         gotUser.save(async(err, profileComplete) => {
//                             if (err) {
//                                 await client.sendText(message.from, " Couldn't complete your profile ");
//                             } else {
//                                 await client.sendText(message.from, `👧🏻 Your profile is all set ${gotUser.name}🤙🏻 Shall we order now ?`);
//                                 axios.post(Rasa_port, {
//                                     "sender": message.chatId,
//                                     "message": "I need biryani"
//                                 }).then(async(res) => {
//                                     console.log(res)
//                                     await client.sendText(message.from, response.data[0].text)
//                                 })
//                             }
//                         })
//                     } else {
//                         console.log("Here")
//                         delivery_msg = "☺️ Ok, It will take ~18 min delivery 🏍️. Please wait ⌚ \n Do you need anything else ?"
//                         await client.sendText(message.from, delivery_msg)
//                     }
//                 })

//                 .then(async function(response) {
//                         // console.log("response : ", response.data)
//                         // console.log("response : ", response.data[0].text)
//                         if (response.data[0].text === undefined)
//                             await client.sendText(message.from, '👧🏻 Come on, Chat with me!!! 🤙🏻');
//                         else
//                             await client.sendText(message.from, response.data[0].text);
//                     })
//                     .catch(function(error) {
//                         console.log(error);
//                     });
//             }
//         })
//         // ---------------------------------------------------------------------------------------------------

// }
// --------------------------------------------------------------------------------------------------





app.listen(Port, () => {
    Pig.server(Port);
});


// WatsApp Automation Connection Here
// create(launchConfig).then(start)