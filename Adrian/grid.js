function delElement(L,elem) {
    var LL=L.split(" ");
    var idx=LL.indexOf(elem);
    if(idx>=0){
        LL.splice(LL.indexOf(elem),1);
    };
    return LL.join(" ");
}
function delClass(obj,cls){
    var nc=delElement($(obj).attr("class"),cls);
    $(obj).attr("class",nc);
}
function addCl(obj,cls){
    var original=$(obj).attr("class")+" "+cls;
    $(obj).attr("class",original);
}

function stopAll() {
    $("button").removeClass("highlighted")
    $(".arrow").each(function(idx,item){$(item).hide();});
    $(".square").each(function(idx,item){
            delClass(item,"fast");
            delClass(item,"normal");
            delClass(item,"slow");
        });
    for (s in dipoles) {
        dipoles[s].transform("s1");
        dipoles[s].attr("stroke-width",1);
    };
//    $(".fast").removeClass("fast");
//    $(".normal").removeClass("normal");
//    $(".slow").removeClass("slow");
}
       
function equal() {
    stopAll();
    $("button#equal").addClass("highlighted")
    for (s in squares) {
        addCl(squares[s].node,"normal");
    }
}
function gradH(dir) {
    stopAll();
    if(dir>0){    $("button#Hp").addClass("highlighted");} 
    else {$("button#Hm").addClass("highlighted");}
    for (s in squares) {
        var C="normal"; var Sz="1";
        if(parseInt(s[0])==2+dir){C="fast";Sz="2";}
        if(parseInt(s[0])==2-dir){C="slow";Sz="0.5";}
        addCl(squares[s].node,C);
        dipoles[s].transform("s"+Sz);
    }
    if(dir>0) {arrows.right.attr("opacity",0).show().animate({opacity:1},800);} 
    else {arrows.left.attr("opacity",0).show().animate({opacity:1},800);}
}
function gradV(dir) {
    stopAll();
    if(dir>0){    $("button#Vp").addClass("highlighted");} 
    else {$("button#Vm").addClass("highlighted");}
    for (s in squares) {
        var C="normal";var Sz="1";
        if(parseInt(s[1])==2+dir){C="fast";Sz="2";}
        if(parseInt(s[1])==2-dir){C="slow";Sz="0.5";}
        addCl(squares[s].node,C);
        dipoles[s].transform("s"+Sz);
        dipoles[s].attr("stroke-width",1);
    }
    if(dir>0) {arrows.down.attr("opacity",0).show().animate({opacity:1},800);} 
    else {arrows.up.attr("opacity",0).show().animate({opacity:1},800);}
}
function gradX() {
    stopAll();
    $(".square.c1").each(function(idx,item){addCl(item,"slow");});
    $(".square.c2").each(function(idx,item){addCl(item,"normal");});
    $(".square.c3").each(function(idx,item){addCl(item,"fast");});
    $(".downarrow").each(function(idx,item){$(item).show(3000);});
    //show the arrows after a little delay
}

function gradY() {
    stopAll();
    $(".r1").each(function(idx,item){addCl(item,"slow");});
    $(".r2").each(function(idx,item){addCl(item,"normal");});
    $(".r3").each(function(idx,item){addCl(item,"fast");});
    $(".rightarrow").each(function(idx,item){$(item).show(3000);});
};
var swap=0;

function swapaxes(){
    stopAll();
    swap=(swap+1)%3;
//    var colors=["#920000","#004949","#490092"];
    var colors=["#920000","#24FF24","#490092"];
//    var colors=["#942CCF","#009973","#56B5E7"];
//    var colors=["red","chartreuse","blue"];
    var D=["x","y","z"];
    var n=swap;
    X.attr({"text":D[n],"fill":colors[n]}); 
    $(".x").html("<span style=\"color:"+colors[n]+"\">"+D[n]+"</span>");
    arrows.right.attr({"stroke":colors[n],fill:colors[n]});
    arrows.left.attr({"stroke":colors[n],fill:colors[n]});
    n=(n+1)%3;
    Y.attr({"text":D[n],"fill":colors[n]}); 
    $(".y").html("<span style=\"color:"+colors[n]+"\">"+D[n]+"</span>");
    arrows.up.attr({"stroke":colors[n],fill:colors[n]});
    arrows.down.attr({"stroke":colors[n],fill:colors[n]});
    n=(n+1)%3;
    Z.attr({"text":D[n],"fill":colors[n]}); 
    $(".z").html("<span style=\"color:"+colors[n]+"\">"+D[n]+"</span>");
}

