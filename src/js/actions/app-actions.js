var AppDispatcher = require('../dispatchers/app-dispatcher.js');

var AppActions = {
  getResume: function() {
    AppDispatcher.handleViewAction({
      actionType:'getResume',
    })
  },
  getBlogList: function() {
    AppDispatcher.handleViewAction({
      actionType:'getBlog',
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