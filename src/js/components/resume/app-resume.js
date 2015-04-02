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
    })
  },
  componentWillMount: function() {
    console.log('will mount');
    setTimeout(this.loadResume(), 5000);
  },
  componentDidMount: function() {
    console.log('did mount');
    this.loadResume();
  },
  render: function(){
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