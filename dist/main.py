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
from resume import * # dummy data
from google.appengine.ext import db
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
template_dir = os.path.join(os.path.dirname(__file__),'./')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                                autoescape=True)

class Handler(webapp2.RequestHandler):#keep this shit
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template) #gets template converts to string
        return t.render(params) #sends in params like {{variable}}

    def render(self, template, **kw):
        self.write(self.render_str(template,**kw))

class IndexPage(Handler):
    def render_index(self):
        self.render('index.html')
    def get(self):
        self.render_index()

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

class ContactJSON(Handler):
    def render_json(self):
        self.response.headers['Content-Type'] = 'application/json'
        self.write(json.dumps(CONTACT))
    def get(self):
        self.render_json()

app = webapp2.WSGIApplication([
    ('/', IndexPage),
    ('/resume.json', ResumeJSON),
    ('/resume', IndexPage),
    ('/blog', IndexPage),
    ('/blog/([0-9]+)', IndexPage),
    ('/about', IndexPage),
    ('/about.json', AboutJSON),
    ('/blog.json', BlogJSON),
    ('/contact.json', ContactJSON)
], debug=True)
