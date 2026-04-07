import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { createTask, deleteTask, getProjectTasks, updateTask } from '../controllers/taskController.js'

const router = express.Router()

router.post("/", protect, createTask)
router.get("/:projectId", protect, getProjectTasks)
router.put("/:id", protect, updateTask)
router.delete("/:id", protect, deleteTask)

export default router