/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var BlogList = require("./bloglist.js");


var Blog = React.createClass({
  getInitialState: function() {
    return {data: [], loading: true};
  },
  loadBlog: function(){ //TODO: CREATE MIXIN.
    $.ajax({
      url: 'blog.json',//TODO: LINK TO BACKEND
      success: function(data) {
        this.setState({data:data, loading: false});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    var self = this;
    setTimeout(function(){
      console.log('did mount');
      self.loadBlog();
    }, 1000);
  },
  render: function() {
    var inner;
    if (!this.state.loading){
      inner = <BlogList data={this.state.data.blog} />;
    } else {
      inner = <Loading />;
    }
    return (<div>
            {inner}
            </div>);
  }
});

module.exports = Blog;