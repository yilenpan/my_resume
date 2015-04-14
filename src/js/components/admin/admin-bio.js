/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');


function getBio() {
  return AppStore.getBio();
}

var Bio = React.createClass({
  getInitialState: function(){
    return {data: getBio(), editName: false, editTitle: false, addSkills: false};
  },
  changeName: function(){
    this.setState({editName:true});
  },
  changeTitle: function(){
    this.setState({editTitle:true});
  },
  updateName: function(e){
    //TODO: send to store
    e.preventDefault();
    var r = this.state.data;
    var name = React.findDOMNode(this.refs.bio_name).value.trim();
    r.name = name;
    AppActions.updateBio(r);
    this.setState({editName:false});
  },
  updateTitle: function(e){
    //TODO: send to store
    e.preventDefault();
    var r = this.state.data;
    var title = React.findDOMNode(this.refs.bio_title).value.trim();
    r.role = title;
    AppActions.updateBio(r);
    this.setState({editTitle:false});
  },
  addSkill: function(){
    this.setState({addSkills: true});
  },
  pushSkill: function(e){
    e.preventDefault();
    var img = React.findDOMNode(this.refs.skillImg).value.trim() ? React.findDOMNode(this.refs.skillImg).value: 'error';
    var lang = React.findDOMNode(this.refs.skillLang).value.trim() ? React.findDOMNode(this.refs.skillLang).value : 'error';
    this.state.data.skills.push({img: img, language: lang});
    AppActions.updateBio(this.state.data);
    this.setState({addSkills: false});
  },
  render: function(){
    console.log("render admin Bio");
    var name = this.state.editName ? (<form className="form-group" onSubmit={this.updateName}>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">Name: </label>
                                            <div className="col-sm-10">
                                              <input type="text" className="form-control" ref='bio_name' placeholder={this.state.data.name}/>
                                            </div>
                                        </div>
                                     </form>) : (<h1 ref="bio_name" onClick={this.changeName}> {this.state.data.name} </h1>);


    var title = this.state.editTitle ? (<form className="form-group" onSubmit={this.updateTitle}>
                                          <div className="form-group">
                                              <label className="col-sm-2 control-label">Title: </label>
                                              <div className="col-sm-10">
                                                <input type="text" className="form-control" ref='bio_title' placeholder={this.state.data.role}/>
                                              </div>
                                          </div>
                                       </form>) : (<h3 ref='bio_title' onClick={this.changeTitle}>{this.state.data.role}</h3>);

    var skills = this.state.data.skills.map(function(skill){
      return (<div className="col-xs-6 col-md-3">
              <a ref="skillImg" href={skill.img} className="thumbnail text-center">
                <img ref="skillLang" src={skill.img} alt={skill.language} />{skill.language}
              </a>
             </div>);
    });

    var addSkill = this.state.addSkills ? (<form className="form-group">
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Image: </label>
                                              <div className="col-sm-10">
                                                <input ref="skillImg" className="form-control" type="text" placeholder="URL"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <label className="col-sm-2 control-label">Language: </label>
                                              <div className="col-sm-10">
                                                <input ref="skillLang" className="form-control" type="text" placeholder="Language"/>
                                              </div>
                                            </div>
                                            <div className="form-group">
                                              <div className="col-sm-10 col-sm-offset-2">
                                                <input onClick={this.pushSkill} id="submit" name="submit" type="submit" className="btn btn-default" />
                                              </div>
                                            </div>
                                         </form>):<br />;


    return (<div className="row">
            {name}
            {title}
            <h2>Skills <span onClick={this.addSkill} className="glyphicon glyphicon-plus" aria-hidden="true"></span></h2>
            {addSkill}
            {skills}
            </div>);
  }
});

module.exports = Bio;