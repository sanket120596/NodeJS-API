const express =  require('express')
const router = new express.Router()

const auth = require('../middleware/auth')

const Task = require('../models/task')


router.post('/task',auth,async(req,resp)=>{
      const task = new Task({
          ...req.body,
          owner: req.user._id
      })

      try {
          await task.save()
          resp.status(200).send()
      } catch (error) {
          console.log(error)
          resp.status(400).send()
      }
}) 

router.get('/tasks',auth,async(req,resp)=>{
    try {
        const tasks = await Task.find({owner:req.user._id})
      
        var taskArray = await Promise.all(tasks.map(async t => {
            return await t.populate('owner').execPopulate()
        }));

        resp.status(200).send(taskArray)
    } catch (error) {
        console.log(error)
        resp.status(400).send(tasks)
    }
  
})

module.exports = router