/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');


function getEducation() {
  return AppStore.getEducation();
}

var Education = React.createClass({
  getInitialState: function(){
    return {data: getEducation(), showSchool: false, showOC: false};
  },
  showSchool: function(){
    var tof = !this.state.showSchool;
    this.setState({showSchool: tof});
  },
  showOC: function(){
    var tof = !this.state.showOC;
    this.setState({showOC: tof});
  },
  addSchool: function(e){
    //TODO: get data

    e.preventDefault();
    var newSchool = {};
    newSchool.name = React.findDOMNode(this.refs.schoolName).value.trim();
    newSchool.location = React.findDOMNode(this.refs.schoolLocation).value.trim();
    newSchool.major = React.findDOMNode(this.refs.schoolMajor).value.trim();
    newSchool.minor = React.findDOMNode(this.refs.schoolMinor).value.trim();
    newSchool.degree = React.findDOMNode(this.refs.schoolDegree).value.trim();
    newSchool.years = React.findDOMNode(this.refs.schoolDates).value.trim();
    console.log("newSchool obj:");
    console.log(newSchool);

    this.state.data.schools.push(newSchool);
    this.setState({showSchool: false});
  },
  addOC: function(e){
    e.preventDefault();
    var newOC = {};
    newOC.school = React.findDOMNode(this.refs.ocName).value.trim();
    newOC.location = React.findDOMNode(this.refs.ocLocation).value.trim();
    newOC.url = React.findDOMNode(this.refs.ocURL).value.trim();
    newOC.title = React.findDOMNode(this.refs.ocStudying).value.trim();
    newOC.date = React.findDOMNode(this.refs.ocDates).value.trim();
    console.log('newOC obj:');
    console.log(newOC);
    this.state.data.onlineCourses.push(newOC);
    this.setState({showOC: false});
  },
  render: function(){
    var schoolForm = this.state.showSchool ? (<form className="form-group">
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">School: </label>
                                              <div className="col-sm-10">
                                                <input ref="schoolName" className="form-control" type="text" placeholder="School"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Location: </label>
                                              <div className="col-sm-10">
                                                <input ref="schoolLocation" className="form-control" type="text" placeholder="Location"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Major: </label>
                                              <div className="col-sm-10">
                                                <input ref="schoolMajor" className="form-control" type="text" placeholder="Major"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Minor: </label>
                                              <div className="col-sm-10">
                                                <input ref="schoolMinor" className="form-control" type="text" placeholder="Minor"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Degree: </label>
                                              <div className="col-sm-10">
                                                <input ref="schoolDegree" className="form-control" type="text" placeholder="Degree"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Dates: </label>
                                              <div className="col-sm-10">
                                                <input ref="schoolDates" className="form-control" type="text" placeholder="Dates"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="col-sm-10 col-sm-offset-2">
                                                <input onClick={this.addSchool} id="submit" name="submit" type="submit" className="btn btn-default" />
                                              </div>
                                            </div>
                                         </form>) : <br />;


    var ocForm = this.state.showOC ? (<form className="form-group">
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">School: </label>
                                              <div className="col-sm-10">
                                                <input ref="ocName" className="form-control" type="text" placeholder="URL"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Location: </label>
                                              <div className="col-sm-10">
                                                <input ref="ocLocation" className="form-control" type="text" placeholder="Language"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Studying: </label>
                                              <div className="col-sm-10">
                                                <input ref="ocStudying" className="form-control" type="text" placeholder="Language"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">URL: </label>
                                              <div className="col-sm-10">
                                                <input ref="ocURL" className="form-control" type="text" placeholder="Language"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Dates: </label>
                                              <div className="col-sm-10">
                                                <input ref="ocDates" className="form-control" type="text" placeholder="Language"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="col-sm-10 col-sm-offset-2">
                                                <input onClick={this.addOC} id="submit" name="submit" type="submit" className="btn btn-default" />
                                              </div>
                                            </div>
                                         </form>) : <br />;
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
              <h2> Schools <span onClick={this.showSchool} className="glyphicon glyphicon-plus" aria-hidden="true"></span></h2>
              {schoolForm}
              <div className="col-xs-12">{schools}</div>
              <h2> Online Courses <span onClick={this.showOC} className="glyphicon glyphicon-plus" aria-hidden="true"></span></h2>
              {ocForm}
              <div className="col-xs-12">{onlineCourses}</div>
            </div>);
  }
});

module.exports = Education;







