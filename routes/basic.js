const express = require('express');
const router = express.Router();

// Sample Database (Array of Objects)
let employees = [
    { id: 1, name: 'Rahul', designation: 'Software Engineer', location: 'Kochi', salary: 75000 },
    { id: 2, name: 'Vaishakh', designation: 'Product Manager', location: 'Kochi', salary: 95000 }
];


router.get('/', (req, res) => {
    res.render('index', { employees });
});


router.get('/add', (req, res) => {
    res.render('add');
});


router.post('/add', (req, res) => {
    const { name, designation, location, salary } = req.body;
    const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    employees.push({ id, name, designation, location, salary: parseInt(salary) });
    res.redirect('/');
});


router.get('/edit/:id', (req, res) => {
    const employee = employees.find(emp => emp.id === parseInt(req.params.id));
    res.render('edit', { employee });
});


router.post('/edit/:id', (req, res) => {
    const { name, designation, location, salary } = req.body;
    const id = parseInt(req.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    employees[employeeIndex] = { id, name, designation, location, salary: parseInt(salary) };
    res.redirect('/');
});


router.post('/delete/:id', (req, res) => {
    employees = employees.filter(emp => emp.id !== parseInt(req.params.id));
    res.redirect('/');
});

module.exports = router;
