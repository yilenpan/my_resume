/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/app-store.js');

var Paginate = React.createClass({
  handleClick: function(i){
    console.log("Paginate clicked -> " + i.target.value);
    var page = i.target.value;
    this.props.pageNum = page;
  },
  render: function() {
    var pageNums = [], pages = AppStore.getPageNums();
    for (var i = 1; i <= pages; i++){
      pageNums.push(<li><button className="btn btn-primary" onClick={this.handleClick} value={i}>{i}</button></li>);
    }
    return (
      <nav>
        <ul className="pagination">
          {pageNums}
        </ul>
      </nav>
      );
  }
});

module.exports = Paginate;