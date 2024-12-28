const express= require('express');
const app=new express();
const fs= require('fs');
const cors = require('cors');
app.use(cors());
let k=0;

var path='employee.json';
app.use(express.json());

app.get('/employee', (req, res) =>{ 
    fs.readFile(path, 'utf8', (err, data) => { 
        if (err) 
            return res.status(500).send('Error reading data'); 
        res.send(JSON.parse(data)); 
    }); 
});

app.get('/employee/:empname',(req,res)=>{

    fs.readFile(path,'utf8',(err,data)=>{
        if(err)
            return res.send('error reading data');
        else
        {
            var obj=JSON.parse(data);
            var flag=0;
            for(i=0;i<obj.length;i++)
            {
                if (obj[i].EmployeeName== req.params.empname)
                {
                    flag++;
                    res.send(obj[i]);
                }
            }
            if(flag==0)
            {
                res.send("not found");
            }
        }
        
        
    })
    // res.send("done");
});


app.post('/employee', (req, res) => { 
    fs.readFile(path, 'utf8', (err, data) => { 
        if (err)
            return res.status(500).send('Error reading data'); 
        const hospitals = JSON.parse(data); 
        hospitals.push(req.body); 

        fs.writeFile(path, JSON.stringify(hospitals, null, 2), (err) => { 
            if (err) return res.status(500).send('Error in writing data'); 
            res.send('Employee added successfully'); 
        });
     });
 });


 app.put("/employee/:name", (req, res) => {
    const employeeName = req.params.name; 
    const updatedDetails = req.body; 
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({ message: "Error reading the employee data." });
        }

        let employees;
        try {
            employees = JSON.parse(data); 
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).json({ message: "Error parsing employee data." });
        }

        const employeeIndex = employees.findIndex(emp => emp.EmployeeName === employeeName);

        if (employeeIndex === -1) {
            return res.status(404).json({ message: "Employee not found." });
        }

      
        employees[employeeIndex] = {
            ...employees[employeeIndex],
            ...updatedDetails, 
        };


        fs.writeFile(path, JSON.stringify(employees, null, 2), "utf8", (writeErr) => {
            if (writeErr) {
                console.error("Error writing to the file:", writeErr);
                return res.status(500).json({ message: "Error updating the employee data." });
            }

            res.status(200).json({ message: "Employee details updated successfully.", employee: employees[employeeIndex] });
        });
    });
});


app.delete("/employee/:name", (req, res) => {
    const employeeName = req.params.name; // Get employee name from URL parameter

    // Read the JSON file
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({ message: "Error reading the employee data." });
        }

        let employees;
        try {
            employees = JSON.parse(data); // Parse JSON file content
        } catch (parseErr) {
            console.error("Error parsing JSON:", parseErr);
            return res.status(500).json({ message: "Error parsing employee data." });
        }

        // Find the employee by name
        const employeeIndex = employees.findIndex(emp => emp.EmployeeName === employeeName);

        if (employeeIndex === -1) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Remove the employee from the list
        employees.splice(employeeIndex, 1);

        // Write updated data back to the JSON file
        fs.writeFile(path, JSON.stringify(employees, null, 2), "utf8", (writeErr) => {
            if (writeErr) {
                console.error("Error writing to the file:", writeErr);
                return res.status(500).json({ message: "Error updating the employee data." });
            }

            res.status(200).json({ message: "Employee deleted successfully." });
        });
    });
});



app.listen(3000,()=>{
    console.log("Server is running at PORT 3000");
})