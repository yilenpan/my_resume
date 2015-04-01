/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;
var Resume = require('../../stores/app-resume.js');

var Splash = React.createClass({
  render: function(){
    return (
        <div>
            <h1>Splash</h1>
            <Link href="/blog"> blog </Link>
            <Link href="/blog/1"> blogpost </Link>
            <Link href="/resume"> resume </Link>
            <Link href="/about"> about </Link>
        </div>
      );
  }
});

module.exports = Splash;