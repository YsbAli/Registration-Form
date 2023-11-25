const JWT = require("jsonwebtoken")
const mongoose = require("mongoose")
require("dotenv").config()

const Joi = require("joi")                                                                // joi is The most powerful schema description language and data validator for JavaScript.
const PasswordComplexity = require("joi-password-complexity")                            //it Creates a Joi object that validates password complexity.


const userSchema = new mongoose.Schema({
    first_Name: { type: String, require: true },
    last_Name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    // confirm_password: { type: String, require: true }
},{
    versionKey: false,
    timestamps: true
})

userSchema.methods.generateAuthToken = function () {
    const token = JWT.sign({ _id: this._id }, process.env.JWTKEY, { expiresIn: '5h' })
    return token
}


/*

// Adding a method to the User schema to generate an authentication token
userSchema.methods.generateAuthToken = function () {
  const user = this; // 'this' refers to the user document

  // Create a JWT payload containing user information
  const payload = {
    userId: user._id,
    email: user.email,
    // Additional user information...
  };

  // Sign the JWT with a secret key to create the token
  const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '1h' });

  return token;
};


*/



const User = mongoose.model("user", userSchema)


const ValidateSchema = (data) => {
    const schema = Joi.object({
        first_Name: Joi.string().required().label("First Name"),
        last_Name: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: PasswordComplexity().required().label("Password")
    })
    return schema.validate(data)                    //validate is a inbuild function it validate the schema
}

module.exports = { User, ValidateSchema }

