const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateToken = require("../services/token.service");
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.json({ message: "All fields are required" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ message: "All field are required" });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ message: "user not found " });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        message: "invalid credentials",
      });
    const token = generateToken(user);
    // console.log(token); 
    res.status(200).json({
      message: "User login successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error " + error.message,
    });
  }
};
