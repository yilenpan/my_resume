/** @jsx React.DOM */

var React = require('react');
var Map = require('../maps/map.js');

var About = React.createClass({
  getInitialState: function(){
    return {data:[], points:[]}
  },
  loadAbout: function(){
    $.ajax({
      url: 'about.json',
      success: function(data) {
        console.log(data.locations);
        this.setState({data:data, points:data.locations});
      }.bind(this)
    });
  },
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