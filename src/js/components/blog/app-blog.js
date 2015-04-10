/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var BlogList = require("./bloglist.js");
var AppActions = require('../../actions/app-actions.js');
var AdminAddBlog = require('../admin/add-blog.js');

var Blog = React.createClass({
  getInitialState: function() {
    return {isAdmin: false, currentPage: [], loading: true, pNum: 1};
  },
  componentWillMount: function(){
    AppStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },
  setAdmin: function(isAdmin){
    this.setState(isAdmin);
  },
  _onChange: function(){
    this.getCurrentPage(1);
  },
  loadBlog: function(){ //TODO: CREATE MIXIN.
    $.ajax({
      url: './blog.json',
      success: function(data) {
        AppActions.getBlog(data.blog);
        this.getCurrentPage(1);
        this.setState({loading: false});
      }.bind(this)
    });
  },
  getCurrentPage: function(page){
    this.setState({currentPage: AppStore.currentPage(page), pNum: parseInt(page)});
  },
  changePage: function(item){
    var page = item.target.value;
    this.getCurrentPage(page);
  },
  componentDidMount: function() {
    this.loadBlog();
    AppStore.checkAdmin(this.setAdmin);
  },
  downPage:function(){
    var p = this.state.pNum - 1;
    this.getCurrentPage(p)
    this.setState({pNum: parseInt(p)});
  },
  upPage:function(){
    var p = parseInt(this.state.pNum) + 1;
    this.getCurrentPage(p)
    this.setState({pNum: parseInt(p)});
  },
  render: function() {
    var inner;
    var admin = <div></div>;
    if(this.state.isAdmin){
      admin = <AdminAddBlog />;
    }

    var pageNums = [], pages = AppStore.getPageNums();
    for (var i = 1; i <= pages; i++){
      pageNums.push(<li>
                      <button className="btn btn-default" onClick={this.changePage} value={i}>
                        {i}
                      </button>
                    </li>);
    }
    if (!this.state.loading){
        var prev = this.state.pNum > 1 ? (
                    <li>
                      <button className="btn btn-default" onClick={this.downPage}>
                        <span>Prev.</span>
                      </button>
                    </li>) : <li></li>;
        var next = this.state.pNum < pages ? (<li>
                        <button className="btn btn-default" onClick={this.upPage}>
                          <span>Next</span>
                        </button>
                      </li>) : <li></li>;
        inner = (
                <div>
                  <div className="col-md-3"><h1>Blog</h1></div>
                  {admin}
                  <BlogList data={this.state.currentPage} />
                  <nav>
                    <ul className="pagination pagination-sm">
                      {prev}
                      {pageNums}
                      {next}
                    </ul>
                  </nav>
                </div>);
    } else {
      inner = <Loading />;
    }
    return inner;
  }
});

module.exports = Blog;