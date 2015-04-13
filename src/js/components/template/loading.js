/** @jsx React.DOM */

var React = require('react');

var Loading = React.createClass({
  render: function(){
    console.log('loading');
    return (
      <h1> Loading </h1>
      );
  }
});

module.exports = Loading;