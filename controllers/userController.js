const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// register
exports.registerController = async (req, res) => {
    console.log("inside register controller");
    console.log(req.body);
    const { userId, fName, lName, email, password, phnno } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("Alerdy existing user... please login")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new users({ userId, fName, lName, email, password: hashedPassword, phnno })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }

    // res.status(200).json("recevied")

}

// login
exports.loginController = async (req, res) => {
    console.log("inside login ");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            // token generation
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD)
            const isMatch = await bcrypt.compareSync(password, existingUser.password)
            if (isMatch) {
                res.status(200).json({ users: existingUser, token })
            } else {
                res.status(401).json("invalid password")
            }

        } else {
            res.status(404).json("Incorect email/password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// alluser
exports.allusersController=async (req,res) => {
    console.log("inside all users");
try {
    const alluser=await users.find()
    res.status(200).json(alluser.map(user=>({
        firstname:user.fName,lastname:user.lName,email:user.email
    })))
} catch (error) {
    res.status(401).json(error)
}
    // res.status(200).json("recevied")
    
}


// oneuser
exports.singleuserController = async (req,res) => {
    console.log("inside singleuser");
const email=req.body.email
try {
    const userdetail = await users.findOne({email})
    if (userdetail) {
        res.status(200).json(userdetail.map(details=>({
            firstname:details.fName,lastname:details.lName,email:details.email,phone:details.phnno
        })))
    } else {
        res.status(404).json("user not found")
 
    }
} catch (error) {
    res.status(401).json(error)

}    
}