var squares={}; //an object with elements labelled as "rc" for row/column
var dipoles={}; //dipole symbols
var arrows={}; //an object of groups labelled "right", "left", "up", "down"
var axes={}; 
var X; var Y; var Z;
var size=75; var gap=8;
function makeGrid() {
    paper=Raphael("canvas",500,400);
    for(r=1;r<=3;r++){
        for(c=1;c<=3;c++){
            var rt=r.toString(); var ct=c.toString();
            squares[rt+ct]=paper.rect(size*c,size*(4-r),size-gap,size-gap);
            squares[rt+ct].node.setAttribute("class","square r"+rt+" c"+ct);
            paper.setStart();
            paper.circle(size*c+(size-gap)/2,size*(4-r)+(size-gap)/2,10);
            paper.circle(size*c+(size-gap)/2,size*(4-r)+(size-gap)/2,3).attr("fill","black");
            dipoles[rt+ct]=paper.setFinish();
        }
    };
    //rightarrow
    var opacity=1;
    paper.setStart();
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              size-2*gap,2*size-gap/2,
                              3*size+4*gap,0
                   )).attr({"arrow-end":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow rightarrow");
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              size-2*gap,3*size-gap/2,
                              3*size+4*gap,0
                   )).attr({"arrow-end":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow rightarrow");
    arrows.right=paper.setFinish();
        //downarrow
    paper.setStart();
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              2*size-gap/2,size-2*gap,
                              0,3*size+4*gap
                   )).attr({"arrow-end":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow downarrow");
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              3*size-gap/2,size-2*gap,
                              0,3*size+4*gap
                   )).attr({"arrow-end":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow downarrow");
    arrows.down=paper.setFinish();
    //leftarrow
    paper.setStart();
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              size-2*gap,2*size-gap/2,
                              3*size+4*gap,0
                   )).attr({"arrow-start":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow leftarrow");
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              size-2*gap,3*size-gap/2,
                              3*size+4*gap,0
                   )).attr({"arrow-start":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow leftarrow");
    arrows.left=paper.setFinish();
        //uparrow
    paper.setStart();
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              2*size-gap/2,size-2*gap,
                              0,3*size+4*gap
                   )).attr({"arrow-start":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow uparrow");
    paper.path(Raphael.format("M{0},{1}l{2},{3}",
                              3*size-gap/2,size-2*gap,
                              0,3*size+4*gap
                   )).attr({"arrow-start":"classic-wide-long","stroke":"red","stroke-width":gap/2,"opacity":opacity}).node.setAttribute("class","arrow uparrow");
    arrows.up=paper.setFinish();
    $(".arrow").hide();
    //axes
    paper.setStart();
    paper.rect(250,150,50,50).attr({"fill":"white","stroke":""});
    paper.path("M250,200l50,0").attr({"stroke":"black","arrow-end":"classic-wide-long"});
    paper.path("M250,200l0,-50").attr({"stroke":"black","arrow-end":"classic-wide-long"});
    paper.path("M250,200l-15,25").attr({"stroke":"black","arrow-end":"classic-wide-long"});
    X=paper.text(300,215,"x"); 
    Y=paper.text(270,150,"y"); 
    Z=paper.text(220,230,"z"); 
    axes=paper.setFinish();
    axes.translate(140,0);
    axes.click(swapaxes);
    axes.attr({"stroke-width":"4px","font-size":"24px","font-family":"Times"});
    swap=-1;
    swapaxes();
}
$(function(){makeGrid();});

/*TODO
  Add dipoles
 */
