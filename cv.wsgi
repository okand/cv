#!/usr/bin/env python2
# -*- coding: utf-8 -*-

import os, sys

dir = os.path.dirname(__file__)

sys.path.append(dir)
os.chdir(dir)

import bottle
import codecs
import re
from markdown import markdown

import secrets

@bottle.route('/')
def index():
    return cv()

@bottle.route('/<key>')
def cv(name='Index', key=None):
    cv_md_path = '%s/cv.md' % os.path.dirname(__file__)
    cv_md = codecs.open(cv_md_path, encoding='utf-8').read()
    
    if key in secrets.permitted:
        tel = secrets.tel
    else:
        tel = None

    # -- BEGIN HORRIBLE REGEX MAGIC
    # put links in footer
    # cv_md = re.sub(r'\[(.*?)]: ([^\s]+?) "(.*?)"', r'[\1]: \2 "\3"\n\n<p class="print label"><sup>[\1]</sup> \3:</p><p class="print url"><a href="\2">\2</a></p>', cv_md)

    # put links in sidebar
    matched = []

    #                  body text      tag       new             tag        footer...
    matcher = r'(?ms)\[([^\]]+?)]\ \[([^\]]+?)](?!<span)(?=.*^\[\2]:\ ((?:https?://)?(?:www\.)?)([^\s]+?)(?:/)?\s)'
    while re.search(matcher, cv_md):
        match = re.search(matcher, cv_md)
        slug = match.group(2)
        if slug not in matched:
            cv_md = cv_md[:match.start(0)] + match.expand(r'[\1] [\2]<span class="print"><sup>\[\2]</sup></span><span class="print note">\[\2]&nbsp; <code><a href="\3\4">\4</a></code></span>') + cv_md[match.end(0):]
            matched.append(slug)
        else:
            cv_md = cv_md[:match.start(0)] + match.expand(r'[\1] [\2]<span class="print"><sup>\[\2]</sup></span>') + cv_md[match.end(0):]
    
    # flag inline links as such
    cv_md = re.sub(r'\[(.*?)]\ ?\((.*?)\)', r'<a class="inline" href="\2">\1</a>', cv_md)
    
    # allow noted urls to wrap
    cv_md = re.sub('(?=<code><a.*?>[^<])*/(?=[^<>]*</a></code>)', '/&#8203;', cv_md)
    # -- END HORRIBLE REGEX MAGIC

    cv_html = markdown(cv_md)

    return bottle.template('cv', cv=cv_html, tel=tel)

application = bottle.default_app()

if __name__ == '__main__':
    bottle.run(host='0.0.0.0', port=8081)
    #from flup.server.fcgi import WSGIServer
    #WSGIServer(application).run()
