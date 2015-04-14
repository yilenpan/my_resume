/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');

function getBio() {
  return AppStore.getBio();
}

var Bio = React.createClass({
  getInitialState: function(){
    return {data: getBio()};
  },
  render: function(){
    console.log("Bio obj: " + this.state.data);
    var name = this.state.data.name;
    var title = this.state.data.role;
    var skills = this.state.data.skills.map(function(skill){
      return (<div className="col-xs-6 col-md-3">
              <a href={skill.img} className="thumbnail text-center">
                <img src={skill.img} alt={skill.language} />{skill.language}
              </a>
             </div>);
    });


    return (<div className="row">
            <h1>{name} not admin</h1>
            <h3>{title}</h3>
            <h2>Skills</h2>
            {skills}
            </div>);
  }
});

module.exports = Bio;