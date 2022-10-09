const express = require('express');
const PORT = process.env.PORT || 3000
const mongoose  = require('mongoose'); 
const bodyParser = require('body-parser');
const ejs = require('ejs');

const dataSchema = require('./models/Schema')
const app = express();

const base  = `${__dirname}/views`;

app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set(  {"Allow-access-Allow-Origin": '*'});



let DatabaseURL = 'mongodb+srv://souravsharma:Mongodb001@sit314.ainmhmk.mongodb.net/myDatabase?retryWrites=true&w=majority';
const connectParameters = {
    useNewURLParser: true,
    useUnifiedTopology: true
}

mongoose.connect(DatabaseURL, connectParameters).then(()=> {
    console.log('Connected to Database');
}).catch( (error) =>{
    console.log('Error is: ' + error);
});



app.get('/', (req,res) =>{
    res.render('Buildings');
   
})

app.get('/buildings', (req,res) =>{
    res.render('Buildings');
})
app.get('/led', (req,res) =>{
    
    dataSchema.findOne({}, function(err,ledspage){
        res.render('led', {
            numberled: ledspage.LedNumber
        })
    } ).sort({$natural:-1});
})


app.get('/*', (req, res) => {
    res.render('404');
});


app.post("/led",(req,res)=>{
    var FloorId = req.body.floorNumber;
    var ledNumber = req.body.ledNumber;

    var newData = new dataSchema({
        id: FloorId,
        LedNumber: ledNumber
    });

    
    newData.save().then(data =>{
        console.log(data);
    })

    return res.render('Buildings');

})



app.listen(PORT ,() =>{
    console.log(`Listening on port: ${PORT}`);
});