/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;
var Loading = require('./loading.js');


var SideMenu = React.createClass({
  getInitialState: function(){
    return {contact: {}, loading:false};
  },
  loadContact: function(){
    $.ajax({
      url: 'contact.json',
      dataType: 'json',
      success: function(data) {
        this.setState({contact: data.contact,loading:false});
      }.bind(this)
    });
  },
  componentDidMount: function(){
    //var self = this;
    //setTimeout(function(){
    this.loadContact();
      //}, 1000);
  },
  render: function(){
    var inner;
    var c = this.state.contact;
    var name = c.name;
    var github = c.github;
    var email = c.email;
    var phone = c.phone;
    var twitter = c.twitter;
    var location = c.location;

    if (!this.state.loading){
      inner = (<div className="col-xs-3">
                <h1> {name} </h1>
                <span> {github} </span>
                <span> {email} </span>
                <span> {phone} </span>
                <span> {twitter} </span>
                <span> {location} </span>
              </div>);
    } else {
      inner = (<div className="col-xs-3"><h1> LOADING </h1></div>);
    }
    return <div>{inner}</div>;
  }
});

module.exports = SideMenu;