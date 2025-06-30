require('dotenv').config();

const express    = require('express'),
      app        = express(),
      cors       = require("cors"),
      port       = process.env.PORT || 8080,
      mongoose   = require('mongoose'), connect = mongoose.connect("mongodb://localhost:27017/");

mongoose.set("strictQuery", false);

const auth     = require("./Routes/authRoutes"),
      coins    = require("./Routes/coinsRoutes"),
      child    = require('./Routes/childRoutes'),
      diary    = require('./Routes/diaryRoutes'),
      question = require('./Routes/questionRoutes'),
      avatar   = require('./Routes/avatarRoutes'),
      letter   = require('./Routes/letterRoutes'),
      number   = require('./Routes/numberRoutes');
      
connect.then(()=>{
    console.log("DB connects successfully");
    app.listen(port, ()=>{
        console.log(`Server is running on Port: ${port}`)
    })
}) 
.catch((error) => console.log(`DB connection error ${error}`));


app.use(express.json()); //convert data into json format
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs'); //use ejs as the view engine
app.use(cors());

//just for testing
app.use('/uploads', express.static('public/uploads'));
app.use('/assets',  express.static('public/assets'));

app.use('/auth',     auth);
app.use('/coins',    coins);
app.use('/child',    child); 
app.use('/diary',    diary);
app.use('/question', question);
app.use('/avatar',   avatar);
app.use('/letter',   letter);
app.use('/number',   number);

app.use((request, response) => {
    response.status(404).json({ message: "Not Found" });
});
