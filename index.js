const express = require("express");
require("./mongoose");

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const Task = require('./models/task')
const User = require('./models/user')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const main = async() =>{
  // const task = await Task.findById('5e522a3075c5b92d749249f3')
  // await task.populate('owner').execPopulate()

  //  const user = await User.findById('5e5208fe404d723f183bf19c')
  //  await user.populate('tasks').execPopulate()
 // console.log(user)
}

main()
 
app.listen(port, () => {
  console.log("Server is running on port "+port);
});



 
