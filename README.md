0Doc
=======

**0Doc** is a simple documentation writing tool. 

Live version: [0Doc](https://josephernest.github.io/0Doc/).

[![](http://gget.it/rwx9ovzb/screenshot_500px.jpg)](https://josephernest.github.io/0Doc/)

[This is an example of use](https://josephernest.github.io/0Doc-chip) for C.H.I.P.'s documentation, forked from http://docs.getchip.com/chip.html.

Installation
----
Just open `index.html` and that's it!

To edit your own documentation, write it in Markdown syntax inside the `<div id="content"> ... </div>`. 
The table of contents will be automatically generated on the fly. No other tool needed.

You can also:

* Modify `<title>...</title>` with your own title

* Use your own `logo.png` file


Why another static documentation generator ?
----

I discovered the great [Slate](https://github.com/lord/slate) project, but it requires to install `Ruby`, `bundler`, and it's just another layer on top of [middleman](https://middlemanapp.com/) static website generator, which does most of the work. As I'm not a user of all these tools, I didn't find it confortable for me.

Moreover I don't like having to run a command to re-render HTML files each time you modify the documentation (that's often the case with static websites generators).

That's why I decided to write this simple solution *that doesn't require any tool* like Ruby, Python, Perl, etc. The output is rendered on the fly when you open `index.html`.

In short, this means that you just have to edit your `index.html`, and not worry about anything else.

External files
----

It's possible to include external files with:

    <div id="content">
        <file src="chapter1.md"></file>
    </div>
    
More about this feature [here](https://github.com/josephernest/0Doc/issues/3).

About
----
Author: Joseph Ernest ([@JosephErnest](https://twitter.com/JosephErnest))

Other projects: [BigPicture](http://bigpicture.bi), [bigpicture.js](https://github.com/josephernest/bigpicture.js), [AReallyBigPage](https://github.com/josephernest/AReallyBigPage), [SamplerBox](http://www.samplerbox.org), [Void](http://www.thisisvoid.org), [TalkTalkTalk](https://github.com/josephernest/TalkTalkTalk), [YellowNoiseAudio](http://www.yellownoiseaudio.com), etc.

License
----
MIT license


Dependencies
----

0Doc uses jQuery, [marked](https://github.com/chjj/marked) for Markdown rendering and [mark.js](https://markjs.io/) for on-page search.
