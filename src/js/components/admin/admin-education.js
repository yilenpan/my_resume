/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');

function getEducation() {
  return AppStore.getEducation();
}

var Education = React.createClass({
  getInitialState: function(){
    return {data: getEducation()};
  },
  render: function(){
    var schools = this.state.data.schools.map(function(school){
      var minor = school.minor != '' ? " with a minor in " + school.minor : '';
      return (
          <div>
            <h3>{school.name}</h3>
            <p>Location: {school.location}</p>
            <p>Studying: {school.major}{minor}</p>
            <p>Degree: {school.degree}</p>
            <p>Years: {school.years}</p>
          </div>
        );
    });
    var onlineCourses = this.state.data.onlineCourses.map(function(course){
      return(
        <div>
          <h3>{course.school}</h3>
          <p>Location: {course.location}</p>
          <p>Studying: {course.title}</p>
          <p>URL: {course.url}</p>
          <p>Years: {course.date}</p>
        </div>
        );
    });
    return (<div className="row">
              <h2> Schools </h2>
              <div className="col-xs-12">{schools}</div>
              <h2> Online Courses </h2>
              <div className="col-xs-12">{onlineCourses}</div>
            </div>);
  }
});

module.exports = Education;







