const mongoose = require('mongoose')


const ConnectDb = async ()=>{

    try {
        await mongoose.connect(process.env.DATABASE_URI,{
            useUnifiedTopology:true,
            useNewUrlParser: true
        })
        
    } catch (error) {
        console.log("Error connectiing to MongoDB")
        console.error(error.message)
        
    }

}


module.exports = ConnectDb;