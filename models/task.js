const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  dueDate: { type: Date, required: true },
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
}, { timestamps: true });

const redisClient = require('../services/cacheService');

router.get('/', async (req, res) => {
  try {
    const cached = await redisClient.get('all_tasks');
    if (cached) return res.json(JSON.parse(cached));

    const tasks = await Task.find().populate('dependencies');
    const enriched = tasks.map(task => ({
      ...task.toObject(),
      isOverdue: isOverdue(task)
    }));

    await redisClient.set('all_tasks', JSON.stringify(enriched), { EX: 60 }); // 60 sec TTL
    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = mongoose.model('Task', TaskSchema);
