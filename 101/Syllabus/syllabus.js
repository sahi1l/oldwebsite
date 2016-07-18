var duh;var arrow;
var opensymbol="&#9660;"
var closedsymbol="&#9654;"
$(function(){
var cno=$("#courseNumber").html()
$("#toc").append('<div id="courseNumber"><a href="../index.html">'+cno.slice(0,cno.indexOf("<"))+'</a></div>')
//$("#toc").append('<div id="courseNumber">'+cno.slice(0,cno.indexOf("<"))+'</div>')
$("#toc").append("<ul></ul>")
$("h3>a").each(function(i,el){
var s=$(this).attr("name");
var str='<li><a href="#'+s+'">'+s+'</a></li>'
$("#toc>ul").append(str);
});
$("#toc").append('<div id="hideall">Collapse</div><div id="showall">Expand</div>')
var triggerall=function(btn,boo){
    $(".switch").prop("checked",boo).trigger("click");
    $(btn).fadeOut(100).fadeIn(100);
};
$("#showall").click(function(){triggerall(this,false);});
$("#hideall").click(function(){triggerall(this,true);});
//$("#showall").click(function(){$(".switch").prop("checked",false).trigger("click");});
//$("#hideall").click(function(){$(".switch").prop("checked",true).trigger("click");});
$('h3').prepend('<span class="switch">'+opensymbol+'</span>');
$('h3>span').prop("checked",true);
$('.switch').click(function(){
that=$(this);
that.animate({"font-size":"14px"},100).animate({"font-size":"18px"},100);
arrow=$(this).html();
var div=$(this).parent().next();
console.log(that.prop("checked"));
if(that.prop("checked")){
     div.hide();
     that.html(closedsymbol);
     that.prop("checked",false);
} else {
     div.show();
     that.html(opensymbol);
     that.prop("checked",true);
}
});
});
