const express = require("express");
const argon2 = require("argon2");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        if (await User.exists({ email: req.body.email })) {
            res.send({ message: "This email has already been registered" })
        } else if (await User.exists({ username: req.body.username })) {
            res.send({ message: "This username has already been taken" })
        } else {
            const salt = crypto.randomBytes(16).toString("base64");
            const hash_pw = await argon2.hash(
                crypto.createHmac("sha256", salt).update(req.body.password).digest("base64"),
                { type: argon2.argon2id });
            const newUser = new User({
                email: req.body.email,
                username: req.body.username,
                hash_pw: hash_pw,
                salt: salt
            });
            await newUser.save()
                .then(() => res.send({
                    registered: true,
                    message: "Created account successfully"
                }))
                .catch(err => res.status(400).send({
                    error: err,
                    message: "Error creating account"
                }));
        }
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
})

router.post("/login", async (req, res) => {
    try {
        await User.findOne({ username: req.body.username }, async (err, user) => {
            if (err) {
                console.log(err);
            }
            if (user) {
                if (await argon2.verify(
                    crypto.createHmac("sha256", user.salt).update(req.body.password).digest("base64"),
                    user.hash_pw
                )) {
                    const token = jwt.sign({
                            id: user._id,
                        }, process.env.JWT_SECRET, { expiresIn: "1h" })
                    res.send({
                        session: {
                            id: user._id,
                            token: token
                        },
                        message: "Logged in successfully"
                    })
                } else {
                    res.send({ message: "Password is incorrect" })
                }
            } else {
                res.send({ message: "This user does not exist" })
            }
        })
    } catch (err) {
        res.status(500).send();
        console.log(err);
    }
})

module.exports = router;
