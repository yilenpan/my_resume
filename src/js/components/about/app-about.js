/** @jsx React.DOM */

var React = require('react');
var About = React.createClass({
  getInitialState: function(){
    return {data:[]}
  },
  loadAbout: function(){
    $.ajax({
      url: 'about.json',//TODO: LINK TO BACKEND
      success: function(data) {
        this.setState({data:data});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadAbout();
  },
  render: function(){
    return (<div>
              <h1>About</h1>
              <p>{this.state.data}</p>
            </div>);
  }
});

module.exports = About;