require('dotenv').config();
const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const connDB = require('./src/config/dbconn');


//connect DB
connDB();
//body parsing form formdata to rxpress request.
app.use(express.urlencoded({extended: false}))
//built in middleware for json
app.use(express.json());


//root routes
app.use('/', require('./src/routes/root'));
app.use('/login', require('./src/routes/login'));
app.use('/newuser', require('./src/routes/newUser'))
app.use('/Student', require('./src/routes/Student'))
app.use('/Student/add', require('./src/routes/Student'))
app.use('/Student/edit', require('./src/routes/Student'))
app.use('/teachers' , require('./src/routes/Teacher'));
app.use('/teachers/add', require('./src/routes/Teacher'))
app.use('/teachers/edit', require('./src/routes/Teacher'))



//unknown requests
app.get('/*' , (req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"src","views","404.html"))
})


mongoose.connection.once('open',()=>{
    console.log("MongoDB connected");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })

})
