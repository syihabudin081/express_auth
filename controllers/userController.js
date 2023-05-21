const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

// Register a new user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password is empty or not provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Trim whitespace from username and password
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  // Check if trimmed username or password is empty after removing whitespace
  if (!trimmedUsername || !trimmedPassword) {
    return res
      .status(400)
      .json({ error: "Username and password cannot be empty" });
  }

  try {
    // Check if the username already exists

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, password: hashedPassword });
    console.log(user);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Login and generate JWT token
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if username or password is empty or not provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Trim whitespace from username and password
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  // Check if trimmed username or password is empty after removing whitespace
  if (!trimmedUsername || !trimmedPassword) {
    return res
      .status(400)
      .json({ error: "Username and password cannot be empty" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(401)
        .json({
          error: "Authentication failed. Invalid username or password.",
        });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          error: "Authentication failed. Invalid username or password.",
        });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get user" });
  }
};
