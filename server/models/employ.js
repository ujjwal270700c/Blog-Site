const mongoose =require('mongoose');

const employSchema = new mongoose.Schema({
    employee_name: String,
    employee_salary: Number,
    employee_age: Number,
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostEmploy', employSchema);

module.exports =PostMessage;