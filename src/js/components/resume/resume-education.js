/** @jsx React.DOM */

var React = require('react');
var Education = React.createClass({
  render: function(){
    var schools = this.props.data.schools.map(function(school){
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
    var onlineCourses = this.props.data.onlineCourses.map(function(course){
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

/*
{
                "title":"Front-End Nanodegree",
                "school":"Udacity",
                "location":"San Francisco, CA, USA",
                "date":"2015",
                "url":"www.udacity.com"
            }*/







