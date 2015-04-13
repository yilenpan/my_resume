var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var merge = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;


var CHANGE_EVENT = "change";

var currentBlog = [];
var currentResume = {};
var currentAbout = {};
var currentContact;
var bio, projects, education;

function _getBlog(data){
  console.log('added data to store');
  currentBlog = data;
  console.log(currentBlog);
}

function _addBlogPost(post){
  currentBlog.unshift(post);
  //ajax post to server with new post.
}

function _setContact(data) {
  console.log('_setContact set');
  currentContact = data;
  console.log(currentContact);
}

function _updateContact(data) {
  _setContact({contact: data});
  console.log('"sending" new contact to server');
  //make ajax post to the server
}

function _setResume(data) {
  bio = data.bio;
  projects = data.projects;
  education = data.education;
}

// end store functions

var AppStore = merge(EventEmitter.prototype, {
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  currentPage: function(page) {
    console.log('in appStore getting page: ' + page);
    cpage = (page-1) * 5;
    return currentBlog.slice(cpage, cpage + 5);
  },
  getPageNums: function(){
    return Math.ceil(currentBlog.length / 5);
  },
  checkAdmin: function(callback){
    console.log("in store, checking admin: "+document.cookie);//makes ajax call to see if admin
    var data = {isAdmin: true};
    callback(data);
  },
  getContact: function(){
    console.log("fetching contact from getContact");
    console.log(currentContact);
    return currentContact.contact;
  },
  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case 'getBlog':
        _getBlog(payload.action.data);
        break;

      case 'addAbout':
        _increaseItem(payload.action.data);
        break;

      case 'setResume':
        _setResume(payload.action.data);
        break;

      case 'addBlogPost':
        _addBlogPost(payload.action.data);
        break;

      case 'setContact':
        _setContact(payload.action.data);
        break;

      case 'updateContact':
        _updateContact(payload.action.data);
        break;
    }
    AppStore.emitChange();

    return true;
  })
});


module.exports = AppStore;















