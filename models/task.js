const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'overdue'],
      default: 'pending'
    },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
  }, { timestamps: true });
  module.exports = mongoose.model('Task', TaskSchema);