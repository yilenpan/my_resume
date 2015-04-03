/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var Bio = require('./resume-bio.js');
var Projects = require('./resume-projects.js');
var Education = require('./resume-education.js');

var Resume = React.createClass({
  getInitialState: function() {
    return {data: [], loading: true};
  },
  loadResume: function(){
    console.log("fetching json");
    $.ajax({
      url: 'resume.json',//TODO: LINK TO BACKEND
      dataType: 'json',
      success: function(data) {
        console.log('got json');
        this.setState({data:data, loading:false});
      }.bind(this)
    })
  },
  componentDidMount: function() {
    var self = this;
    setTimeout(function(){
      console.log('did mount');
      self.loadResume();
    }, 1000);
  },
  render: function(){
    var inner;
    if (!this.state.loading){
      inner = (<div>
                <Bio data={this.state.data.bio} />
                <Projects data={this.state.data.projects} />
                <Education data={this.state.data.education} />
              </div>);
    } else {
      inner = <Loading />;
    }

    return (<div>
              {inner}
            </div>);
  }
});

module.exports = Resume;