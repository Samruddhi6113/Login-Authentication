// // const mongoose = require("mongoose");
// // module.exports = () => {
// //     const connectionParams = {
// //         useNewUrlParser: true,
// //         useUnifiedTopology: true,
// //     };
// //     try {
// //         mongoose.connect(process.env.DB, connectionParams);
// //         console.log("Connected to database successfully")
// //     } catch (error) {
// //         console.log("could not connect to database!")
// //     }
// // }
// const mongoose = require("mongoose");

// module.exports = () => {
//     const connectionParams = {
//         // useNewUrlParser: true,
//         // useUnifiedTopology: true,
//     };
//     try {
//         mongoose.connect(process.env.DB, connectionParams);
//         console.log("Connected to database successfully");
//     } catch (error) {
//         console.log("Could not connect to database!", error);
//     }
// };


const mongoose = require("mongoose");

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose.connect(process.env.DB, connectionParams)
        .then(() => console.log("Connected to database successfully"))
        .catch((error) => console.error("Could not connect to database!", error));
};
