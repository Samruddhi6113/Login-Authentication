// const { User, validate } = require("../models/user");
// const router = require("express").Router();
// const bcrypt = require("bcrypt");
// router.post("/", async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if(error)
//             return res.status(400).send({ message: error.details[0].message });
        
//         const user = await User.findOne({ email: req.body.email });
//         if(user)
//             return res.status(409).send({ message: "User with given email already exists" });
        
//         const salt = await bcrypt.genSalt(Number(process.env.SALT));
//         const hashPassword = await bcrypt.hash(req.body.password, salt);
//         await new User({...req.body, password: hashPassword}).save();
//         res.status(201).send({ message: "User created successfully"})
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error"})
//     }
// })
// module.exports = router;
const { User, validate } = require("../models/user");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) 
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exists" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;


// const router = require("express").Router();
// const { User } = require("../models/user");
// const bcrypt = require("bcrypt");
// const Joi = require("joi");

// router.post("/register", async (req, res) => {
//     try {
//         // Validate request body
//         const { error } = validateUser(req.body);
//         if (error) 
//             return res.status(400).send({ message: error.details[0].message });
        
//         // Check if user already exists
//         const userExists = await User.findOne({ email: req.body.email });
//         if (userExists)
//             return res.status(400).send({ message: "User already registered" });

//         // Hash the password before saving
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(req.body.password, salt);

//         // Create new user with hashed password
//         const user = new User({
//             email: req.body.email,
//             password: hashedPassword
//         });

//         // Save user in database
//         await user.save();
//         res.status(201).send({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// // Joi validation function for registration request body
// const validateUser = (data) => {
//     const schema = Joi.object({
//         email: Joi.string().email().required().label("Email"),
//         password: Joi.string().min(6).required().label("Password"),
//     });
//     return schema.validate(data);
// };

// module.exports = router;
