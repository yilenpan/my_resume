/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;
var AppStore = require('../../stores/app-store.js');

//need to check if registered

var Register = React.createClass({
  componentWillMount: function(){
    AppStore.checkAdmin(function(data){
      if (data.isAdmin){
        window.location.replace('/blog');
      }
    });
  },
  submit: function(e){
    e.preventDefault(); //need to verify data
    var password = React.findDOMNode(this.refs.password).value.trim(),
        cpassword = React.findDOMNode(this.refs.cPassword).value.trim();
    if(password == cpassword){
      var contact = $('#contact').serialize(),
          userinfo = $('#userinfo').serialize();
      var data = contact+"&"+userinfo;
      console.log(data);
      $.ajax('/register',{
        type: 'POST',
        data: data,
        success: function(data){
          if( data == 'success' ){
            window.location.replace('/blog');
          }
        },
        error: function(e){
          //if error, take message from error and append to something
          console.log(e);
        }
      });
    } else {
      console.log('passwords dont match');
    }
  },
  render: function(){
    return (
      <div className="col-xs-12">
          <span className="error"></span>
          <div className="col-xs-12">
            <h1>User Info</h1>
          </div>
          <div className="col-xs-12">
            <form id="userinfo" className="form-group">
              <div className="form-group">
                <label className="col-sm-2 control-label">First Name: </label>
                <div className="col-sm-10">
                  <input name="firstname" ref="firstname" className="form-control" type="text" placeholder="First name" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Last Name: </label>
                <div className="col-sm-10">
                  <input name="lastname" ref="lastname" className="form-control" type="text" placeholder="Last name" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Username: </label>
                <div className="col-sm-10">
                  <input name="username" ref="username" className="form-control" type="text" placeholder="Username" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Email: </label>
                <div className="col-sm-10">
                  <input name="email" ref="email" className="form-control" type="text" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Password: </label>
                <div className="col-sm-10">
                  <input name="password" ref="password" className="form-control" type="password" placeholder='Password' />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Confirm Password: </label>
                <div className="col-sm-10">
                  <input name="cPassword" ref="cPassword" className="form-control" type="password" placeholder='Confirm Password' />
                </div>
              </div>
            </form>
          </div>

          <div className="col-xs-12">
            <h2>Contact Information</h2>
          </div>
          <div className="col-xs-12">
            <form id="contact" className="form-group">
              <div className="form-group">
                <label className="col-sm-2 control-label">Link to Profile Pic: </label>
                <div className="col-sm-10">
                  <input name="img" ref="img" className="form-control" type="text" placeholder="Image URL" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Github: </label>
                <div className="col-sm-10">
                  <input name="github" ref="github" className="form-control" type="text" placeholder="Github" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Twitter: </label>
                <div className="col-sm-10">
                  <input name="twitter" ref="twitter" className="form-control" type="text" placeholder='Twitter' />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Phone: </label>
                <div className="col-sm-10">
                  <input name="phone" ref="phone" className="form-control" type="text" placeholder="Phone" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Location: </label>
                <div className="col-sm-10">
                  <input name="location" ref="location" className="form-control" type="text" placeholder="Location"/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-10 col-sm-offset-2">
                  <input onClick={this.submit} id="submit" name="submit" type="submit" className="btn btn-default" />
                </div>
              </div>
            </form>
         </div>
      </div>
      );
  }
});

module.exports = Register;