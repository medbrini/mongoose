const mongoose = require('mongoose');
const  Person = require("./model");


// connoction to Database
const conncectDB = async () => {
    try {
        const db = await mongoose.connect (process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true ,
        });
        console.log(`MongoDB connceted from ${db.connection.host}`);
    }
    catch (error) {
        console.error(error);
    }

};

conncectDB();

//Create and Save a Record of a Model:
const person = new Person ({
    name: 'Bacem',
    age : 35 ,
    favoriteFoods  :["Rez", "Paila"] ,
});

Person.create()
.then ((data) => {
    if (data === person) console.log("Insertion Valid");
})
.catch(error => { 
    console.error(error);
 });


 //Create Many Records with model.create()

 Person.insertMany([
    { name: "Ali", age: 25, favoriteFoods: ["Tacos", "Pizza"] },
    { name: "Sameh", age: 32, favoriteFoods: ["Suchi", "Salad Cesar", "Kabeb"] },
    { name: "Nessrine", age: 20, favoriteFoods: ["Sandwich", "Grillet"] },
    { name: "Salem", age: 54, favoriteFoods: ["Kouskous", "Riz"] },
])
.then((data) => {
  console.log("Records created:", data);
})
.catch((error) => {
  console.error(error);
});


  //Use model.find() to Search Your Database
  
    Person.find({name :"Sameh"})
      .then((data) => {
        console.log( "Result is :" , data);
      })
      .catch((err) => {
        console.error(err);
      });

      //Use model.findOne() to Return a Single Matching Document from Your Database
       
     Person.findOne({favoritedFoods:"Tacos"})
      .then((data) => {
        console.log( "Result is :" , data);
      })
      .catch((err) => {
        console.error(err);
      });


      //Use model.findById() to Search Your Database By _id
      Person.findById("id")
      .then((data) => {
        console.log( "Result is :" , data);
      })
      .catch((err) => {
        console.error(err);
      });

      //Perform Classic Updates by Running Find, Edit, then Save

      Person.findById("id")
  .then((data) => {
    data.favoritedFoods.push("hamburger");
    data.save();
    console.log("Person Updatedet , edited and saved");
  })
  .catch((err) => {
    console.error(err);
  });


  //Perform New Updates on a Document Using model.findOneAndUpdate()

  Person.findOneAndUpdate({name : "Bacem"},{$set : {age :32}})
  .then((data) => {
    console.log( "Person's age updated with succes")
  })
  .catch((err) => {
    console.error(err);
  });

  //Delete One Document Using model.findByIdAndRemove

  Person.findByIdAndRemove("id")
  .then((data) => {
    console.log("Persone Deleted");
  })
  .catch((error) => {
    console.error(error)
  });


  //MongoDB and Mongoose - Delete Many Documents with model.remove()

  Person.deleteOne({name : "Salem"})
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
});


  //Chain Search Query Helpers to Narrow Search Results

  Person.find({favoritedFoods : "burritos"})
  .sort({name : 1})
  .limit(2)
  .select("-age")
  .exec((err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});