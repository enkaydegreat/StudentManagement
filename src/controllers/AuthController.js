const usersdb = {
    users : require('../db/users.json'),
    setUsers: function(data){this.users = data}
}
const User = require('../db/User')
const path = require('path');
const fsPromises = require('fs/promises');

function UserLogin(req,res){
    let {username,password} = req.body;
    //resume here
    if(!username || !password) return res.status(401).json({message :"username and password are requried"});

    //checking if user exists
    const existingUser = usersdb.users.find(user => user.username == username);
    if(!existingUser) return res.status(401).json({massage:"user does not exist"})

    //checking if password exists
    if(existingUser.password != password) return res.status(401).json({message: "Invalid password"})

    res.status(200).json(
        {
            message:"user logged In",
            role : existingUser.role            
});
}

 async function  AddNewUser (req,res){
    const {username, password,role} = req.body;
    if(!username || !password) return res.status(401).json({message :"username and password are requried"});
 
    //checking if user exists
    const duplicate = await User.findOne({username: req.body.username}).exec();
    if(duplicate) return res.status(409).json({message:"username exist"})

     //new user 
     const newUser = {
        username: req.body.username,
        password: req.body.password,
        role : req.body.role,
    }  

    try{ 

       const result = await User.create(newUser);
       console.log(result);
       res.status(200).json({"message": "user created"});
    }catch(error){
        console.log(error)
    }

}
  



module.exports = {UserLogin,AddNewUser}