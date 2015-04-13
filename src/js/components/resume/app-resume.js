/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');
var Loading = require('../template/loading.js');
var Bio = require('./resume-bio.js');
var Projects = require('./resume-projects.js');
var Education = require('./resume-education.js');
var Map = require('../maps/map.js');

//TODO: Send data from json to the store.
//have resume bio, education, projects call from the store
//check admin here, if Admin, call from <AdminResume /> folder
//in AdminResume allow for things to be added and edited.


var Resume = React.createClass({
  getInitialState: function() {
    return {isAdmin: false, loading: true, points:[]};
  },
  loadResume: function(){
    console.log("fetching json");
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
    if (!this.state.loading){
      inner = (<div className="container">
                <Bio />
                <h1> Projects </h1>
                <Projects />
                <h1> Education </h1>
                <Education />
                <h1> Where I worked </h1>
                <Map latitude={37.779277} longitude={-122.41927} zoom={12} width={600} height={400}
                points={this.state.points}/>
              </div>
              );
    } else {
      inner = <Loading />;
    }

    return inner;
  }
});

module.exports = Resume;