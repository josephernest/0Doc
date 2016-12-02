0Doc
=======

**0Doc** is a single-file documentation writing-tool.

Live version: [0Doc](https://josephernest.github.io/0Doc/).


Installation
----
Just open `index.html` and that's it! No server needed.

To edit your own documentation, write it in Markdown syntax inside the `<div id="content"> ... </div>`. 
The table of contents will be automatically generated.

You can also:

* Modify <title>...</title> with your own title

* Use your own `logo.png` file


Why another static documentation generator ?
----

I discovered the great [Slate](https://github.com/lord/slate) project, but it requires to install `Ruby`, `bundler`, and it's just another layer on top of [middleman](https://middlemanapp.com/) static website generator. As I'm not a user of all these tools, I didn't find it confortable for me.

That's why I decided to write this one-HTML-file solution, that:

* doesn't require any server (client side only)
* only requires a few javascript libraries


About
----
Author: Joseph Ernest ([@JosephErnest](https://twitter.com/JosephErnest))

Other projects: [BigPicture](http://bigpicture.bi), [bigpicture.js](https://github.com/josephernest/bigpicture.js), [AReallyBigPage](https://github.com/josephernest/AReallyBigPage), [SamplerBox](http://www.samplerbox.org), [Void](http://www.thisisvoid.org), [TalkTalkTalk](https://github.com/josephernest/TalkTalkTalk), [YellowNoiseAudio](http://www.yellownoiseaudio.com), etc.

License
----
MIT license

Dependencies
---
**0Doc** uses [marked](https://github.com/chjj/marked).