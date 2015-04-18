/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');


function getProjects() {
  return AppStore.getProjects();
}

var Projects = React.createClass({
  getInitialState: function(){
    console.log('admin projects');
    return {data: getProjects(), addProject: false};
  },
  addProject: function(){
    this.setState({addProject: true});
  },
  pushProject: function(e){
    e.preventDefault();
    var title = React.findDOMNode(this.refs.projTitle).value.trim();
    var images = React.findDOMNode(this.refs.projURL).value.trim();
    var datesWorked = React.findDOMNode(this.refs.projDates).value.trim();
    var description = React.findDOMNode(this.refs.projDescription).value.trim();
    var proj = {title: title, images: images, datesWorked: datesWorked, description: description};
    this.state.data.projects.push(proj)
    AppActions.updateProj(proj);
    this.setState({addProject: false});

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
    var form = this.state.addProject ? (<form className="form-group" onSubmit={this.pushProject}>
                                          <div className="form-group">
                                            <label className="col-sm-2 control-label">Title: </label>
                                            <div className="col-sm-10">
                                              <input ref="projTitle" className="form-control" type="text" placeholder="Title"/>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <label className="col-sm-2 control-label">Image: </label>
                                            <div className="col-sm-10">
                                              <input ref="projURL" className="form-control" type="text" placeholder="Language"/>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <label className="col-sm-2 control-label">Dates: </label>
                                            <div className="col-sm-10">
                                              <input ref="projDates" className="form-control" type="text" placeholder="Language"/>
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <label className="col-sm-2 control-label">Image: </label>
                                            <div className="col-sm-10">
                                              <textarea ref="projDescription" className="form-control" rows="4" placeholder="Description" />
                                            </div>
                                          </div>
                                          <div className="form-group">
                                            <div className="col-sm-10 col-sm-offset-2">
                                              <input id="submit" name="submit" type="submit" className="btn btn-default" />
                                            </div>
                                          </div>
                                       </form>) : <br/>;
    return <div className="row">
            <h1>Projects <span onClick={this.addProject} className="glyphicon glyphicon-plus" aria-hidden="true"></span></h1>
            {form}
            {data}
           </div>;
  }
});


module.exports = Projects;