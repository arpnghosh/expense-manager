import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// login

const userAuth = expressAsyncHandler(async (req, res) => {
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

// signup

const userRegister = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExits = await User.findOne({ email });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (userExits) {
    res.status(200).json({ message: "user already exits" });
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

// logout

const userLogout = (req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };

  // check out logged in user's profile

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
  
  export { userAuth, userRegister, userLogout, userProfile };
