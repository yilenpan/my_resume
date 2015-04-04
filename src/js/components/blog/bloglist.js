/** @jsx React.DOM */

var React = require('react');
var Link = require('react-router-component').Link;

var BlogList = React.createClass({
  render: function(){
    var posts = this.props.data.map(function(data, i){
      var title = data.title;
      var date = data.date;
      var summary = data.summary;
// TODO: Make sure each post has a corresponding id
      return (
        <div>
          <h1><Link href={"/blog/"+ i }>{title}</Link></h1>
          <h3>{date}</h3>
          <p>{summary}</p>
        </div>
        );

    });
    return <div>{posts}</div>;
  }
});

module.exports = BlogList;