const Todo = require('../models/Todo');
const User = require('../models/User');

const getTodos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sortOptions = { [sortBy]: sortOrder };

    const filter = { userId: req.user._id };

    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === 'true';
    }

    if (req.query.tag) {
      filter.tags = req.query.tag;
    }

    if (req.query.mention) {
      const user = await User.findOne({ username: req.query.mention });
      if (user) {
        filter.mentions = user._id;
      } else {
        return res.status(200).json({
          success: true,
          data: [],
          pagination: {
            currentPage: page,
            totalPages: 0,
            totalItems: 0,
            itemsPerPage: limit,
            hasNextPage: false,
            hasPrevPage: false
          }
        });
      }
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const todos = await Todo.find(filter)
      .populate('userId', 'name email')
      .populate('mentions', 'name email')
      .populate('notes.createdBy', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Todo.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: todos,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('mentions', 'name email')
      .populate('notes.createdBy', 'name email');

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description, priority, tags, mentions } = req.body;

    let mentionIds = [];
    if (mentions && mentions.length > 0) {
      const users = await User.find({ username: { $in: mentions } });
      mentionIds = users.map(user => user._id);
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      tags: tags || [],
      mentions: mentionIds,
      userId: req.user._id
    });

    const populatedTodo = await Todo.findById(todo._id)
      .populate('userId', 'name email')
      .populate('mentions', 'name email');

    res.status(201).json({
      success: true,
      data: populatedTodo,
      message: 'Todo created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { mentions } = req.body;
    const allowedFields = ['title', 'description', 'priority', 'tags', 'mentions', 'completed'];
    const updateData = {};

    // Build update object with only allowed fields
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Handle mentions - convert usernames to user IDs
    if (mentions !== undefined) {
      if (mentions && mentions.length > 0) {
        // Find users by username
        const users = await User.find({ username: { $in: mentions } });
        updateData.mentions = users.map(user => user._id);
        
        // Optional: Warn if some usernames weren't found
        if (users.length !== mentions.length) {
          console.warn('Some mentioned users were not found');
        }
      } else {
        // If mentions array is empty, clear all mentions
        updateData.mentions = [];
      }
    }

    // Find and update the todo (with ownership check)
    const todo = await Todo.findOneAndUpdate(
      { 
        _id: req.params.id,
        userId: req.user._id  // Ensure user owns this todo
      },
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    )
      .populate('userId', 'name email username')
      .populate('mentions', 'name email username')
      .populate('notes.createdBy', 'name email username');

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or you do not have permission to update it'
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
      message: 'Todo updated successfully'
    });
  } catch (error) {
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message)
      });
    }

    // Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid todo ID format'
      });
    }

    res.status(400).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
};

const addNote = async (req, res) => {
  try {
    const { content } = req.body;
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    todo.notes.push({
      content,
      createdBy: req.user._id
    });

    await todo.save();

    const updatedTodo = await Todo.findById(todo._id)
      .populate('userId', 'name email')
      .populate('mentions', 'name email')
      .populate('notes.createdBy', 'name email');

    res.status(200).json({
      success: true,
      data: updatedTodo,
      message: 'Note added successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error adding note',
      error: error.message
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
};

const getTodoStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const stats = await Todo.aggregate([
      {
        $match: {
          userId: userId
        }
      },
      {
        $group: {
          _id: null,
          totalTodos: { $sum: 1 },
          completedTodos: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          },
          highPriority: {
            $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] }
          },
          mediumPriority: {
            $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] }
          },
          lowPriority: {
            $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      totalTodos: 0,
      completedTodos: 0,
      highPriority: 0,
      mediumPriority: 0,
      lowPriority: 0
    };

    res.status(200).json({
      success: true,
      data: {
        ...result,
        pendingTodos: result.totalTodos - result.completedTodos,
        completionRate:
          result.totalTodos > 0
            ? ((result.completedTodos / result.totalTodos) * 100).toFixed(2)
            : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching todo statistics',
      error: error.message
    });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoStats,
  addNote
};
