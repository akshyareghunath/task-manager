const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
const { isOverdue } = require('../utils/overdueChecker');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('dependencies');
    const enriched = tasks.map(task => ({
      ...task.toObject(),
      isOverdue: isOverdue(task)
    }));
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update task status (with dependency check)
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const task = await Task.findById(req.params.id).populate('dependencies');
    const depsCompleted = task.dependencies.every(dep => dep.status === 'completed');

    if (!depsCompleted && status === 'in_progress') {
      return res.status(400).json({ error: 'Dependencies are not completed' });
    }

    task.status = status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
