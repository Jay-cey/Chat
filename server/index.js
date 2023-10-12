const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

//CRUD
app.get('/', (req, res) => {
    res.send("Welcome to BuggyChat!")
})

//set port and link confidential informations with ".env"
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

// set strictQuery before establishing connection to MongoDB
mongoose.set('strictQuery', true);

// establish connection to database
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("MongoDB Connection Established")).catch((error)=>console.log("MongoDB Connection Failed : ", error.message));