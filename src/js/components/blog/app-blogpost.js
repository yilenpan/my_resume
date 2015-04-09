/** @jsx React.DOM */

var React = require('react');
var Loading = require('../template/loading.js');

var BlogPost = React.createClass({
  getInitialState: function(){
    console.log(this.props.id);
    return {content:{}, url: this.props.id, loading: true};
  },
  getPost: function(){
    console.log(this.state.url);
    $.ajax({
      url: this.state.url,
      success: function(data) {
        this.setState({content: data, loading: false});
      }.bind(this)
    });
  },
  componentDidMount:function(){
    this.getPost();
  },
  render: function(){
    var d = this.state.content;
    var title = d.title;
    var content = d.content;
    var date = d.date;
    var inner;
    if (!this.state.loading){
      inner = (
              <div className="col-xs-11">
                <h1>{title}</h1>
                <h4>{date}</h4>
                <p>{content}</p>
              </div>
              );
    } else {
      inner = (<div className="col-xs-11"><Loading /></div>);
    }

    return inner;

  }
});

module.exports = BlogPost;