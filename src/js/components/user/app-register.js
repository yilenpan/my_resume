/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

//need to check if registered

var Register = React.createClass({
  submit: function(e){
    e.preventDefault();
    var contact = $('#contact').serialize(),
        userinfo = $('#userinfo').serialize();
    var data = contact+userinfo;
    console.log(data);
    $.ajax('/register',{
      type: 'POST',
      data: data,
      success: function(data){
        console.log(data);
      },
      error: function(e){
        console.log(e);
      }
    });
  },
  render: function(){
    return (
      <div className="col-xs-12">
          <div className="col-xs-12">
            <h1>User Info</h1>
          </div>
          <div className="col-xs-12">
            <form id="userinfo" className="form-group">
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
                <label className="col-sm-2 control-label">Github: </label>
                <div className="col-sm-10">
                  <input name="github" ref="github" className="form-control" type="text" placeholder="Github" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Email: </label>
                <div className="col-sm-10">
                  <input name="email" ref="email" className="form-control" type="text" placeholder="Email"/>
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