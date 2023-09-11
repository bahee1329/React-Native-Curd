const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;
const cors = require("cors");
const User = require("./models/user");
const Order = require("./models/order");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
    console.log("connected to mongodb");
}).catch((err) => {
    console.log("error connecting to mongodb", err);
});

app.listen(port, () => {
    console.log("server is running on port 8000");
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        if (password !== user.password) {
            console.log(password)
            console.log(user.password)
            return res.status(403).json({ message: "Invalid password" });
        }

        res.json({ message: "Successfully logged in" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred" });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Generate and store the verification token
        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        // Save the user to the database
        await newUser.save();

        res.send("Added the data");

        // Send verification email to user
        // sendVerificationEmail(newUser.email, newUser.verificationToken);
    } catch (error) {
        console.log("Error registering user", error);
        return res.status(500).json({ message: "Registration Failed" });
    }
});
