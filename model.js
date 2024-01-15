let mongoose = require('mongoose');

let PersonSchema = new mongoose.Schema ({

    name:{
        type: String ,
        reqiured : true
    },

    age : Number ,

    favoritedFoods : [String]

})

module.exports = mongoose.model('Person' , PersonSchema)