const students = [
    {
        name: "superwoman",
        marks: 90
    },
    {
        name: "flash",
        marks: 70
    },
    {
        name: "batman",
        marks: 77
    },
    {
        name: "superman",
        marks: 60
    },
    {
        name: "arrow",
        marks: 94
    }
]

// Q1: Sort all the students by marks from highest to lowest using sort method
var sortedStudents = students.sort(function (a, b) { return b.marks - a.marks });
console.log(sortedStudents);

// Q2: Filter and display all the students with marks greater than 80 using filter method
var filteredStudents = students.filter(function (student) {
    return student.marks > 80;
})
console.log(filteredStudents);

// Q3: Create a new array from the array above in which the marks of all studetns is 5 more than current marks using map method.
var mappedStudents = filteredStudents.map(function (student) {
    return student.marks + 5;
})
console.log(mappedStudents);