/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

var SubHeader = React.createClass({
  render: function(){
    return (
        <ul className="nav navbar-nav">
            <li><Link href="/blog"> blog </Link></li>
            <li><Link href="/resume"> resume </Link></li>
            <li><Link href="/about"> about </Link></li>
        </ul>
      );
  }
});

module.exports = SubHeader;