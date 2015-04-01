Building my Resume
====================

Day 1
---------------------

# Hello World

Hello! Welcome to my process for building this site. This is
the first time I've ever built anything with Facebook's
React/Flux architechture, so this will be a learning process.
This site will include routing and hopefully making calls
to a python based back-end. All the code will be up on my
github.

I've gone ahead and whiteboarded out what it is I want this
website to look like. Next is to head to balsamiq to do this
mock up in a png.

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

Making a new project folder is as simple as making a new dir and calling `newproj`. Something oldly satisfying about that.







