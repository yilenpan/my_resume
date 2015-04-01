/** @jsx React.DOM */

var APP = require('./components/app');
var React = require('react');
var Resume = require('./stores/app-resume.js');

React.render(<APP data={Resume}/>, document.getElementById('main'));

