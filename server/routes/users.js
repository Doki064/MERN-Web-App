const express = require("express");
const argon2 = require("argon2");
const crypto = require("crypto");

const User = require("../models/user");

const router = express.Router();

router.route("/users")
    .get(async (req, res) => {
        await User.find(req.body, (err, users) => {
            // err ? console.log(err) : res.send(users);
        });
    })
    .post(async (req, res) => {
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
                password: hash_pw,
                salt: salt
            });
            await newUser.save()
                .then(() => res.send({
                    registered: true,
                    message: "Create account successfully"
                }))
                .catch(err => res.status(400).send({
                    error: err,
                    message: "Error creating account"
                }));
        }
    } catch (err) {
        res.status(500).send();
    }
})

module.exports = router;
