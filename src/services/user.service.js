/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: ['Authentication']
 *     summary: Register a new user
 *     description: Registers a new user with username, email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "password123"
 *               role:
 *                 type: string
 *                 description: The role of the user. One of 'attendee', 'organizer', 'admin'.
 *                 example: "attendee"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "attendee"
 *       400:
 *         description: Validation failed or user already exists.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags: ['Authentication']
 *     summary: Login an existing user
 *     description: Logs in a user using their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyM2U0NTY3LWU4OWItMTJkMy1hNDU2LTQyNjYxODE3ODgwIn0.WGbJImZxP8gdzJltv8xJbqfQ6F-wLKsVdEC2c2CKcCg"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     username:
 *                       type: string
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "attendee"
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Invalid email or password.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     tags: ['User Management']
 *     summary: Update user details
 *     description: Updates a user's username, email, password, and role.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe_updated"
 *               email:
 *                 type: string
 *                 example: "john.doe.updated@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     username:
 *                       type: string
 *                       example: "john_doe_updated"
 *                     email:
 *                       type: string
 *                       example: "john.doe.updated@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       400:
 *         description: Validation failed.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/profiles/{userId}:
 *   post:
 *     tags: ['Profile Management']
 *     summary: Create a user profile
 *     description: Creates a profile for a user with additional information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to create a profile for.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Profile created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile created successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City, Country"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *       400:
 *         description: Validation failed.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/profiles/{userId}:
 *   put:
 *     tags: ['Profile Management']
 *     summary: Update user profile
 *     description: Updates a user's profile information.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to update profile for.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main St, City, Country"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City, Country"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *       400:
 *         description: Validation failed.
 *       404:
 *         description: Profile or user not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/profiles/{userId}:
 *   get:
 *     tags: ['Profile Management']
 *     summary: Get user profile
 *     description: Retrieves the profile of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to get profile for.
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   type: object
 *                   properties:
 *                     first_name:
 *                       type: string
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       example: "Doe"
 *                     address:
 *                       type: string
 *                       example: "123 Main St, City, Country"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *       404:
 *         description: Profile or user not found.
 *       500:
 *         description: Internal server error.
 */

const bcrypt = require("bcrypt");
const { User, Profile } = require("../../models");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const registerSchema = Joi.object({
      username: Joi.string().min(3).max(30).required().messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters long",
        "string.max": "Username must not exceed 30 characters",
      }),
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),
      password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters long",
      }),
      role: Joi.string()
        .valid("attendee", "organizer", "admin")
        .optional()
        .messages({
          "any.only": "Role must be one of ['attendee', 'organizer', 'admin']",
        }),
    });
    const { error, value } = registerSchema.validate(req.body, {
      abortEarly: false,
    });
    const { username, email, password, role } = value;
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),
      password: Joi.string().required().messages({
        "string.empty": "Password is required",
      }),
    });
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const { email, password } = value;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateUserSchema = Joi.object({
      username: Joi.string().optional().messages({
        "string.empty": "Username cannot be empty",
      }),
      email: Joi.string().email().optional().messages({
        "string.email": "Invalid email format",
      }),
      password: Joi.string().optional().messages({
        "string.empty": "Password cannot be empty",
      }),
      role: Joi.string()
        .valid("attendee", "organizer", "admin")
        .optional()
        .messages({
          "any.only": "Role must be one of attendee, organizer, or admin",
        }),
    });

    const { error, value } = updateUserSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((err) => err.message),
      });
    }

    const { id } = req.params;
    const { username, email, password, role } = value;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      username: username || user.username,
      email: email || user.email,
      password: hashedPassword || user.password,
      role: role || user.role,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const createProfile = async (userId, profileData) => {
  try {
    const profileSchema = Joi.object({
      userId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.guid": "Invalid userId format",
          "string.empty": "User ID cannot be empty",
        }),
      firstName: Joi.string().required().messages({
        "string.empty": "First name cannot be empty",
      }),
      lastName: Joi.string().required().messages({
        "string.empty": "Last name cannot be empty",
      }),
      address: Joi.string().required().messages({
        "string.empty": "Address cannot be empty",
      }),
      phone: Joi.string().required().messages({
        "string.empty": "Phone number cannot be empty",
      }),
    });
    const { error, value } = profileSchema.validate(profileData);
    if (error) {
      return {
        status: 400,
        message: "Validation failed",
        errors: error.details,
      };
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const profile = await Profile.create({
      user_id: userId,
      first_name: value.firstName,
      last_name: value.lastName,
      address: value.address,
      phone: value.phone,
    });

    return { status: 201, message: "Profile created successfully", profile };
  } catch (error) {
    console.error("Error in createProfile:", error);
    return { status: 500, message: "Internal server error", error };
  }
};

const updateProfile = async (userId, profileData) => {
  try {
    const { firstName, lastName, address, phone } = profileData;

    const user = await User.findByPk(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const profile = await Profile.findOne({ where: { user_id: userId } });
    if (!profile) {
      return { status: 404, message: "Profile not found" };
    }

    await profile.update({
      first_name: firstName || profile.first_name,
      last_name: lastName || profile.last_name,
      address: address || profile.address,
      phone: phone || profile.phone,
    });

    return { status: 200, message: "Profile updated successfully", profile };
  } catch (error) {
    console.error("Error in updateProfile:", error);
    return { status: 500, message: "Internal server error", error };
  }
};

const getProfile = async (userId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Profile,
        as: "profile",
      },
    });

    if (!user) {
      return { status: 404, message: "User not found" };
    }

    if (user.role === "admin") {
      const users = await User.findAll({
        include: {
          model: Profile,
          as: "profile",
        },
      });
      return { status: 200, message: "All users' profiles", users };
    } else {
      return { status: 200, message: "User profile", profile: user.profile };
    }
  } catch (error) {
    console.error("Error in getProfile:", error);
    return { status: 500, message: "Internal server error", error };
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  createProfile,
  updateProfile,
  getProfile,
};
