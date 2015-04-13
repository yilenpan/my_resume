/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');

function getContact() {
  return AppStore.getContact();
}

var AdminContact = React.createClass({
  getInitialState: function(){
    console.log("admincontact initial state");
    return {contact: {}, loading:true, isAdmin: false, editImg: false, editName: false};
  },
  componentWillMount: function(){
    this.loadContact();
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
    clearInterval(AppStore.checkAdmin(this.setAdmin));
  },
  _onChange: function(){
    this.loadContact();
  },
  loadContact: function(){
    var c = getContact();
    this.setState({contact: c,
                  loading:false});
  },
  setAdmin: function(isAdmin){
    this.setState(isAdmin);
  },
  componentDidMount: function(){
    setInterval(AppStore.checkAdmin(this.setAdmin), 5000);
  },
  editImg: function(){
    this.setState({editImg: true});
  },
  updateImg: function(e){ //TODO: REFACTOR THIS.
    e.preventDefault();
    var img = React.findDOMNode(this.refs.img).value.trim();
    var c = this.state.contact;
    c.img = img;
    this.setState({contact: c, editImg: false});
    AppActions.updateContact(c);
  },
  editName: function(){
    this.setState({editName: true});
  },
  editLinks: function(){
    this.setState({editLinks: true});
  },
  updateName: function(e){
    e.preventDefault();
    var name = React.findDOMNode(this.refs.name).value.trim();
    var c = this.state.contact;
    c.name = name;
    this.setState({contact: c,editName: false});
    AppActions.updateContact(c);
  },
  updateLinks: function(e){
    e.preventDefault();
    var github = React.findDOMNode(this.refs.github).value.trim();
    var email = React.findDOMNode(this.refs.email).value.trim();
    var twitter = React.findDOMNode(this.refs.twitter).value.trim();
    var phone = React.findDOMNode(this.refs.phone).value.trim();
    var location = React.findDOMNode(this.refs.location).value.trim();
    var c = this.state.contact;
    c.github = github;
    c.email = email;
    c.twitter = twitter;
    c.phone = phone;
    c.location = location;
    this.setState({contact: c, editLinks: false});
    AppActions.updateContact(c);
  },
  render: function(){
    var img, name, links;

    if(this.state.editImg){
      img = (<form className="form-group" onSubmit={this.updateImg}>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Image URL:</label>
                    <div className="col-sm-8">
                      <input type="text" ref='img' className="form-control" placeholder={this.state.contact.img} />
                    </div>
                </div>
             </form>);
    } else if (!this.state.editImg) {
      img = (<p>
              <a href="/">
                <img className="img-responsive" src={this.state.contact.img} alt="profile pic"/>
              </a>
              <span onClick={this.editImg} className="glyphicon glyphicon-edit"></span>
            </p>);
    }

    if(this.state.editName){
      name = (<form className="form-group" onSubmit={this.updateName}>
                <div className="form-group">
                    <label className="col-sm-2 control-label">Name: </label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" ref='name' placeholder={this.state.contact.name}/>
                    </div>
                </div>
             </form>);
    } else if (!this.state.editName) {
      name = <h1 onClick={this.editName}> {this.state.contact.name}</h1>;
    }
    if(this.state.editLinks) {
      links = (
               <form className="form-group">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Github: </label>
                    <div className="col-sm-10">
                      <input ref="github" className="form-control" type="text" placeholder={this.state.contact.github} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Email: </label>
                    <div className="col-sm-10">
                      <input ref="email" className="form-control" type="text" placeholder={this.state.contact.email} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Twitter: </label>
                    <div className="col-sm-10">
                      <input ref="twitter" className="form-control" type="text" placeholder={this.state.contact.twitter} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Phone: </label>
                    <div className="col-sm-10">
                      <input ref="phone" className="form-control" type="text" placeholder={this.state.contact.phone} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Location: </label>
                    <div className="col-sm-10">
                      <input ref="location" className="form-control" type="text" placeholder={this.state.contact.location}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <input onClick={this.updateLinks} id="submit" name="submit" type="submit" className="btn btn-default" />
                    </div>
                  </div>
               </form>
              );
    } else if (!this.state.editLinks) {
      links = (<p>
                  <a href={this.state.contact.github}>
                    <img className="icons" src="/images/github.png" />
                  </a>
                  <a href={this.state.contact.email}>
                    <img className="icons" src="images/email.png" />
                  </a>
                   {this.state.contact.phone}
                  <a href={this.state.contact.twitter}>
                    <img className="icons" src="images/twitter.png" />
                  </a>
                   {this.state.contact.location}
                   <span onClick={this.editLinks} className="glyphicon glyphicon-edit"></span>
               </p>);
    }

    return (<div className="col-xs-12">
                {img}
                {name}
                {links}
            </div>);;
  }
});

module.exports = AdminContact;
