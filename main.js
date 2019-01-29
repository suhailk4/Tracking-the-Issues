
// document.getElementById('myForm').addEventListener('submit',saveIssues);

function saveIssues()
{


       var issueId=chance.guid();
       var issueDesc=document.getElementById('issueDescriptionInput').value;
       var issueSeverity=document.getElementById('issueSeverityInput').value;
       var issueAssignedTo=document.getElementById('issueAssignedToInput').value;
       var issueStatus="open";


               if(!issueDesc || !issueAssignedTo)
               {

                 alert("Please Fill the Form");
                 return false;
               }








       var issue={
         id:issueId,
         description:issueDesc,
         severity:issueSeverity,
         assignedTo:issueAssignedTo,
         status:issueStatus



       };


         if(localStorage.getItem("issues")===null)
         {
                var issues=[];
                issues.push(issue);
                localStorage.setItem("issues",JSON.stringify(issues));

         }
         else{

                 var issues=JSON.parse(localStorage.getItem("issues"));
                 issues.push(issue);
                 localStorage.setItem("issues",JSON.stringify(issues));

         }

  document.getElementById('myForm').reset();
  fetchIssues();


};




       function setStatusClosed(id){


           var issues=JSON.parse(localStorage.getItem("issues"));
           issues.forEach((issue)=>{
           if(issue.id==id)
           {
             issue.status="closed";
           }

           localStorage.setItem("issues",JSON.stringify(issues));

       });

      fetchIssues();
    };


  var deleteIssue=(id)=>{

                  if(confirm('Are you sure','yes'))
                  {


      var issues=JSON.parse(localStorage.getItem('issues'));

       issues.forEach((issue,i)=>{


                     if(issue.id===id)
                     {

                         issues.splice(i,1);

                     }


       });



       localStorage.setItem('issues',JSON.stringify(issues));
        fetchIssues();
      }
      else {
          return false;



      }
}

function fetchIssues()
{
           var issues=JSON.parse(localStorage.getItem("issues"));
           var issueList=document.getElementById("issueList");
           issueList.innerHTML="";

           issues.forEach((issue)=>{





                         issueList.innerHTML+=`<div class="well"> <h6> ISSUE ID: ${issue.id} </h6>
                         <p><span class="label label-info"> ${issue.status} </span> </p>
                         <h3> ${issue.description}</h3>
                         <p> <span class="glyphicon glyphicon-time" ></span>${issue.severity} </p>
                         <p > <span class="glyphicon glyphicon-user"></span> ${issue.assignedTo} </p>
                         <a href="#" onclick="setStatusClosed('${issue.id}')" class ="btn btn-warning">
                         Close </a>
                         <a href="#" onclick="deleteIssue('${issue.id}')" class ="btn btn-danger">
                         Delete </a>
                         </div>`;




});

};
