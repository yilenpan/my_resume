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
import random
import time
import cgi
import hashlib
import hmac
import string
import re
import cgi
import json
from google.appengine.ext import db
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers
from secret import *


def escape_html(s):
    return cgi.escape(s, quote = True)

template_dir = os.path.join(os.path.dirname(__file__),'../templates')
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

#cookies and logins
def hash_str(s):
    return hmac.new(SECRET, s).hexdigest()


def make_secure_val(s):
    return "%s|%s" % (s, hash_str(s))


def salt():
    size=32
    chars=string.ascii_uppercase + string.digits + string.ascii_lowercase
    return ''.join(random.choice(chars) for _ in range(size))


def salt_password (s, v =''):
    if v == '':
        v = salt()
    return "%s|%s" % ( v , hash_str(s + v))


def verify_password(u, p):
    user = db.GqlQuery("SELECT * FROM User WHERE email = :1", u).get()
    if user:
        h = user.password
        salt = h.split('|')[0]
        if h == salt_password(p, salt):
            return user.key().id()


def check_secure_val(h):
    val = h.split('|')[0]
    if h == make_secure_val(val):
        return val

#takes user_id val from cookie, checks to see if secure val
#if secure then returns user object
def get_user(user):
    if user:
        user_id = check_secure_val(user)
        if user_id:
            key = db.Key.from_path('User', int(user_id))
            user = db.get(key)
            return user


#sign up
PASS_RE = re.compile(r"^.{3,20}$")
def ver_password(password):
    if PASS_RE.match(password):
        return password
    return False

TEXT_RE = re.compile(r"^.{3,45}$")
def ver_text(text):
    if TEXT_RE.match(text):
        return text

def dup_email(u):
    v = db.GqlQuery("SELECT * FROM User WHERE email = :1", u).get()
    if not v:
        return True

EMAIL_RE = re.compile(r'^[\S]+@[\S]+\.[\S]+$')
def ver_email(email):
    if EMAIL_RE.match(email):
        return email

def pass_match(p1, p2):
    verify = False
    if p1 == p2:
        verify = True
    return verify

#turns object to json
def make_json(obj):
    result = {'data':[]}
    for item in obj:
        result['data'].append({str(item.key().id()) : json.dumps(item.to_dict(), sort_keys=True, indent=4, separators=(',', ': '))})
    return result

def isAdmin(user_id):
    user = get_user(user_id)
    if(user):
        email = user.email
        admin = db.GqlQuery("SELECT * FROM Admin WHERE email = :1", email).get()
        if(admin):
            return admin


def isPDF(blob_key):
    blob_reader = blobstore.BlobReader(blob_key, buffer_size=1048576)
    value = PdfFileReader(blob_reader)
    print value
    if value:
        return True


#Navbar user or sign in
def navbar_user(user_id):
    norm = """
            <form action='/login' method='post' class="navbar-form navbar-right ">
                    <div class="form-group">
                        <input type="text" name='user' placeholder="Email" class="form-control">
                    </div>
                    <div class="form-group">
                        <input type="password" name='password' placeholder="Password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </form>
            """
    if get_user(user_id):
        user = get_user(user_id)
        r = """<ul class="nav navbar-nav pull-right">
                <li><a  href="/home">Welcome %s!</a></li>
                <li><a href="/logout" >Logout <span class="glyphicon glyphicon-log-out"></span></a></li>
                </ul>""" % user.email
        return r
    else:
        return norm
