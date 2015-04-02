/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');

var Blog = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  loadBlog: function(){
    $.ajax({
      url: 'blog.json',//TODO: LINK TO BACKEND
      success: function(data) {
        this.setState({data:data});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadBlog();
  },
  render: function() {
    return (<div>
            <h1>Blog</h1>
            <p>{this.state.data}</p>
            </div>);
  }
});

module.exports = Blog;