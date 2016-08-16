#!/usr/local/bin/python
from __future__ import division;
from sys import argv;
def convert(c1,c2,alpha):
    return c1+(c2-c1)*alpha
def mix(c1,c2,alpha):
    result=[0,0,0];
    S="#";
    for i in [0,1,2]:
        result[i]=convert(c1[i],c2[i],alpha)
        S+=format(int(result[i]),'02x');
    return S

#base=(0xfa,0xc7,0x23);
base=(255,128,0);
if(len(argv)>3):
    base=(int(argv[1]),int(argv[2]),int(argv[3]))
white=(255,255,255);
dark=mix(base,white,0x22/0xff); #2a3 or so
lvle=mix(base,white,0xee/0xff);  #"#efe"; 
lvld=mix(base,white,0xdd/0xff);  #"#dfd";
lvlc=mix(base,white,0xcc/0xff); #"#cfc";
lvlb=mix(base,white,0xbb/0xff); #"#bfb";
lvl7=mix(base,white,0x77/0xff); #"#7f7";
textshadow=mix(base,(0,0,0),0.5); 
shadow=mix(base,(227,210,227),0.75); #"#ada";
rotbase=(0.5*(255+base[1]),0.5*(255+base[2]),0.5*(255+base[0]))
curdark=mix(rotbase,white,0.0)
curlight=mix(rotbase,base,0.3)
grad=mix(base,white,0x99/0xff);
def duh(S):
    return str(int(S,16))
grad=duh(grad[1:3])+","+duh(grad[3:5])+","+duh(grad[5:7])
#grad="0x"+grad[1:3]+",0x"+grad[3:5]+",0x"+grad[5:7]
#curdark=(base[1],base[2],base[0])
#curlight=mix(base,curdark,0.5)
#curlight=mix(base,(0,1,1),0xaa/0xff);#,"#aff";
#curdark=mix(base,(0,1,1),0xbb/0xff); #"#bdd";
#print rotbase
#print curdark
#print curlight
print """
div#middle>div,
div.class #name,
body.Syllabus #courseName
{/*dark*/
    background-color:                           %s;
}
body.Syllabus #courseNumber
{/*dark*/
    color: %s;
}
body {/*lvle*/
     background-color:                          %s;
}


div#professor li:nth-child(odd),
div#assignments tr>th:nth-child(odd),
div#assignments tr>td:nth-child(odd)
{/*lvld*/
     background-color:                            %s;
}

div#news li:nth-child(odd),
div#assignments tr>td:nth-child(even),
div#assignments tr>th:nth-child(even),
div.class,
body.Syllabus ul.schedule li.exam,
body.Syllabus table.gradescale tr:nth-child(3) td
{/*lvlb*/
     background-color:                            %s;
}

div#news li:nth-child(even) {/*lvl7*/
	background-color: %s;
}

div.class,
div#professor,
div#news,
div#assignments,
div#assignments table,
#syllabus,
#gradeframe
{ /*shadow*/
    box-shadow: 5px 5px 5px                     %s;
}


/*current*/
tr.current td:nth-child(odd) {/*curlight*/
    background-color:                           %s !important;
}
tr.current td:nth-child(even) {/*curdark*/
    background-color:                           %s !important;
}
#syllabus {/*textshadow*/
text-shadow: 0px 0px 5px %s; font-weight:900;}

body.Syllabus h3 {/*grad,grad*/
background: transparent linear-gradient(to right,rgb(%s),rgba(%s,0));
};
body.Syllabus #toc a {color:%s}
body.Syllabus #toc a:visited {color:%s}
""" % (dark,dark,lvle,lvld,lvlb,lvl7,shadow,curlight,curdark,textshadow,grad,grad,dark,lvl7);

#TODO: Make TOC links match in color
