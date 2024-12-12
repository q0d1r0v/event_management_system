const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const {
  createComment,
  getCommentsByEvent,
} = require("../services/comment.service");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
} = require("../services/event.service");
const {
  createRegister,
  getRegisters,
} = require("../services/register.service");
const {
  registerUser,
  loginUser,
  updateUser,
  updateProfile,
  createProfile,
  getProfile,
} = require("../services/user.service");

router.use("/api/v1/", authMiddleware);

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.put("/api/v1/update/user/:id", updateUser);
router.post("/api/v1/profile/create", async (req, res) => {
  const { userId } = req.body;
  const profileData = req.body;
  const response = await createProfile(userId, profileData);
  return res.status(response.status).json(response);
});
router.put("/api/v1/profile/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const profileData = req.body;
  const response = await updateProfile(userId, profileData);
  return res.status(response.status).json(response);
});
router.get("/api/v1/profile/:userId", async (req, res) => {
  const { userId } = req.params;
  const response = await getProfile(userId);
  return res.status(response.status).json(response);
});

router.post("/api/v1/event/create", async (req, res) => {
  try {
    if (req.user.role === "organizer" || req.user.role === "admin") {
      const { userId } = req.body;
      const eventData = req.body;

      const response = await createEvent(userId, eventData);

      return res.status(response.status).json(response);
    } else {
      res.status(403).json({
        status: 403,
        message: "You do not have permission to access this resource.",
      });
    }
  } catch (error) {
    console.error("Error in /event/create route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});
router.put("/api/v1/event/update/:id", async (req, res) => {
  try {
    if (req.user.role === "organizer" || req.user.role === "admin") {
      const { id } = req.params;
      const eventData = req.body;

      const response = await updateEvent(id, eventData);

      return res.status(response.status).json(response);
    } else {
      res.status(403).json({
        status: 403,
        message: "You do not have permission to access this resource.",
      });
    }
  } catch (error) {
    console.error("Error in /event/update route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});
router.delete("/api/v1/event/delete/:id", async (req, res) => {
  try {
    if (req.user.role === "organizer" || req.user.role === "admin") {
      const { id } = req.params;

      const response = await deleteEvent(id);

      return res.status(response.status).json(response);
    } else {
      res.status(403).json({
        status: 403,
        message: "You do not have permission to access this resource.",
      });
    }
  } catch (error) {
    console.error("Error in /event/delete route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});
router.get("/api/v1/events", async (req, res) => {
  try {
    const response = await getAllEvents();

    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in /events route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/api/v1/register/create", async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    const response = await createRegister(eventId, userId);

    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in /register/create route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});
router.get("/api/v1/registers", async (_, res) => {
  try {
    const response = await getRegisters();
    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in /registers route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/api/v1/comment/create", async (req, res) => {
  try {
    const { userId, eventId, content } = req.body;
    const commentData = { content };
    console.log(req.body);
    const response = await createComment(userId, eventId, commentData);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in /comment/create route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});
router.get("/api/v1/event/:eventId/comments", async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await getCommentsByEvent(eventId);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error("Error in /event/:eventId/comments route:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = {
  router,
};
