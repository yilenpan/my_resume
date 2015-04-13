/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;
var Loading = require('./loading.js');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');
var AdminContact = require("../admin/admin-contact.js");

function getContact() {
  return AppStore.getContact();
}

var SideMenu = React.createClass({
  getInitialState: function(){
    return {contact: {}, loading:true, isAdmin: false};
  },
  componentWillMount: function(){
    this.loadContact();
  },
  loadContact: function(){
    console.log('loadContact sidemenu');
    $.ajax({
      url: 'contact.json',
      dataType: 'json',
      success: function(data) {
        console.log('completed ajax call in sidemenu' + data);
        AppActions.setContact(data);
        this.setState({contact: getContact(),loading:false});
        AppStore.checkAdmin(this.setAdmin)
      }.bind(this)
    });
  },
  setAdmin: function(isAdmin){
    this.setState(isAdmin);
  },
  render: function(){
    var inner;
    var self = this;
    var c = this.state.contact;
    var img = c.img;
    var name = c.name;
    var github = c.github;
    var email = c.email;
    var phone = c.phone;
    var twitter = c.twitter;
    var location = c.location;

    if (this.state.loading) {
      inner = (<div><Loading /></div>);
    }

    if (!this.state.loading && !this.state.isAdmin){
      inner = (<div>
                <a href="/"><img className="img-responsive" src={img} alt="profile pic"/></a>
                <h1> {name} </h1>
                <p>
                  <a href={github}>
                    <img className="icons" src="/images/github.png" />
                  </a>
                  <a href={email}>
                    <img className="icons" src="images/email.png" />
                  </a>
                   {phone}
                  <a href={twitter}>
                    <img className="icons" src="images/twitter.png" />
                  </a>
                   {location}
                </p>
              </div>);
    } else if (!this.state.loading && this.state.isAdmin) {
      inner = (<div>
                <AdminContact />
              </div>);
    }
    return inner;
  }
});

module.exports = SideMenu;