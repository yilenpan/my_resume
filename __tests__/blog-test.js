jest.autoMockOff();

describe('blog component', function(){
  it('should render the first page on load', function(){
    var React = require('react/addons');
    var Blog = require('../src/js/components/blog/app-blog.js');
    var TestUtils = React.addons.TestUtils;

    var blog = TestUtils.renderIntoDocument(
        <Blog />
      );
    console.log(blog);
    //expect the length of the current page to be 5 posts long
    expect(3+2).toBe(5);
  });

 // it('should change pages', function(){
   // var blog = require('../src/js/components/blog/app-blog.js');
 // });

});