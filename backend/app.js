const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const errorHandler = require("./middleware/error");

//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoutes = require("./routes/jobTypeRoutes");
const jobRoute = require("./routes/jobRoutes");

// Database connection

mongoose.connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  }).then(() => {
    console.log("DB connected");
  }).catch((err) => console.log(err));




app.use(morgan('dev'));
app.use(bodyparser.json({limit:"5mb"}));
app.use(bodyparser.urlencoded({
    limit:"5mb",
    extended:true
}));

app.use(cookieParser());
app.use(cors());



// ROUTES MIDDLEWARE
// app.get('/favicon.ico', (req, res) => res.status(204));

// app.get('/',(req,res)=>{
      
//     res.send("Hello from nodejs")
// });

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',jobTypeRoutes);
app.use('/api',jobRoute);


//MIDDLEWARE
// error middleware
app.use(errorHandler);

//PORT
const port = process.env.PORT || 9000;

app.listen(port,()=>{
    console.log(`Server running on port${port}`);
})