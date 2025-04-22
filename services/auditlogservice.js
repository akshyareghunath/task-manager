function logEvent(type, task) {
    console.log(`[Audit Log] ${type.toUpperCase()} | Task ID: ${task._id} | Title: ${task.title}`);
  }
  
  module.exports = { logEvent };
  