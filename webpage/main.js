var arrCheckList=[];
var count=0;
var emp=0;

async function fetchEmployeeData() 
{
    try {
      const response = await fetch('http://localhost:3000/employee'); 
      if (!response.ok) 
        {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
      else
        {
        const result = await response.json(); 
        let table=document.getElementById('tdata');
  
        for(i=0;i<result.length;i++)
        {
            
        var row=table.insertRow(i+1);
        var cell1=row.insertCell(0);
        cell1.innerText=result[i].EmployeeName;
        var cell2=row.insertCell(1);
        cell2.innerText=result[i].EmployeeDesignation;
        var cell3=row.insertCell(2);
        cell3.innerText=result[i].EmployeeLocation;
        var cell4=row.insertCell(3);
        cell4.innerText=result[i].Salary;
        var cell5=row.insertCell(4);
        updateButton(cell5,i,result[i]);
        var cell6=row.insertCell(5);
        deleteButton(cell6,i);
        }
        }
    }
    catch (error) 
    {
      console.error('Error fetching data:' + error);
    }
  }

  function updateButton(cell,j,details)
  {
     var bttn= document.createElement("input");
     bttn.id="incheck"+j;
     bttn.type="button";
     bttn.value="update";

     cell.appendChild(bttn);
     
     bttn.addEventListener('click',()=>{
        emp=details;
        window.location.href = `update.html?id=${j}`;
        
        
        
     });
  }
  function deleteButton(cell,j)
  {
     var bttn= document.createElement("input");
     bttn.id="incheck"+j;
     bttn.type="button";
     bttn.value="delete";
     cell.appendChild(bttn);
     bttn.addEventListener('click',()=>{
        window.location.href = `delete.html?id=${j}`;
    });
  }

 async function show()
  {
    try {
        let response = await fetch('http://localhost:3000/employee'); 
        if (!response.ok) 
          {
          throw new Error(`HTTP error! status: ${response.status}`);
          }
        else
        {
            const urlParams = new URLSearchParams(window.location.search);
            const empid = urlParams.get('id');
            const empdata = await response.json();
            var blah=empdata[empid].EmployeeName;
            console.log(blah);
            document.getElementById('n').value=empdata[empid].EmployeeName;
            document.getElementById('d').value=empdata[empid].EmployeeDesignation;
            document.getElementById('l').value=empdata[empid].EmployeeLocation;
            document.getElementById('s').value=empdata[empid].Salary;

            
        }
    }
    catch(w)
    {
        console.log(w);
    }
  }


async function update() {
    
    const employeeName = document.getElementById("n").value.trim();
    const designation = document.getElementById("d").value.trim();
    const location = document.getElementById("l").value.trim();
    const salary = document.getElementById("s").value;

    if (!employeeName) {
        alert("Employee name is required!");
        return;
    }


    const updatedDetails = {};
    if (designation) updatedDetails.EmployeeDesignation = designation;
    if (location) updatedDetails.EmployeeLocation = location;
    if (salary) updatedDetails.Salary = parseFloat(salary);

    try {

        let response = await fetch(`http://localhost:3000/employee/${employeeName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDetails)
        });
        console.log(response);
        const data = await response.json();
        console.log("putdgdgd")
        if (response.status=="200") {
            alert("updated successfully");
        } else {
            alert("updation failed");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
    }
    
}



async function deleteEmp(){
    
    const employeeName = document.getElementById("n").value.trim();
    console.log(employeeName)

    if (!employeeName) {
        alert("Employee name is required!");
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/employee/${employeeName}`, 
            {
            method: "DELETE"
        });

        const result = await response.json();
    } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
    }
}
