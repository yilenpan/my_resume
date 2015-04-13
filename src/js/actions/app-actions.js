var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  setResume: function(resume) {
    AppDispatcher.handleViewAction({
      actionType:'setResume',
      data: resume
    })
  },
  getBlog: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'getBlog',
      data: data
    })
  },
  setContact: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'setContact',
      data: data
    })
  },
  addBlogPost: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'addBlogPost',
      data: data
    })
  },
  addAbout: function(data) {
    AppDispatcher.handleViewAction({
      actionType:'getAbout',
      data: data
    })
  },
  updateContact: function(data) {
    AppDispatcher.handleViewAction({
      actionType:"updateContact",
      data: data
    })
  }
};

module.exports = AppActions;