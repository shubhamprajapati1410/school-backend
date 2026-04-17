const express =require('express');
const router = express.Router();
const {createEvent,getEvents,deleteEvent,updateEvent} = require('../controllers/event');
const authenticateJWT = require('../middleware/auth.middleware');

router.post("/", authenticateJWT, createEvent);
router.get("/", getEvents);
router.delete("/:id", authenticateJWT, deleteEvent);
router.put("/:id", authenticateJWT, updateEvent);


module.exports = router;    