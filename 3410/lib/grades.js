var gradeshowing=0;
ShowGrade=function(data){
    if(gradeshowing){
	gradeshowing=0;
	$("#grades").hide(50);
	return;
    }
    rows=$.trim(data).split("\n");
    
    if (rows.length<2) {
	$("#grades").html("<B><I style=\"color:red;background-color:white;\">I couldn't find that ID.  Try again.</I></B>");
        
    } else {
	var header=$.trim(rows[0]).split("\t").slice(1);
	var grades=$.trim(rows[2]).split("\t").slice(1);
	var result;
	if(header.length==0){result="There are no grades yet!";}
	else {
	    gradeshowing=1;
            result="<TABLE class=\"Gtbl\"><TR><TD><TABLE class=\"Gtbl\">";
            var nextmatch=["Q","H"];
	    var anygrades=0;
            for(i=0;i<header.length;i++){
                var check=nextmatch.indexOf(header[i][0]);
                if(check>=0){
                    nextmatch.splice(check,1);
                    result+="</TABLE><TD><TABLE class=\"Gtbl\">";
                }
		if(grades[i] != undefined && grades[i]!=""){
		    anygrades=1;
		    result+="<TR><TD class=\"Ghdr\">"+header[i]+":<TD class=\"Gdata\">"+grades[i].replace(".0","");
		}
            }
	    if(!anygrades){result="<B style=\"color:green\">There are no grades yet!</I>";} else {
		result+="</TABLE>";
	    }
        }
		result+="<DIV style=\"font-size:70%\">A grade of E means \"excused\". <BR>Missed assignments get a zero.<BR>If an assignment doesn't appear, the website hasn't been updated yet.</DIV>";
        $("#grades").html(result);
    }
	$("#grades").show(50);
};
GetGrade=function(){
    $.get("grades.txt").fail(function(){
	    $("#grades").html("<B><I style=\"color:red\">Grades aren't ready yet!</I></B>");$("#grades").show(50);}).done(
															   function(){
    $.get("grades.pl",{id:$("#gradeid").val()},
	  function(data){ShowGrade(data);} 
	  ,"text")});

};

