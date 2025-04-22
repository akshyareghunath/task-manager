function isOverdue(task) {
    return task.status !== 'completed' && new Date(task.dueDate) < new Date();
  }
  
  module.exports = { isOverdue };