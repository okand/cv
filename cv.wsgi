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

def appearances(the_string, the_list):
    """ return '%s%i' % (the_string, i) where i is the number of times
    the_string appears in the_list, unless it appears exactly once, in which
    case just return the_string"""

    appearances = len([i for i in the_list if i == the_string])
    if appearances == 1:
        return the_string
    else:
        return '%s%i' % (the_string, appearances)

@bottle.route('/<key>/')
@bottle.route('/<key>')
def cv(name='Index', key=None):
    cv_md_path = '%s/cv.md' % os.path.dirname(__file__)
    cv_md = codecs.open(cv_md_path, encoding='utf-8').read()
    
    if key in secrets.permitted:
        tel = secrets.tel
    else:
        tel = None


    # -- BEGIN HORRIBLE REGEX MAGIC
    # sort out tags
    tag_matcher = r'(?<=-\s).*({[^}]+})'
    so_far = []

    while re.search(tag_matcher, cv_md):
        match = re.search(tag_matcher, cv_md)
        tags = [t.strip() for t in match.group(1).strip('{}').split(',')]
        so_far.extend(tags)
        tags = ['<a class="tag inline" id="%s" href="#%s">%s</a>' % (appearances(t, so_far), t, t) for t in tags]
        tagstring = '<span class="tags">%s</span>' % ' '.join(tags)

        # and put them at the start of the line
        replacement = match.group(0).replace(match.group(1), '') + tagstring
        cv_md = cv_md.replace(match.group(0), replacement)
    

    # put links in footer
    # cv_md = re.sub(r'\[(.*?)]: ([^\s]+?) "(.*?)"', r'[\1]: \2 "\3"\n\n<p class="print label"><sup>[\1]</sup> \3:</p><p class="print url"><a href="\2">\2</a></p>', cv_md)

    # put links in sidebar
    matched = []

    #                         body text    tag         new          tag        footer...
    link_matcher = r'(?ms)\[([^\]]+?)]\ \[([^\]]+?)](?!<span)(?=.*^\[\2]:\ ((?:https?://)?(?:www\.)?)([^\s]+?)(?:/)?\s)'
    link = r'[\1] [\2]<span class="print"><sup>\[\2]</sup></span>'
    note = r'<span class="print note">\[\2]&nbsp; <code><a href="\3\4">\4</a></code></span>'

    while re.search(link_matcher, cv_md):
        match = re.search(link_matcher, cv_md)
        slug = match.group(2)
        if slug not in matched:
            expanded = match.expand(link+note)
            matched.append(slug)
        else:
            expanded = match.expand(link)

        cv_md = cv_md[:match.start(0)] + expanded + cv_md[match.end(0):]
    
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
