To Run
====

To run the page, open index.html in the dist folder. To look at the code, take a look at the src folder.



This is how I built it!

Day 1
----


# Hello World

Hello! Welcome to my process for building this site. This is
the first time I've ever built anything with Facebook's
React/Flux architechture, so this will be a learning process.
This site will include routing and hopefully making calls
to a python based back-end. All the code will be up on my
github.

I've gone ahead and whiteboarded out what it is I want this
website to look like.

I picked a color palette that I like. It's called Sa Barca de
Formetera. It's a dark grey, grey, teal, white, yellow combo.

Dark Grey -> #333333
Grey -> #424242
Teal -> #00CCD6
White -> #EFEFEF
Yellow -> #FFD900


# Boilerplate, bower, gulp, and alias

Alias, bower, and gulp were revelations to me in that it would automatically do things for me that would otherwise be tedious and time consuming. Instead of having to download jquery, bootstrap and react, I could just bower install them. After figuring out CommonJS and Browserify, there was no need to concat and minify all of my js by hand. It would automatically do it for me.

If you want a good tutorial on how to use gulp, I suggest reading [This](http://markgoodyear.com/2014/01/getting-started-with-gulp/) and [this](http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/).

Both were very helpful in learning gulp.

Then I found out about alias and how you can write custom terminal commands. MIND. BLOWN.

I vim'ed into .bash_profile and started messing around.

    alias newproj='cp ~/templates/package.json package.json;npm install; cp ~/templates/gulpfile.js gulpfile.js;mkdir src;cd src;cp ~/templates/index.html index.html;mkdir styles js images; cd js;mkdir actions components stores dispatchers constants; cp ~/templates/main.js main.js;cd dispatchers;cp ~/templates/dispatcher.js dispatcher.js;cp ~/templates/app-dispatcher.js app-dispatcher.js;cd ..; cd components; cp ~/templates/app.js app.js; cd ../../../; bower install bootstrap; subl .'

It's a little dense, so I'll walk you through it.

First I copied my `package.json` file from my ~/templates folder and ran `npm install`. Then I created a source folder (where I do all of my work), and it makes the boiler plate files I need to build. Lastly I `bower install bootstrap` then open the entire folder in sublime.

Making a new project folder is as simple as making a new dir and executing `newproj`. Something oldly satisfying about that.

# Plan of attack

There are seven pages in this site - splash page, blog, blog post page, resume, about, admin page, and admin login.

- Splash Page

A big normal front page.

- Blog

A listing of all blog posts

- Blog post page

Blog post page

- Resume

Resume

- About

Takes data from users (IP address, forwarding address, visitor count) and uses D3 or something to display. Maybe put IP addresses on google maps.

- Admin

Allows me to make blog posts

- Admin Login

Allows me to login.

# Work flow

I think the best plan of attack is the following.

Mockup -> Routes -> Template -> CRUD -> Styling

We've gone over Mockups, lets talk about Routes.

# Routes

React and flux allows you to route your app so that you can load different pages without having the backend reload the entire page. This means its gentler on the backend server, and data can be passed back and forth using jsons.

The first thing to do is to make sure we can visit each of theses pages using React routes.

First things first, install `react-router-component`

    npm install react-router-component

Then in the app.js file, we set up our routes.

    var Router = require('react-router-component');
    var Locations = Router.Locations;
    var Location = Router.Location;
    var App...

      <div>
          <Locations>
            <Location path="/" handler={Splash} />
            <Location path="/blog" handler={Blog} />
            <Location path="/blog/:post" handler={BlogPost} />
            <Location path="/resume" handler={Resume} />
            <Location path="/about" handler={About} />
          </Locations>
      </div>

Wrap `Location` in a `Locations` tag, then wrap that up in a div. Later when we do templating, change those divs up to an actual template.js


To link, we go to the Splash component and add links.

    var Link = require('react-router-component').Link;
    ...
      <Link href="/about"> about </Link>
    ...

We have our routes done.

The admin pages will be added along side the back-end when I'm adding CRUD functionality to it. Dunno if this is the best approach, but darn it, it's my approach.

# Template

Seeing as we can load everything from a JS, why not build components. We're going to add a header and a sidebar to each of the components and make sure that everything is in nice working order.

I based the design of this site on Mega.co.nz's layout. I think it's cool. Things are going to change, but, I do like me that design.


Using Bootstraps components I added a `<nav>` elm to the top of the doc. I'm not going to worry about how it looks so far, I'm going to mess with the css later.

In main.js:

    <div>
      <Header />
      <div className='container'>
        <div className="row">
          <SideMenu />
          <div className="col-xs-9">
            <Locations>
              ...
            </Locations>
          </div>
        </div>
      </div>
    </div>

As you can see, we wrap the whole thing in a div and append it to the body. Header comes first, outside of the div.container, then we make a row, then slice up the row 3/9 with side menu and the Locations.

The next thing to do is to create stores where the components will fetch data. before they load. We are going to create some fake data in the form of json files and create functions that will fetch this data.

Later we will need to figure out a way to design a backend that will respond to these api calls. hopefully it goes ok...


Day 2
------------

# Implemeting Flux Architechture

So, I'm sure by now you've seen the videos on Flux and how it changed the way Facebook does it's front end design. It took me a couple of weeks watching and rewatching these videos to finally get a grasp of what was happening. I think I get it...

Basically flux is a design pattern that allows you to mutate your data in the store (model), and have it automatically update all the components that are reliant on that data. Forget MVC for now, this is a completely new way of thinking about front end design.

It goes like this:

The user generates a new Action. This can be an onClick event. The action then calls the Dispatcher and 'dispatches' an action to the store.

The store reads the the dispatcher and executes the function the dispatcher calls via a giant switch statement. This is where the data is changed.

After we change the data, we then need to emit changes. I'm going to use EventEmitter. Once we emit the change, the view updates.

In the component, we need to add two functions in the componentWillMount and the componentWillUnmount sections. In the componentWillMount, we will add a listener, and in the Unmount we'll take that listener off. The view waits for an event from the emitter, which then changes the view.

[Flux for stupid people](http://blog.andrewray.me/flux-for-stupid-people/)

# componentDidMount

Using this train of thought, it'll probably be best to start with building the Actions. But seeing as how we're mainly getting information, rather than setting it, I'm going to set up the stores.

I added ajax functions to the stores and have the views call them. Now I'm running into a bug in the resume component - the json only appears after I click resume the second time. Something isn't adding up.

...

So after digging around, the more effective way of loading a resume is to put the function in the componentDidMount part of the component. So, thats what I did.

Now it works!

# AJAX headaches

Okay, so after messing around with AJAX, here are a few thoughts on it.

- The A in Ajax stands for asynchronous. This means if you don't wait for the data to come back, you'll be sorry.

I was running into a ton of problems getting my app to load the json data. It was a pain in the ass. For about an hour today, the data from the resume.json was loading, but I couldn't tease it apart. Calling `this.state.data.bio.name` wouldn't work, but I could print `this.state.data.bio`. And when I tried console logging, it would give me a big fat undefined error.

What finally got me to stop spinning my wheels was to think about slow internet. If things are slow, that means you have to wait for things to load. A variable won't be initialized until the ajax call has completed it's task. This means if you try to console log a var, it'll always end up being undefined because the ajax call hasn't finished yet.

What's one way of solving this? Loading screens.

I did my fair share of googling and came across [this](http://stackoverflow.com/questions/27875906/react-js-deep-object-in-state-with-async-data-does-not-work) solution.

    var bio = this.state.data.bio ? <Bio data={this.state.data.bio} /> : <Loading />;

So I separated out the app-resume.js into different components. The above line is as follows: if data.bio doesn't exist, display the Loading component. When data.bio does exist, it will switch over to the Bio component.

This is going to take some more testing, but hopefully this works.

...

I decided on using an additional state called loading. I saw this solution [here](https://github.com/sthomp/reactjs-tutorial/blob/master/src/tutorial1.js). Down on the bottom is code for a loading screen, which is just what I want. He accomplishes this by using `loading` as a switch for what to render.

Here is what I did to my Blog component:

    var Blog = React.createClass({
      getInitialState: function() {
        return {data: [], loading: true};
      },
      loadBlog: function(){
        //... ajax call to api
          success: function(data) { //setState data to data
                                    //loading to false
            this.setState({data:data, loading: false});
          }
      },
      componentDidMount: function() {
        var self = this;
        setTimeout(self.loadBlog(),1000);//delay to simulate lag
      },
      render: function() {
        var inner;
        if (!this.state.loading){
          inner = <BlogList data={this.state.data} />;
        } else {
          inner = <Loading />;
        }
        return (<div>
                {inner}
                </div>);
      }
    });

I tried the other way, but for some reason it didn't agree with me. Perhaps someone can shed light on why.

But anywho, thats how to do loading screens. Awesome.

Day 3
----

# Much to do About the About page

I have big plans for the About page. I plan on giving each user a uniq cookie so I can track them. I found an API which converts IP addresses to the corresponding city, which I then plan on putting on a google map. I want a Unique visitor count. A list of referer websites, amount of time spent on each page, etc.

I also want the about page to constantly be updating. This will defintely show off react and flux.

Big plans. Most of which will be done on the backend. But I'm not there yet...

# Making fake data

The problem about fake data is that it has to mimic real data. It's going to suck if I write the front end to respond to one kind of json, get to the backend and realize that it produces another kind of json.


# The issue with stores.

So, I want to be able to call data from the stores. That means in the ajax call, we're going to update the stores. Then when we call that data, we call it from the stores.


# Day 4

# using jest

Today I'm going to try and paginate the blog. currently, bloglist returns the entire blog, content and all, and that's no good. So this is what it should do.

On the bottom of the blog page, there should be a page count. I still think bloglist should get a bloglist.json, but it should only have title, date, and summary. When the blog post link is clicked, it should make an ajax call to the server and return the blog post, with content.

just to think about the backend for a moment, the DB.model should look like it is now, but when /blog.json is called, it should be `SELECT title, date, summary from Blog`, and when /blog/:id/.json is called, it should return `select * from Blog where id = *id*`.

there should be a pagination component that sends a page number to a function in the store called `currentPage`. the currentPage function should update the blog list and the bloglist should display the current page.

We are going to write the tests for it. First it should require the pagination component and the store. It should divide the number of blogposts by 5 and list the number of pages. On load, the bloglist should return the first 5 results of the page. clicking on the second should return the next 5, etc. clicking on the pages should update the bloglist. finally clicking on the title will send an ajax call to the server and return the blog post.

let's get writing these tests.

First thing we need to do is make a folder in the root directory called __tests__. inside of the folder are our tests. According to the guy who wrote jest, every test runs in paralell, which means its faster to split up the test into different files rather than just have one big file.

# Day 5

# Admin

So first off, I've changed the look of the resume site. I still need to come up with a cool splash page, and I need to



















