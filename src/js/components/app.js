/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var Splash = require('./splash/app-splash.js'),
    Blog = require('./blog/app-blog.js'),
    BlogPost = require('./blog/app-blogpost.js'),
    Resume = require('./resume/app-resume.js'),
    Register = require('./user/app-register.js'),
    Login = require('./user/app-login.js'),
    Header = require('./template/header.js'),
    SideMenu = require('./template/sidemenu.js'),
    About = require('./about/app-about.js');

var Locations = Router.Locations;
var Location = Router.Location;
var SubHeader = require('./template/subheader.js');


var APP = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className='row'>
          <div className="sidemenu col-xs-3">
            <SideMenu />
          </div>
          <div className="col-xs-9 content">
            <SubHeader />
            <Locations className="row">
              <Location path="/" handler={Splash} />
              <Location path="/register" handler={Register} />
              <Location path="/login" handler={Login} />
              <Location path="/blog" handler={Blog} />
              <Location path="/blog/:id" handler={BlogPost} />
              <Location path="/resume" handler={Resume} />
              <Location path="/about" handler={About} />
            </Locations>
          </div>
        </div>
      </div>
      );
  }
});

module.exports = APP;