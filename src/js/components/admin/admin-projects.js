/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');

function getProjects() {
  return AppStore.getProjects();
}

var Projects = React.createClass({
  getInitialState: function(){
    return {data: getProjects()};
  },
  render: function(){
    var data = this.state.data.projects.map(function(project){
      return (
        <div className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={project.images} alt={project.title} />
            <div className="caption">
              <h4>{project.datesWorked}</h4>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        </div>
        );
    });
    return <div className="row">
            {data}
           </div>;
  }
});

module.exports = Projects;