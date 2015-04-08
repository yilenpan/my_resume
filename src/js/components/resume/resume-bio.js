/** @jsx React.DOM */
var React = require('react');


var Bio = React.createClass({
  render: function(){
    var name = this.props.data.name;
    var title = this.props.data.role;
    var skills = this.props.data.skills.map(function(skill){
      return (<div className="col-xs-6 col-md-3">
              <a href={skill.img} className="thumbnail text-center">
                <img src={skill.img} alt={skill.language} />{skill.language}
              </a>
             </div>);
    });


    return (<div className="col-xs-12">
            <h1>{name}</h1>
            <h3>{title}</h3>
            <h2>Skills</h2>
            {skills}
            </div>);
  }
});

module.exports = Bio;