/**
 * @swagger
 * /api/v1/comment/create:
 *   post:
 *     tags: ['Comment Management']
 *     summary: Create a comment for an event
 *     description: Allows a user to create a comment for a specific event.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who is creating the comment.
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               eventId:
 *                 type: string
 *                 description: The ID of the event the comment is related to.
 *                 example: "abcde123-4567-890a-bcde-123456789abc"
 *               content:
 *                 type: string
 *                 description: The content of the comment.
 *                 example: "Great event, looking forward to it!"
 *     responses:
 *       201:
 *         description: Comment created successfully.
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
 *                   example: "Comment created successfully"
 *                 comment:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     content:
 *                       type: string
 *                       example: "Great event, looking forward to it!"
 *                     user_id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     event_id:
 *                       type: string
 *                       example: "abcde123-4567-890a-bcde-123456789abc"
 *       400:
 *         description: Validation failed. User or event not found.
 *       404:
 *         description: User or event not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/v1/event/{eventId}/comments:
 *   get:
 *     tags: ['Comment Management']
 *     summary: Get all comments for an event
 *     description: Retrieves all comments associated with a specific event.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to retrieve comments for.
 *         example: "abcde123-4567-890a-bcde-123456789abc"
 *     responses:
 *       200:
 *         description: A list of comments for the event.
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
 *                   example: "Comments fetched successfully"
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       content:
 *                         type: string
 *                         example: "Great event, looking forward to it!"
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           username:
 *                             type: string
 *                             example: "john_doe"
 *       404:
 *         description: Event not found.
 *       500:
 *         description: Internal server error.
 */

// services/comment.service.js
const Joi = require("joi");
const { User, Event, Comment } = require("../../models");

const createComment = async (userId, eventId, commentData) => {
  try {
    const commentSchema = Joi.object({
      userId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.guid": "Invalid userId format",
          "string.empty": "User ID cannot be empty",
        }),
      eventId: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
          "string.guid": "Invalid eventId format",
          "string.empty": "Event ID cannot be empty",
        }),
      content: Joi.string().required().messages({
        "string.empty": "Content cannot be empty",
      }),
    });

    const { error, value } = commentSchema.validate({
      userId: userId,
      eventId: eventId,
      content: commentData.content,
    });
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

    const event = await Event.findByPk(eventId);
    if (!event) {
      return { status: 404, message: "Event not found" };
    }

    const comment = await Comment.create({
      event_id: eventId,
      user_id: userId,
      content: value.content,
    });

    return { status: 201, message: "Comment created successfully", comment };
  } catch (error) {
    console.error("Error in createComment:", error);
    return { status: 500, message: "Internal server error", error };
  }
};
const getCommentsByEvent = async (eventId) => {
  try {
    const event = await Event.findByPk(eventId);
    if (!event) {
      return { status: 404, message: "Event not found" };
    }

    const comments = await Comment.findAll({
      where: { event_id: eventId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    return { status: 200, message: "Comments fetched successfully", comments };
  } catch (error) {
    console.error("Error in getCommentsByEvent:", error);
    return { status: 500, message: "Internal server error", error };
  }
};

module.exports = { createComment, getCommentsByEvent };
