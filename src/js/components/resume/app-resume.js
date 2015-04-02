/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var Bio = require('./resume-bio.js');
var Projects = require('./resume-projects.js');

var Resume = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  loadResume: function(){
    $.ajax({
      url: 'resume.json',//TODO: LINK TO BACKEND
      dataType: 'json',
      success: function(data) {
        this.setState({data:data});
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadResume();
  },
  render: function(){
    //TODO: Make new componets for each section of the resume.
    var bio = this.state.data.bio ? <Bio data={this.state.data.bio} /> : <Loading />;
    var projects = this.state.data.projects ? <Projects data={this.state.data.projects} /> : <Loading />;
    return (<div>
              <h1>Resume</h1>
              <div> {bio} </div>
              <div> {projects} </div>
            </div>);
  }
});

module.exports = Resume;