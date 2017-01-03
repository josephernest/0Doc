/*
# 0Doc is a documentation writing tool.
# author:  Joseph Ernest (twitter: @JosephErnest)
# url:     https://github.com/josephernest/0Doc/
# license: MIT license
*/

(function() {

    // Insert includes
    $('#content file').each(function(index) {
        var filename = $(this).attr('src');
        var element = this;
        var client = new XMLHttpRequest();
        client.open('GET', filename, true);
        client.onreadystatechange = function() {
            if (client.readyState === 4) {
                element.outerHTML = client.responseText;
                if ($('#content file').length === 0)    // no more external file <file src="..."></file> to be loaded
                    render();
            }
        };
        client.send();
    });

    if ($('#content file').length === 0)
        render();

    function render() {
        // Render Markdown
        marked.Lexer.rules.gfm.heading = marked.Lexer.rules.normal.heading;  // fix to allow ##title as well as ## title (see https://github.com/chjj/marked/issues/642#issuecomment-130213790)
        marked.Lexer.rules.tables.heading = marked.Lexer.rules.normal.heading;
        $('#content').html(marked($('#content').text())).show();

        // Build TOC, inspired of http://stackoverflow.com/a/40946392/1422096
        var toc = document.getElementById('toc_ul');
        var list = document.querySelectorAll("h1,h2");
        var tocArr = [], cur;
        for (var i = 0; i < list.length; i++) {
            var e = list[i];
            if (e.tagName == "H1") {
                tocArr.push({text:e.textContent, children:(cur=[])});
            } else {
                cur.push(e.textContent);
            }
        }
        for (var i in tocArr) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.appendChild(document.createTextNode(tocArr[i].text));
            a.href = '#' + tocArr[i].text.toLowerCase().replace(/[^\w]+/g, '-');     // this is how marked produces an id from h1 text
            li.appendChild(a);
            var ch = tocArr[i].children;
            if (ch.length > 0) {
                var ul = document.createElement("ul");
                for (var j in ch) {
                    var li2 = document.createElement("li");
                    var a = document.createElement("a");
                    a.appendChild(document.createTextNode(ch[j]));
                    a.href = '#' + ch[j].toLowerCase().replace(/[^\w]+/g, '-');
                    li2.appendChild(a);
                    ul.appendChild(li2);
                }
                li.appendChild(ul);
            }
            toc.appendChild(li);
        }

        $('#toc a').click(function() {
            ignorenextscrollevent = 1;
            clearTimeout(willberendered);
            willberendered = undefined;
            $('a.current').removeClass('current');
            $(this).addClass('current');
            collapsenavbar();
        });

        function collapsenavbar() {
            $('li ul').hide();                       // hide all h2s
            $('a.current + ul').show();              // show the h2s next to a selected h1 item
            $('a.current').parent().parent().show(); // show the h1 related to a selected h2 item (i.e. its grandparent)
        }

        // Select this element in the navbar, and scroll to it if necessary
        function selectcurrentnavbar(selectedid) {
           $('a.current').removeClass('current');
            var selectednavitem = $('a[href="' + selectedid + '"]');
            selectednavitem.addClass('current');
            collapsenavbar();
            if (selectednavitem.position().top < 0 || selectednavitem.position().top > 0.9 * $(window).height()) {           // if element out of current viewport
                $('#left').scrollTop(selectednavitem.position().top + $('#left').scrollTop() - 0.5 * $(window).height());    // move the scrollbar
            }
        }

        // Follow the scrolling
        var ignorenextscrollevent;
        var anchor = window.location.hash.substr(1);
        if (anchor !== '') {             // if URL is index.html#anchor, don't use the 2 initial scroll events
            ignorenextscrollevent = 2;
            selectcurrentnavbar('#' + anchor);
        }
        else {
            ignorenextscrollevent = 1;   // ignore the first scroll event
            $('#toc a').first().addClass('current');
            $('li ul').hide(); $('a.current + ul').show();
        }

        var willberendered = undefined;
        $(window).scroll(function() {  // see http://stackoverflow.com/a/18564379/1422096
            if (willberendered === undefined && ignorenextscrollevent === 0)
                willberendered = setTimeout(function() {
                    if ($(document).scrollTop() === 0) { // top of page
                        $('a.current').removeClass('current');
                        $('#toc a').first().addClass('current');
                        $('li ul').hide(); $('a.current + ul').show();
                        $('#left').scrollTop(0);
                        window.history.pushState('', '', window.location.pathname + window.location.search);  // remove the #anchor: http://stackoverflow.com/a/5298684/1422096
                    }
                    else {
                        var selected;
                        var windowMiddle = Math.max($('body').scrollTop(), $('html').scrollTop()) + $(window).height() / 2;
                        $('h1, h2').each(function (index) {
                            if (windowMiddle > ($(this).position().top)) {
                                selected = this;
                            }
                            else {
                                return false;  // break in a each
                            }
                        });
                        var selectedid = '#' + $(selected).attr('id');
                        selectcurrentnavbar(selectedid);

                        window.history.pushState('', '', selectedid);
                    }
                    willberendered = undefined;
                }, 200);
            if (ignorenextscrollevent > 0)
                ignorenextscrollevent -= 1;
        }).scroll();

        // Search
        var results, currentIndex = 0;

        function jumpTo() {
            if (results.length) {
                var current = results.eq(currentIndex);
                results.removeClass('currentsearch');
                if (current.length) {
                    current.addClass('currentsearch');
                    viewporttop = current.offset().top - $(window).scrollTop();
                    if (viewporttop < 0 || viewporttop > 0.95 * $(window).height()) {    // scroll only if out of the viewport
                        $(window).scrollTop(current.offset().top);
                    }
                }
            }
        }

        var $input = $('#inputsearch'),
            $ctx = $('#content'),
            timeout = null;
        $input.on('input', function(e) {
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                $ctx.unmark({
                    done: function(){
                        $ctx.mark($input.val(), {
                            separateWordSearch: false,
                            done: function() {
                                results = $ctx.find("mark");
                                currentIndex = -1;
                            }
                        });
                    }
                });
            }, 200);
        });

        $('#inputsearch').keydown(function(e) {
            if (e.keyCode == 13) {
                currentIndex += e.shiftKey ? -1 : 1;       // shift+ENTER => search backwards
                if (currentIndex < 0) { currentIndex = results.length - 1; }
                if (currentIndex > results.length - 1) { currentIndex = 0; }
                jumpTo();
            }
        });

        // Clear searches
        $(window).keydown(function(e) {
            if (e.keyCode == 27) {
                $('#content').unmark(); $('#inputsearch').val("");
                e.preventDefault();
                return false;
            }
            else if (((e.ctrlKey && !e.altKey || e.metaKey) && e.keyCode == 70) || (e.keyCode == 114)) {   // CTRL+F or F3
                e.preventDefault();
                $('#inputsearch').select().focus();
            }
        });

        $('#content').click(function(e) {
            $('#content').unmark(); $('#inputsearch').val("");
            $('#left').addClass('collapsed');
            $('#nav').removeClass('collapsed');
        });

        // Top left navigation button for small browser-width mobile devices
        $('#nav').click(function() {
            $('#nav').addClass('collapsed');
            $('#left').removeClass('collapsed');
        });
    }
})();
