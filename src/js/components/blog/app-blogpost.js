/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');

var BlogPost = React.createClass({
  getInitialState: function(){
    var id = this.props.id;
    return {content:AppStore.getBlogPost(id)};
  },
  render: function(){
    console.log('in component');
    console.log(this.state.content);
    return (<div>
              <h1>BlogPost</h1>
              <p>{this.state.content}</p>
            </div>);
  }
});

module.exports = BlogPost;