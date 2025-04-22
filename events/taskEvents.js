const EventEmitter = require('events');
const emitter = new EventEmitter();
const { sendNotification } = require('../services/notificationService');
const { logEvent } = require('../services/auditLogService');

emitter.on('taskCreated', task => {
  sendNotification(`📌 Task created: ${task.title}`);
  logEvent('created', task);
});

emitter.on('statusChanged', task => {
  sendNotification(`🔁 Status changed: ${task.title} ➜ ${task.status}`);
  logEvent('statusChanged', task);
});

const emitTaskEvent = (eventName, data) => {
  emitter.emit(eventName, data);
};

module.exports = { emitTaskEvent };
