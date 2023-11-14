import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(res, user._id),
    });
  } else {
    res.status(200);
    throw new Error("invalid password or email");
  }
});

const userRegister = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (userExists) {
    res.status(200).json({ message: "user already exists" });
  }

  const user = await User.create({
    name,
    password: hashedPassword,
    email,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(res,user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const userLogout = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

const userProfile = expressAsyncHandler(async (req, res) => {
  
    const user = await User.findById(req.user.id);
    
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
  
  export { userLogin, userRegister, userLogout, userProfile };
