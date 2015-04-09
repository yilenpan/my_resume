/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

var SubHeader = React.createClass({
  render: function(){
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li><Link href="/blog"> blog </Link></li>
              <li><Link href="/resume"> resume </Link></li>
              <li><Link href="/about"> about </Link></li>
            </ul>
          </div>
        </nav>
      );
  }
});

module.exports = SubHeader;