/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var Bio = require('./resume-bio.js');
var Projects = require('./resume-projects.js');
var Education = require('./resume-education.js');
var Map = require('../maps/map.js');

var Resume = React.createClass({
  getInitialState: function() {
    return {data: [], loading: true, points:[]};
  },
  loadResume: function(){
    console.log("fetching json");
    $.ajax({
      url: 'resume.json',
      dataType: 'json',
      success: function(data) {
        this.setState({data:data, loading:false, points:this.getPoints()});
      }.bind(this)
    })
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
                <Bio data={this.state.data.bio} />
                <h1> Projects </h1>
                <Projects data={this.state.data.projects} />
                <h1> Education </h1>
                <Education data={this.state.data.education} />
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