var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  addResume: function(resume) {
    AppDispatcher.handleViewAction({
      actionType:'getResume',
      data: resume
    })
  },
  addBlog: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'addBlog',
      data: data
    })
  },
  addAbout: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'getAbout',
      data: data
    })
  }
};

module.exports = AppActions;