
const express = require("express")

const router = express.Router()

const { User } = require("../models/user.model")

const { Joi } = require("joi")

const bcrypt = require("bcrypt")


router.post("/", async (req, resp) => {
    try {
        //cheching the schema error
        // destructuring the "error" property from the result of validateSchema. The Joi validation "error" object contains details about the validation "error", and it's conventionally named error
        // const { err } = validateSchema(req.body)      // it should not be err 

        const { error } = validateSchema(req.body)
        if (error) {
            return resp.status(400).send({ Message: error.details[0].message })
        }

        //finding  the user email from the body in the User model or User table or User Collection
        const user = await User.findOne({ email: req.body.email })
        // console.log("users", user)

        //if user not found then error
        if (!user) {
            return resp.status(401).send({ Message: "Invalid Email or Password" })
        }

        // Checking the password......   comparing with bcrypt or hashing password
        const ValidPassword = await bcrypt.compare(req.body.password, user.password)

        if (!ValidPassword) {
            return resp.status(401).send({ Message: "Invalid Email or Password!" })
        }

        //if email & password match currectly then return the token  & send message logged in successfull

        const token = user.generateAuthToken()
        resp.status(200).send({ data: token, Message: "Logged in Successfully" })

    }
    catch (err) {
        // resp.status(500).send({ Message: "Internal Server Error !" })
        resp.status(500).send({ Message: err.message })
    }
})


//validate function which will validate our req.body or email.......

const validateSchema = (data) => {
    //schema is a Joi object which will validate email and password
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    })
    return schema.validate(data)
}


module.exports = router