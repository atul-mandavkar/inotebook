const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/myapp"; 
/* we recommend using 127.0.0.1 instead of localhost. That is because Node.js 18 and up prefer IPv6 addresses, which means, on many machines, Node.js will resolve localhost to the IPv6 address ::1 and Mongoose will be unable to connect, unless the mongodb instance is running with ipv6 enabled. */

const connectToMongo = async () =>{
    await mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database connected!"))
      .catch((err) => console.log(err));
}
//connectToMongo().catch((err) => console.log(err));

module.exports = connectToMongo;