/* 
# 0Doc is a documentation writing tool.
# author:  Joseph Ernest (twitter: @JosephErnest)
# url:     https://github.com/josephernest/0Doc/
# license: MIT license
*/

marked.setOptions({ });
document.getElementById('content').innerHTML =  marked(document.getElementById('content').innerHTML);
var toc = document.getElementById('toc_ul'); 
var h1 = document.getElementsByTagName("h1");
for (var i = 0; i < h1.length; i++) {
     var li = document.createElement("li");
     var a = document.createElement("a");
     a.appendChild(document.createTextNode(h1[i].textContent));
     a.href = '#' + h1[i].textContent.toLowerCase().replace(/[^\w]+/g, '-');
     li.appendChild(a);
     toc.appendChild(li);
}