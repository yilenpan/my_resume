/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var BlogList = require("./bloglist.js");


var Blog = React.createClass({
  getInitialState: function() {
    return {data: [], loading: true};
  },
  loadBlog: function(){
    $.ajax({
      url: 'blog.json',//TODO: LINK TO BACKEND
      success: function(data) {
        this.setState({data:data, loading: false});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadBlog();
  },
  render: function() {
    var inner;
    if (!this.state.loading){
      inner = <BlogList data={this.state.data} />;
    } else {
      inner = <Loading />;
    }
    return (<div>
            {inner}
            </div>);
  }
});

module.exports = Blog;