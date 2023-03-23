const express = require('express');
const cors = require('cors');
const { collection, getFirestore, getDocs, where, orderBy, addDoc, query, doc, setDoc, getDoc, updateDoc, documentId } = require("firebase/firestore");

const UserLogic = require('./controller/UserLogic.js');
const GetWattage = require('./controller/Wattage.js');
const Auth = require('./middleware/Auth.js');

//const db = require('./config.js');
require('dotenv').config();

const app = express();
app.use(express.json(),
        cors()
);

/*
app.post('/register', async (req,res)=>{
    const data = req.body; // displayName, emali, uid
    const {name, email, password} = data;
    await user.add(data);
})
dunno if this will be implemented
app.post('/login', (req,res)=>{

})*/

app.post('/calculate', Auth, async(req, res)=> {

    var appliances = req.body.appliances;
    var time = req.body.time;
    var state = req.body.state;
    var user = req.body.user;
    var wattage = req.body.wattage;
    console.log(req.body);

    var {uid, name, email, emailVerified} = user;

    // wattage is not there for certain items, then query item wattage from db
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

    if( (time && appliances) && (time.length == appliances.length) ){
        var result=[]

        for(i=0;i<appliances.length;i++){
            result[i] = wattage[i]*time[i]
        }

    }else{
        res.send({error: 'Please provide time and power'});
    }

    const status = await UserLogic(uid, name, email, state, result);

    function uselesscomment(){
        //var querySnapshot = await getDocs(query(dbRef));

    
    /*function find(){
        querySnapshot.forEach((doc) => {

            console.log(doc.ref);
            if(doc.id == uid){

                
                return true, docRef;
            }

        });
        return false, null;

    }

    if(existsValue){
        setDoc(dbRef, {
            appliances: appliances,
            time: time
        })
    }else{
        const docRef = await setDoc(doc(dbRef, `${uid}`), {
            name: "San Francisco",
            state: "CA",
            country: "USA"
        })
    }*/
    
    ///////////////////////////////////////////////////////////
    /*await setDoc(doc(dbRef, `84325637452`), {
        country: "Tajikisthan",
    }, {
        merge: true
    })*/

    // UserLogic.js - [ changes needed ]
    /*const snap = await getDoc(doc(db, 'users', `v8TtSxfOjSRR5PqCzQQM`));
    if(snap.exists()){
        await setDoc(doc(dbRef, `${uid}`), {
            state: state,
            power: result,
        }, {
            merge: true
        })
    }else{
        await setDoc(doc(dbRef, `${uid}`), {
            name: name,
            email: email,
            state: state,
            power: result           
        })
    }*/
    }

    res.send({status: status});

})

app.post('/inference', (req,res)=>{
    // model endpoint on azure 
        // data bricks, datawarehousing, kafka, autotraining
    
})

app.listen(process.env.PORT || 8080, (err)=>{
    console.log(`Server is running on Port ${process.env.PORT}`);
})

