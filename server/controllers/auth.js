
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const protectRoute=(req,res)=>{
 return res.json({message:"This is protected route"})
}

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    await UserModel.insertOne(newUser);

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getLoggedInUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    
    if (!name || !password) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    const user = await UserModel.findOne({ name });
    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({_id : user._id },process.env.JWT_SECRET_KEY,{"expiresIn":"1hr"})

    return res.status(200).json({token,user});
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
