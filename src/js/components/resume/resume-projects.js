/** @jsx React.DOM */

var React = require('react');
var Projects = React.createClass({
  render: function(){
    var data = this.props.data.projects.map(function(project){
      return (
        <ul>
          <li><h2>{project.title}</h2></li>
          <li><h3>{project.datesWorked}</h3></li>
          <li><span>{project.description}</span></li>
          <li><img src={project.images} /></li>
        </ul>
        );
    });
    return <div className="col-xs-12">
            {data}
           </div>;
  }
});

module.exports = Projects;