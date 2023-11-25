const express = require("express")

const router = express.Router()

require("dotenv").config()

const bcrypt = require("bcrypt")


const { User, ValidateSchema } = require("../models/user.model")

router.post("/", async (req, resp) => {
    try {
        const { err } = ValidateSchema(req.body)
        if (err) {
            return resp.status(400).send({ message: err.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return resp.status(401).send({ message: "User with given email already exists" })
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await User.create({ ...req.body, password: hashPassword })

        resp.status(201).send(({ message: "Account Created Succeessfully! Thanks or Signup" }))

    }
    catch (err) {
        return resp.status(500).send({ Message: err.message })
    }

})



module.exports = router;