
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true  
})

 
// const john = new User({
//     name:'Geonardo',
//     age:15
// })

// john.save().then(()=>{
//     console.log(john)
// }).catch((error)=>{
//     console.log(error)
// })