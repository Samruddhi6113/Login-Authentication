// // const router = require("express").Router();
// // const {User} = require("../models/user");
// // const bcrypt = require("bcrypt");
// // router.post("/", async (req, res) => {
// //     try{
// //         const { error } = validate(req.body);
// //         if(error)
// //             return res.status(400).send({ message: error.details[0].message });
        
// //         const user = await User.findOne({ email: req.body.email });
// //         if(!user)
// //             return res.status(401).send({ message: "Unvalid email or password" });
// //         const validPassword = await bcrypt.compare(
// //             req.body.password, user.password
// //         );
// //         if(!validPassword)
// //             return res.status(401).send({ message: "Unvalid email or password" });
// //         const token = user.generateAuthToken();
// //         res.status(200).send({data: token, message: "Logged in successfully"})
// //     }
// //     catch(error){
// //         res.status(500).send({ message: "Internal Server Error"})
// //     }
// // })
// // const validate = (data) => {
// //     const schema = Joi.object({
// //         email: Joi.string().email().required().label("Email"),
// //         password: Joi.string().string().required().label("Password")
// //     });
// //     return schema.validate(data);
// // }
// // module.exports = router;
// const router = require("express").Router();
// const { User } = require("../models/user");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");

// router.post("/", async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if (error) 
//             return res.status(400).send({ message: error.details[0].message });
        
//         const user = await User.findOne({ email: req.body.email });
//         if (!user)
//             return res.status(401).send({ message: "Invalid email or password" });
        
//         const validPassword = await bcrypt.compare(req.body.password, user.password);
//         if (!validPassword)
//             return res.status(401).send({ message: "Invalid email or password" });

//         const token = user.generateAuthToken();
//         res.status(200).send({ data: token, message: "Logged in successfully" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// // Joi validation function for request body
// const validate = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required().label("Email"),
//         password: Joi.string().min(6).required().label("Password"),  // changed from .email() to .string()
//     });
//     return schema.validate(data);
// };

// module.exports = router;

const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        // Validate request body
        const { error } = validate(req.body);
        if (error) 
            return res.status(400).send({ message: error.details[0].message });
        
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).send({ message: "Invalid email or password" });
        
        // Compare entered password with hashed password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(401).send({ message: "Invalid email or password" });

        // Generate JWT token
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Joi validation function for login request body
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = router;
