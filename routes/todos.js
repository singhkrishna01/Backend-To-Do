const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
  addNote
} = require('../controllers/todoController');

// Protect all todo routes
router.use(protect);

router.route('/').get(getTodos).post(createTodo);
router.get('/stats', getTodoStats);
router.route('/:id').get(getTodo).put(updateTodo).delete(deleteTodo);
router.post('/:id/notes', addNote);

module.exports = router;