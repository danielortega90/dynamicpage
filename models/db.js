let mongoose = require(`mongoose`);

//Esquema 

let gamers= mongoose.Schema({
    name:{
        type: String,
        required :true
    },
    ingame:{
        type: Boolean,
        default: true
    },
    points:{
        type:Number,
        default: 0
    }
   
});

let Game = module.exports = mongoose.model(`Gamer`,gamers);