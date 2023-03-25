const express = require('express');
const cors = require('cors');
const { collection, getFirestore, getDocs, where, orderBy, addDoc, query, doc, setDoc, getDoc, updateDoc, documentId } = require("firebase/firestore");

const UserLogic = require('./controller/UserLogic.js');
const GetWattage = require('./controller/Wattage.js');
const Auth = require('./middleware/Auth.js');
const test = require('./translator.js');
const Init = require('./controller/SetInit.js');
const Values = require('./controller/Values.js');
const IsExist = require('./controller/IsExist.js');
const GetProfile = require('./controller/Dashboard.js');

//const db = require('./config.js');
require('dotenv').config();

const app = express();
app.use(express.json(),
        cors()
);

app.post('/calculate', Auth, async(req, res)=> {

    // user form & user session data variables
    const appliances = req.body.appliances;
    var time = req.body.time;
    const state = req.body.state;
    const user = req.body.user;
    const wattage = req.body.wattage;
    const members = req.body.members;
    console.log(req.body);

    // nesting user session variable
    var {uid, name, email, emailVerified} = user;

    // wattage queried from the DB
    const def = await GetWattage();

    console.log(wattage);

    for(let i=0; i<appliances.length; i++){
        time[i] = time[i]*24*30;
        if(wattage[i] == null){
            let ap = appliances[i]

            let value = def[ap];

            wattage[i] = value;
        }
    }

    var result=[];
    if( (time && appliances) && (time.length == appliances.length) ){

        for(i=0;i<appliances.length;i++){
            result[i] = wattage[i]*time[i]
        }

    }else{
        res.send({error: 'Please provide time and power'});
    }
    console.log(result, 'result');
    // if the state , members is not entered, then it returns false, frontend logic to redirect to initial 
    const status = await UserLogic(uid, appliances, result);

    res.send({status: status});
})

app.post('/inference', Auth, async (req,res)=>{
    const result = await Values(req.body.user.uid);
    console.log(result);
    const data = await test(result);
    res.send({status: true, data: data});
})

app.get('/isexist', async(req,res)=>{
    console.log(req.query.uid, 'uid');
    const status = await IsExist(req.query.uid); // req.params.uid is used in the url as a parameter

    res.send({status: status})
})

app.post('/initial', Auth, async (req,res)=>{
    var members = req.body.members
    var state = req.body.state
    var {uid, name, email, emailVerified} = req.body.user;
    
    // retrives bool value to check if user already exists in DB, if it does then returns true, where frontend logic is handled to redirect to dashboard
    // returns false if user doesnt exists
    var status = await Init(uid, name, email, state, members);

    res.send({status: status});
})

app.get('/profile', async (req,res)=>{
    const uid = req.query.uid;
    const profile = await GetProfile(uid);
    res.send({data:profile});
});

app.listen(process.env.PORT || 8080, (err)=>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})

