/** @jsx React.DOM */

var React = require('react');
var AppStore = require('../../stores/app-store.js');
var AppActions = require('../../actions/app-actions.js');

var AdminAddBlog = React.createClass({
  getInitialState: function(){
    return {showPostForm: false};
  },
  showPostForm: function() {
    if(!this.state.showPostForm){
      this.setState({showPostForm: true});
    } else {
      this.setState({showPostForm: false});
    }
  },
  addPost: function(e){
    e.preventDefault();
    var date = new Date();
    var data = {title:"Dummy Post", "summary": "data", "content": "dummy content", "date": date.toString()};
    AppActions.addBlogPost(data);
    this.showPostForm();
    //send data to server
    console.log('data sent');
  },
  componentDidMount: function(){
    console.log('admin did mount');
  },
  render: function(){
    var inner = <p><span onClick={this.showPostForm} className="glyphicon glyphicon-plus" aria-hidden="true"></span></p>;
    var inputTitle=<h1></h1>;

    if(this.state.showPostForm){
      inputTitle = (<form className="form-horizontal" method="post" action="/admin/submit">
                      <div className="form-group">
                        <label className="col-sm-2 control-label">Title</label>
                        <div className="col-sm-10">
                          <input className="form-control" type="text" name="title" placeholder="Title" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-sm-2 control-label">Post</label>
                        <div className="col-sm-10">
                          <textarea className="form-control" rows="10" name="post" placeholder="Post..." />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-10 col-sm-offset-2">
                          <input onClick={this.addPost} id="submit" name="submit" type="submit" className="btn btn-default" />
                        </div>
                      </div>
                    </form>);
    }
    return <div>{inner}<br />{inputTitle}</div>;
  }
});

module.exports = AdminAddBlog;
















