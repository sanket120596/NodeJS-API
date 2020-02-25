const { MongoClient, ObjectID } = require("mongodb");
//const MongoClient = mongodb.MongoClient

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      console.log("unable to coonnect to database");
    }

    const db = client.db(databaseName);

    //==========================================INSERT=============================================

    //insert single record
    // db.collection('users').insertOne({name:'sanket',age:23},(error,result)=>{
    //     if(error){
    //         console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // })

    //insert multiple records
    // db.collection('tasks').insertMany([{
    //     description : 'Cleaning the house',
    //     completed:true
    // },{
    //     description : 'Painting',
    //     completed:false
    // },{
    //     description : ' Pot plants',
    //     completed:true
    // }],(error,result)=>{
    //     if(error){
    //         console.log('unable to insert tasks');
    //     }
    //     console.log(result.ops);
    // })
//==================================================FIND==========================================

    //find one ie fetch first
    // db.collection('users').findOne({age:23},(error,user)=>{
    //     if(error){
    //         console.log('Unable to  fetch');
    //     }
    //     console.log(user)
    // })

    ///find one ie first record by _id
    // db.collection('users').findOne({_id: new ObjectID('5e4022520b41b43e307dd407')},(error,user)=>{
    //     if(error){
    //         console.log('Unable to  fetch');
    //     }
    //     console.log(user)
    // })

    //find all
    // db.collection('users').find({ name:'sanket'}).toArray((error,user)=>{
    //     if(error){
    //         console.log('Unable to  fetch');
    //     }
    //     console.log(user)
    // })

    //Find and return Count
    // db.collection('users').find({name:'sanket'}).count((error,result)=>{
    //     if(error){
    //         console.log('Unable to fetch count');
    //     }
    //     console.log(result);   //1
    // })

//=================================================UPDATE============================================

    //Update many records
    // db.collection("tasks")
    //   .updateMany(
    //     {
    //       completed: true
    //     },
    //     {
    //       $set: {
    //         completed: false
    //       }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    //Update one record
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("5e402155f806983c18ed6845")
    //     },
    //     {
    //       $set: { name: "Saurabh" }
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
//==================================================DELETE====================================================
    //Delete One
    // db.collection('users').deleteOne({age:15}).then((result)=>{
    //     console.log(result)
    // })

    // //Delete Many
    //   db.collection('users').deleteMany({age:15}).then((result)=>{
    //     console.log(result)
    // })
  }
);
