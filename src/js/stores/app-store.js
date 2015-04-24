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
  currentBlog = data;
}

function _addBlogPost(post){
  currentBlog.unshift(post);
  //ajax post to server with new post.
}

function _setContact(data) {
  currentContact = data;
}

function _updateContact(data) {
  //console.log(JSON.stringify(data));
  $.ajax('/contact.json', {
    type: 'post',
    data: {'contact': JSON.stringify(data)},
    success: function(data){
      console.log('success');
      console.log(data);
      _setContact(data);
    },
    error: function(e){
      console.log(e);
    }
  });
}

function _setResume(data) {
  bio = data.bio;
  projects = data.projects;
  education = data.education;
}

function _updateBio(data) {
  bio = data;
  console.log('updated bio');
  //make ajax post to the server
}

function _updateProj(data) {
  projects = data;
  console.log('updated projects');
  //make ajax post to the server
}

function _updateEdu(data) {
  education = data;
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
    cpage = (page-1) * 5;
    return currentBlog.slice(cpage, cpage + 5);
  },
  getPageNums: function(){
    return Math.ceil(currentBlog.length / 5);
  },
  checkAdmin: function(callback){
    console.log("in store, checking admin: "+document.cookie);//makes ajax call to see if admin
    var cookie = document.cookie;
    $.ajax("/admin", {
      type: 'post',
      dataType: 'json',
      data: {'cookie': cookie},
      success: function(data){
        console.log(data);
        callback(data);
      }
    });
  },
  getBio: function() {
    console.log("getBio");
    return bio;
  },
  getProjects: function(){
    console.log('getProjects');
    return projects;
  },
  getEducation: function(){
    console.log('getEducation');
    return education;
  },
  getContact: function(){
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

      case 'updateBio':
        _updateBio(payload.action.data);
        break;

      case 'updateProj':
        _updateProj(payload.action.data);
        break;

      case 'updateEdu':
        _updateEdu(payload.action.data);
        break;
    }
    AppStore.emitChange();

    return true;
  })
});


module.exports = AppStore;















