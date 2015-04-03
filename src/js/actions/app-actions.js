var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  getResume: function(resume) {
    AppDispatcher.handleViewAction({
      actionType:'getResume',
      data: resume
    })
  },
  getBlog: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'getBlog',
      data: data
    })
  },
  getBlogPost: function(id) {
    AppDispatcher.handleViewAction({
      actionType:'getBlogPost',
      id: id
    })
  },
  getAbout: function() {
    AppDispatcher.handleViewAction({
      actionType:'getAbout',
    })
  }
};

module.exports = AppActions;