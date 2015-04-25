#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import os
import jinja2
import json
#dummy data
from resume import *
from handlers import *
from google.appengine.ext import db
#from google.appengine.ext import blobstore
#from google.appengine.ext.webapp import blobstore_handlers
template_dir = os.path.join(os.path.dirname(__file__), './')
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir), autoescape=True)


#models
class User(db.Model):
    firstname = db.StringProperty(required=True)
    lastname = db.StringProperty(required=True)
    username = db.StringProperty(required=True)
    email = db.EmailProperty(required=True)
    password = db.StringProperty(required=True)

    def to_dict(self):
        return dict([(p, unicode(getattr(self, sp))) for p in self.properties()])


class Post(db.Model):
    title = db.StringProperty(required=True)
    date = db.DateTimeProperty(required=True)
    author = db.StringProperty(required=True)
    summary = db.TextProperty(required=True)
    content = db.TextProperty(required=True)

    def to_dict(self):
        return dict([(p, unicode(getattr(self, p))) for p in self.properties()])


class Contact(db.Model):
    img = db.StringProperty()
    name = db.StringProperty()
    email = db.StringProperty()
    phone = db.StringProperty()
    github = db.StringProperty()
    twitter = db.StringProperty()
    location = db.StringProperty()
    belongsTo = db.StringProperty(required=True)

    def to_dict(self):
        return dict([(p, unicode(getattr(self, p))) for p in self.properties()])


class Bio(db.Model):
    name = db.StringProperty()
    role = db.StringProperty()
    skills = db.TextProperty()
    projects = db.TextProperty()
    education = db.TextProperty()

    def to_dict(self):
        return dict([(p, unicode(getattr(self, p))) for p in self.properties()])


#app
class Handler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        #gets template converts to string
        t = jinja_env.get_template(template)
        #sends in params like {{variable}}
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))


class IndexPage(Handler):
    def render_index(self):
        self.render('index.html')

    def get(self):
        self.render_index()

class RegisterPage(Handler):
    def render_index(self):
        self.render('index.html')

    def get(self):
        self.render_index()

    def post(self):
        username = escape_html(self.request.get('username'))
        firstname = escape_html(self.request.get('firstname'))
        lastname = escape_html(self.request.get('lastname'))
        password = salt_password(escape_html(self.request.get('password')))
        cpassword = salt_password(escape_html(self.request.get('cPassword')))
        email = escape_html(self.request.get('email'))
        #TODO: verify input, send errors back if ant

        github = escape_html(self.request.get('github'))
        phone = escape_html(self.request.get('phone'))
        img = escape_html(self.request.get('img'))
        location = escape_html(self.request.get('location'))
        twitter = escape_html(self.request.get('twitter'))

        if cpassword:
            user = User(username=username, firstname=firstname, lastname=lastname, email=email, password=password)
            user.put()
            contact = Contact(img=img, email=email, name=firstname+" "+lastname, belongsTo=str(user.key().id()), github=github, location=location, phone=phone, twitter=twitter)
            contact.put()
            user_cookie = make_secure_val(str(user.key().id()))
            self.response.headers.add_header('Set-Cookie', 'user_id=%s;Path=/' % user_cookie)
            self.write('success')
        else:
            self.write('error')


class Login(Handler):
    def render_index(self):
        self.render('index.html')

    def get(self):
        self.render_index()

    def post(self):
        body = self.request.body
        print body


class BlogPostJSON(Handler):
    def render_json(self, page):
        self.response.headers['Content-Type'] = 'application/json'
        #SELECT * FROM BlogPosts WHERE id = page
        self.write(json.dumps(BLOG['blog'][int(page)]))

    def get(self, page):
        self.render_json(page)


class ResumeJSON(Handler):
    def render_json(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(RESUME))

    def get(self):
        self.render_json()


class AboutJSON(Handler):
    def render_json(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(ABOUT))

    def get(self):
        self.render_json()


class BlogJSON(Handler):
    def render_json(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(BLOG))

    def get(self):
        self.render_json()
    #def post(self):


class Register(Handler):
    def post(self):
        data = self.request.body
        self.write(data)


class ContactJSON(Handler):
    def render_json(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(CONTACT))

    def get(self):
        self.render_json()

    def post(self):
        data = self.request.get('contact')
        try:
            contact = json.loads(data)
            user = getUser(contact['email'])
            if user:
                updateContact(user, contact)
            self.render_json()
        except:
            print "json incorrect"
            self.render_json()


class Admin(Handler):
    def post(self):
        user_id = self.request.cookies.get('user_id')
        print user_id
        user = get_user(user_id)
        if user:
            self.write(json.dumps({'isAdmin': True}))
        else:
            self.write(json.dumps({'isAdmin': False}))


def getUser(email):
    print "getting user with email: %s" % email
    user = db.GqlQuery("SELECT * FROM User WHERE email = :1", u).get()
    if user:
        return user
    else:
        return "no user"


def updateContact(user, contact):
    print "updateContact"
    print user + contact

app = webapp2.WSGIApplication([
    ('/', IndexPage),
    ('/resume.json', ResumeJSON),
    ('/resume', IndexPage),
    ('/blog', IndexPage),
    ('/admin', Admin),
    ('/register', RegisterPage),
    ('/login', Login),
    #('/blog/0', IndexPage),
    ('/blog/json/([0-9]+)', BlogPostJSON),
    ('/about', IndexPage),
    ('/about.json', AboutJSON),
    ('/blog.json', BlogJSON),
    ('/contact.json', ContactJSON)
], debug=True)
