/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

var Splash = React.createClass({
  record: function(){
    console.log('recorded');
  },
  render: function(){
    return (
        <div className="jumbotron">
            <h1>Splash</h1>
            <Link href="/blog" onClick={this.record}> blog </Link>
            <Link href="/blog/1"> blogpost </Link>
            <Link href="/resume"> resume </Link>
            <Link href="/about"> about </Link>
        </div>
      );
  }
});

module.exports = Splash;