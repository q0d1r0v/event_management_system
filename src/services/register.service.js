/**
 * @swagger
 * /api/v1/register/create:
 *   post:
 *     tags: ['Registration Management']
 *     summary: Create a registration for an event
 *     description: Allows a user to register for a specific event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 description: The ID of the event the user wants to register for.
 *                 example: "abcde123-4567-890a-bcde-123456789abc"
 *               userId:
 *                 type: string
 *                 description: The ID of the user who is registering for the event.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Registration created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Register created successfully"
 *                 register:
 *                   type: object
 *                   properties:
 *                     event_id:
 *                       type: string
 *                       example: "abcde123-4567-890a-bcde-123456789abc"
 *                     user_id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: Validation failed. Event or user not found, or already registered.
 *       404:
 *         description: Event or user not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/register:
 *   get:
 *     tags: ['Registration Management']
 *     summary: Get all registrations
 *     description: Retrieves all user registrations for events.
 *     responses:
 *       200:
 *         description: A list of registrations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Registration retrieved successfully"
 *                 registers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       event_id:
 *                         type: string
 *                         example: "abcde123-4567-890a-bcde-123456789abc"
 *                       user_id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       event:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "abcde123-4567-890a-bcde-123456789abc"
 *                           name:
 *                             type: string
 *                             example: "Tech Conference 2024"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           username:
 *                             type: string
 *                             example: "john_doe"
 *       500:
 *         description: Internal server error.
 */

const Joi = require("joi");
const { User, Event, Registration } = require("../../models");

const createRegister = async (eventId, userId) => {
  try {
    const registerSchema = Joi.object({
      eventId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.guid": "Invalid eventId format",
          "string.empty": "Event ID cannot be empty",
        }),
      userId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.guid": "Invalid userId format",
          "string.empty": "User ID cannot be empty",
        }),
    });

    const { error, value } = registerSchema.validate({ eventId, userId });
    if (error) {
      return {
        status: 400,
        message: "Validation failed",
        errors: error.details,
      };
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return { status: 404, message: "Event not found" };
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const existingRegister = await Registration.findOne({
      where: { event_id: eventId, user_id: userId },
    });
    if (existingRegister) {
      return {
        status: 400,
        message: "User is already registered for this event",
      };
    }

    const register = await Registration.create({
      event_id: eventId,
      user_id: userId,
    });

    return { status: 201, message: "Register created successfully", register };
  } catch (error) {
    console.error("Error in createRegister:", error);
    return { status: 500, message: "Internal server error", error };
  }
};
const getRegisters = async () => {
  try {
    const registers = await Registration.findAll({
      include: [
        {
          model: Event,
          as: "event",
        },
        {
          model: User,
          as: "user",
        },
      ],
    });

    return {
      status: 200,
      message: "Registration retrieved successfully",
      registers,
    };
  } catch (error) {
    console.error("Error in getRegisters:", error);
    return {
      status: 500,
      message: "Internal server error",
      error,
    };
  }
};

module.exports = { createRegister, getRegisters };
