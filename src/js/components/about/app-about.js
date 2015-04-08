/** @jsx React.DOM */

var React = require('react');
var Map = require('../maps/map.js');

var About = React.createClass({
  getInitialState: function(){
    return {data:[], points:[]}
  },
  loadAbout: function(){
    $.ajax({
      url: 'about.json',//TODO: LINK TO BACKEND
      success: function(data) {
        console.log(data.locations);
        this.setState({data:data, points:data.locations});
      }.bind(this)
    });
  },
  /*getPoints: function(locations){
    var result = [];
    locations.map(function(location){
      result.push({latitude:location.latitude,longitude: location.longitude, title: "point"});
    });
    console.log(result);
    return result;
  },*/
  componentDidMount: function() {
    this.loadAbout();
  },
  render: function(){
    return (<div>
              <h1>About</h1>
              <Map latitude={37.779277} longitude={-122.41927} zoom={2} width={600} height={400}
                points={this.state.points}/>
            </div>);
  }
});

module.exports = About;