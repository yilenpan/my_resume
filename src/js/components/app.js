/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var Splash = require('./splash/app-splash.js'),
    Blog = require('./blog/app-blog.js'),
    BlogPost = require('./blog/app-blogpost.js'),
    Resume = require('./resume/app-resume.js'),
    About = require('./about/app-about.js');

var Locations = Router.Locations;
var Location = Router.Location;

var APP = React.createClass({
  render: function() {
    return (
      <div>
          <Locations>
            <Location path="/" handler={Splash} />
            <Location path="/blog" handler={Blog} />
            <Location path="/blog/:post" handler={BlogPost} />
            <Location path="/resume" handler={Resume} />
            <Location path="/about" handler={About} />
          </Locations>
      </div>
      );
  }
});

module.exports = APP;