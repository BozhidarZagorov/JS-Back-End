import mongoose, { Schema, model } from 'mongoose';

const uri = 'mongodb://localhost:27017/studentsDb';

try {
    await mongoose.connect(uri);
    console.log('Connected to DB Successfully');
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}

// Setup mongoose schema
const studentSchema = new Schema({
    name: String,
    age: {
        type: Number,
        required: [true, 'This is required'],
        min: [18, 'Student age should at least 18 years old'],
        max: [120, 'Student age should be max 120 years old'],
    },
});

// Create custom instance method
// studentSchema.methods.getInfo = function () {
//     return `I am ${this.name}, and I'm ${this.age} years old!`;
// }
studentSchema.method('getInfo', function () {
    return `I am ${this.name}, and I'm ${this.age} years old!`;
})

// Create custom validation
// studentSchema.path('age').validate(function (age) {
//     return age >= 18 && age <= 120;
// });

// Create mongoose model
const Student = model('Student', studentSchema);

// Query all data from model
const students = await Student.find();
console.log(students);

// Specify Equality Condition
const filteredStudents = await Student.find({ age: 20 })
// const filteredStudents = await Student.find({age: {$eq: 20}})
console.log(filteredStudents);

// Insert data into db #1
// const newStudent = new Student({ age: 28, name: 'Ivo' });
// await newStudent.save();
// console.log(newStudent);

// Insert data into db #2
// const createdStudent = await Student.create({
//     name: 'Niki',
//     age: 19,
// });
// console.log(createdStudent);

// Get single student
const singleStudent = await Student.findOne({ age: 20 });
console.log(singleStudent);

// Using model custom method
console.log(singleStudent.getInfo());

// Failed custom validation
try {
    await Student.create({
        name: 'Test2',
        age: 12,
    });
} catch (err) {
    console.log(err.message);
}

// Update
await Student.updateOne({ name: 'Ivo', age: 28 }, { name: 'Ivaylo', age: 29 });


// Delete
await Student.deleteOne({ '_id': '678ea1e974439a7ce2c57616' });
// await Student.findByIdAndDelete('678ea1e974439a7ce2c57616')

// MongoDB query with $or operator
const resultStudents = await Student.find({
    $or: [
        { name: 'Ivo' },
        { age: { $lt: 20 } }
    ]
});
console.log(resultStudents);

// Mongoose query with or
const resultStudents2 = await Student.find()
    .or([
        { name: 'Ivo' },
        { age: { $lt: 20 } }
    ])
    // .select({ name: 1, _id: 0 })
console.log(resultStudents2);

