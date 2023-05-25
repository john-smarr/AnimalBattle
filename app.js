const http = require("http");
require("dotenv").config();
require("./config/database").connect();
const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("./middelware/auth");
const cors = require("cors");
const app = express();

app.use(express.json({limit: "50mb"}));


// class Animal {
//     constructor(name, pic) {
//         this.name = name;
//         this.pic = pic;
//     }
//     getName() {
//         return this.name
//     }
//     getPic() {
//         return this.pic
//         if(typeof window === "object") {
//             return document.getElementById(this.pic)
//         } else {
//             return `${this.name} pic is supposed to go here`
//         }
//     }
// }

//Logic goes here

//Importing user contxt
const User = require("./model/user");

//Register
app.post("/register", async (req,res)=>{
    try {
        //get user input
        const { firstName, lastName, email, password } = req.body;

        //validate user input
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All fields are required");
        }

        //check if user already exists
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User aleady exists, please log in")
        }

        //Encrypt user password
        encryptedUserPassword = await bcrypt.hash(password, 10);

        //Create a user in database
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            email: email.toLowerCase(),
            password: encryptedUserPassword,
        });

        //create token
        const token = jwt.sign(
            { user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        //save user tokens
        user.token = token;

        //return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

//Login
app.post("/login", (req,res) => {

});

//Authentication
const corsOptions = {
    origin: 'http://animalbattle.com',
    optionsSuccessStatus: 200 //for legacy browsers
}

app.get('/welcome', cors(corsOptions), auth, (req,res) => {
    res.status(200).send("Welcome to animal battling! Choose your fighter: ")
})

//Upload an animal
app.post("/create", async (req,res) => {
    const { name, type, moveSet, image } = req.body

    //make sure user includes name
    if (!name) {
        res.status(400).send("You must pick an epic name for your animal!")
    } else {
        const animal = Animal.create({
            name: name,
            type: type,
            moveSet: moveSet,
            image: image
        })
    }
})

module.exports = app;