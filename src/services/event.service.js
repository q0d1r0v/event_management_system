/**
 * @swagger
 * /api/v1/event/create:
 *   post:
 *     tags: ['Event Management']
 *     summary: Create a new event
 *     description: Allows a user to create a new event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who is creating the event.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               name:
 *                 type: string
 *                 description: The name of the event.
 *                 example: "Tech Conference 2024"
 *               description:
 *                 type: string
 *                 description: A brief description of the event.
 *                 example: "A conference for tech enthusiasts to explore new trends."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time when the event will occur.
 *                 example: "2024-12-15T09:00:00Z"
 *               location:
 *                 type: string
 *                 description: The location where the event will take place.
 *                 example: "New York City, NY"
 *     responses:
 *       201:
 *         description: Event created successfully.
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
 *                   example: "Event created successfully"
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Tech Conference 2024"
 *                     description:
 *                       type: string
 *                       example: "A conference for tech enthusiasts to explore new trends."
 *                     date:
 *                       type: string
 *                       example: "2024-12-15T09:00:00Z"
 *                     location:
 *                       type: string
 *                       example: "New York City, NY"
 *                     organizer_id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *       400:
 *         description: Validation failed. Invalid data provided.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/event/{eventId}/update:
 *   put:
 *     tags: ['Event Management']
 *     summary: Update an event
 *     description: Allows a user to update an existing event by ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to update.
 *         example: "abcde123-4567-890a-bcde-123456789abc"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the event.
 *                 example: "Updated Tech Conference 2024"
 *               description:
 *                 type: string
 *                 description: A new brief description of the event.
 *                 example: "An updated description for the event."
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The new date and time of the event.
 *                 example: "2024-12-20T10:00:00Z"
 *               location:
 *                 type: string
 *                 description: The new location of the event.
 *                 example: "San Francisco, CA"
 *     responses:
 *       200:
 *         description: Event updated successfully.
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
 *                   example: "Event updated successfully"
 *                 event:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Updated Tech Conference 2024"
 *                     description:
 *                       type: string
 *                       example: "An updated description for the event."
 *                     date:
 *                       type: string
 *                       example: "2024-12-20T10:00:00Z"
 *                     location:
 *                       type: string
 *                       example: "San Francisco, CA"
 *       400:
 *         description: Validation failed. Invalid data provided.
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/event/{eventId}/delete:
 *   delete:
 *     tags: ['Event Management']
 *     summary: Delete an event
 *     description: Allows a user to delete an event by ID.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete.
 *         example: "abcde123-4567-890a-bcde-123456789abc"
 *     responses:
 *       200:
 *         description: Event deleted successfully.
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
 *                   example: "Event deleted successfully"
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     tags: ['Event Management']
 *     summary: Get all events
 *     description: Retrieves all events from the system.
 *     responses:
 *       200:
 *         description: A list of all events.
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
 *                   example: "Events retrieved successfully"
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Tech Conference 2024"
 *                       description:
 *                         type: string
 *                         example: "A conference for tech enthusiasts."
 *                       date:
 *                         type: string
 *                         example: "2024-12-15T09:00:00Z"
 *                       location:
 *                         type: string
 *                         example: "New York City, NY"
 *       500:
 *         description: Internal server error.
 */

const Joi = require("joi");
const { User, Event } = require("../../models");

const createEvent = async (userId, eventData) => {
  try {
    const eventSchema = Joi.object({
      userId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.guid": "Invalid userId format",
          "string.empty": "User ID cannot be empty",
        }),
      name: Joi.string().required().messages({
        "string.empty": "Event name cannot be empty",
      }),
      description: Joi.string().optional(),
      date: Joi.date().iso().required().messages({
        "date.base": "Event date must be a valid date",
        "string.empty": "Event date cannot be empty",
      }),
      location: Joi.string().required().messages({
        "string.empty": "Event location cannot be empty",
      }),
    });

    const { error, value } = eventSchema.validate(eventData);
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

    const event = await Event.create({
      name: value.name,
      description: value.description || null,
      date: value.date,
      location: value.location,
      organizer_id: userId,
    });

    return { status: 201, message: "Event created successfully", event };
  } catch (error) {
    console.error("Error in createEvent:", error);
    return { status: 500, message: "Internal server error", error };
  }
};

const updateEvent = async (eventId, eventData) => {
  try {
    const eventSchema = Joi.object({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      date: Joi.date().optional(),
      location: Joi.string().optional(),
    });

    const { error, value } = eventSchema.validate(eventData);

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

    await event.update(value);

    return {
      status: 200,
      message: "Event updated successfully",
      event,
    };
  } catch (error) {
    console.error("Error in updateEvent:", error);
    return { status: 500, message: "Internal server error", error };
  }
};
const deleteEvent = async (eventId) => {
  try {
    const event = await Event.findByPk(eventId);

    if (!event) {
      return { status: 404, message: "Event not found" };
    }

    await event.destroy();

    return {
      status: 200,
      message: "Event deleted successfully",
    };
  } catch (error) {
    console.error("Error in deleteEvent:", error);
    return { status: 500, message: "Internal server error", error };
  }
};
const getAllEvents = async () => {
  try {
    const events = await Event.findAll();

    if (events.length === 0) {
      return {
        status: 404,
        message: "No events found",
        events: [],
      };
    }

    return {
      status: 200,
      message: "Events retrieved successfully",
      events,
    };
  } catch (error) {
    console.error("Error in getAllEvents:", error);
    return { status: 500, message: "Internal server error", error };
  }
};

module.exports = { createEvent, updateEvent, deleteEvent, getAllEvents };
