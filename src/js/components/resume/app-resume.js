/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');
var Loading = require('../template/loading.js');
var Bio = require('./resume-bio.js');
var Projects = require('./resume-projects.js');
var Education = require('./resume-education.js');
var Map = require('../maps/map.js');
var AdminBio = require("../admin/admin-bio.js");
var AdminProjects = require("../admin/admin-projects.js");
var AdminEducation = require("../admin/admin-education.js");



//TODO: in AdminResume allow for things to be added and edited.
//after change in data, emit change, rerender

var Resume = React.createClass({
  getInitialState: function() {
    return {isAdmin: false, loading: true, points:[]};
  },
  loadResume: function(){
    console.log("fetching resume json");
    $.ajax({
      url: 'resume.json',
      dataType: 'json',
      success: function(data) {
        AppActions.setResume(data);
        this.setState({loading:false, points:this.getPoints()});
        AppStore.checkAdmin(this.setAdmin);
      }.bind(this)
    })
  },
  setAdmin: function(isAdmin){
    this.setState(isAdmin);
  },
  getPoints: function() {
    return [{latitude:37.779277,longitude:-122.41927,title:"sexy"}];
  },
  componentDidMount: function() {
    this.loadResume();
  },
  render: function(){
    console.log('render resume');
    var inner;
    if (!this.state.loading && !this.state.isAdmin){
      inner = (<div className="container">
                <Bio />
                <h1> Projects </h1>
                <Projects />
                <h1> Education </h1>
                <Education />
                <h1> Where I worked </h1>
                <Map latitude={37.779277} longitude={-122.41927} zoom={12} width={600} height={400}/>
              </div>
              );
    } else if (!this.state.loading && this.state.isAdmin) {
      inner = (<div className="container">
                <AdminBio />
                <h1> Projects </h1>
                <AdminProjects />
                <h1> Education </h1>
                <AdminEducation />
                <h1> Where I worked </h1>
                <Map latitude={37.779277} longitude={-122.41927} zoom={12} width={600} height={400}/>
              </div>
              );
    } else {
      inner = <Loading />;
    }

    return inner;
  }
});

module.exports = Resume;