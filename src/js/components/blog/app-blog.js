/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');
var Loading = require('../template/loading.js');
var BlogList = require("./bloglist.js");
var AppActions = require('../../actions/app-actions.js');

//TODO: split the paginate into it's own module.
var Blog = React.createClass({
  getInitialState: function() {
    return {currentPage: [], loading: true, pNum: 1};
  },
  loadBlog: function(){ //TODO: CREATE MIXIN.
    $.ajax({
      url: './blog.json',//TODO: LINK TO BACKEND
      success: function(data) {
        AppActions.addBlog(data.blog);
        this.getCurrentPage(1);
        this.setState({loading: false});
      }.bind(this)
    });
  },
  getCurrentPage: function(page){
    //console.log('getCurrentPage: ' + page);
    this.setState({currentPage: AppStore.currentPage(page), pNum: parseInt(page)});
  },
  changePage: function(item){
    //console.log("changePage clicked -> " + item.target.value);
    var page = item.target.value;
    this.getCurrentPage(page);
  },
  componentDidMount: function() {
    var self = this;
    setTimeout(function(){
      //console.log('did mount');
      self.loadBlog();
    }, 1000);
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
    var pageNums = [], pages = AppStore.getPageNums();
    for (var i = 1; i <= pages; i++){
      pageNums.push(<li>
                      <button className="btn btn-primary" onClick={this.changePage} value={i}>
                        {i}
                      </button>
                    </li>);
    }
    if (!this.state.loading){
        var prev = this.state.pNum > 1 ? (
                    <li>
                      <button className="btn btn-primary" onClick={this.downPage}>
                        <span>Prev.</span>
                      </button>
                    </li>) : <li></li>;
        var next = this.state.pNum < pages ? (<li>
                        <button className="btn btn-primary" onClick={this.upPage}>
                          <span>Next</span>
                        </button>
                      </li>) : <li></li>;
        inner = (
                <div>
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