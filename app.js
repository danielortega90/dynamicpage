const { application } = require("express");
const express = require("express");
const path = require(`path`);
const mongoose = require(`mongoose`);
//Traer los modelos
let Game = require(`./models/db`)
//init App
const app = express();
//base de datos
mongoose.connect(`mongodb://127.0.0.1:27017/game`);
let db = mongoose.connection;
//Conectado a db
db.once(`open`, () => {
    console.log(`Conectado a db`);
});

// Error de la bd
db.on(`error`, (err) => {
    console.log(err);
});
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





//view
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);
//route


app.get("/", (req, res) => {

    res.render(`index`, {
        title: `Gamers`
    });

});
app.get(`/createGame/:id1/:id2/:id3`,async (req, res) => {

    const {id1,id2,id3} = req.params;
    const users = await Game.findByIdAndUpdate(id1);
    const users2 = await Game.findByIdAndUpdate(id2);
    const users3 = await Game.findByIdAndUpdate(id3);
    res.status(200).render("createGame",{users: users.name,users2,users3,id1,id2,id3});

})
app.get(`/game/:id1/:id2/:id3`,async (req, res) => {
    const {id1,id2,id3} = req.params;
    let  ganador;
    
    
     const pon =Math.ceil(Math.random()*6);
     const pon1 =Math.ceil(Math.random()*6);
     const pon2 =Math.ceil(Math.random()*6);
     
     const users = await Game.findByIdAndUpdate(id1,{points:pon});
     const users2 = await Game.findByIdAndUpdate(id2,{points:pon1});
     const users3 = await Game.findByIdAndUpdate(id3,{points:pon2});
     
     if(pon>pon1 && pon>pon2){
      ganador =  users; 
     } else if(pon1>pon && pon1>pon2)
     {
       ganador =users2;
     }else{
        ganador=users3;
     }
     let  inProgress = false;

     
     
    res.status(200).render("game",{users,users2,users3,winners: ganador.name,inProgress: inProgress,pon,pon1,pon2});
    
});
app.post(`/winners`,(req,res)=>{
    const {winners}=  req.body;
    res.render("winners",{winners});
})
app.post("/show", async (req, res) => {
    const { usuario1, usuario2, usuario3 } = req.body;


    const gamers = await Game.insertMany([{ name: usuario1 }, { name: usuario2 }, { name: usuario3 }]);
    
    res.status(200).redirect(`/createGame/${gamers[0]._id}/${gamers[1]._id}/${gamers[2]._id}`);
});
app.post("/startGame",(req,res)=>{
     const {users,users1,users2}=req.body;
     
    res.render("startGame",{users,users1,users2});
})
app.post("/add", async (req, res) => {
    
    const { id1, id2, id3} = req.body;
    console.log(id1,id2,id3);
   
    
    res.status(200).redirect(`/game/${id1}/${id2}/${id3}`);
});
app.listen(3000, () => {
    console.log("server running on port ", 3000);
});


