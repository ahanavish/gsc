const cors = require('cors');
const express = require('express');
const { collection, getFirestore, getDocs, where, orderBy, addDoc, query, doc, setDoc, getDoc, updateDoc, documentId } = require("firebase/firestore");

const Auth = require('./middleware/Auth.js');
const translator = require('./translator.js');
const Init = require('./controller/SetInit.js');
const Values = require('./controller/Values.js');
const IsExist = require('./controller/IsExist.js');
const GetWattage = require('./controller/Wattage.js');
const UserLogic = require('./controller/UserLogic.js');
const GetProfile = require('./controller/Dashboard.js');
const GetTimeSeries = require('./controller/TimeSeries.js');
const UpdateUserProfile = require('./controller/UpdateProfile.js');

require('dotenv').config();
const app = express();
app.use(express.json(),
    cors()
);

app.post('/calculate', Auth, async (req, res) => {

    // user form & user session data variables
    const appliances = req.body.appliances;
    var time = req.body.time;
    const state = req.body.state;
    const user = req.body.user;
    const wattage = req.body.wattage;
    const members = req.body.members;
    console.log(req.body);

    // console.log(...time);
    var maxVal = 0;
    var index = -1;
    for (var i = 0; i < time.length; i++) {
        if (time[i] > maxVal) {
            maxVal = time[i];
            index = i;
        }
    }
    //const maxVal = Math.max(...time);
    // console.log(maxVal);
    // console.log(index);
    const MaxDuration = appliances[index];

    console.log(MaxDuration, 'maxdur');

    // nesting user session variable
    var { uid, name, email, emailVerified } = user;

    // wattage queried from the DB
    const def = await GetWattage();

    // console.log(wattage, ' wattage');

    for (let i = 0; i < appliances.length; i++) {
        time[i] = time[i];
        if (wattage[i] == "") {
            let ap = appliances[i]

            let value = def[ap];

            wattage[i] = value;
        }
    }

    var result = [];
    // console.log('result ', result);
    if ((time && appliances) && (time.length == appliances.length)) {

        for (i = 0; i < appliances.length; i++) {
            result[i] = (wattage[i] * time[i]) //Watt hour
        }

    } else {
        res.send({ error: 'Please provide time and power' });
    }
    // console.log(result, 'result');

    const maxVal2 = Math.max(...result);
    // console.log(maxVal2, 'maxVal2');
    const index2 = result.indexOf(maxVal2);
    // console.log(index2, 'index2');
    const MaxPower = appliances[index2];
    console.log(MaxPower, 'MaxPower');

    // if the state , members is not entered, then it returns false, frontend logic to redirect to initial 
    const status = await UserLogic(uid, appliances, result, MaxDuration, MaxPower);

    res.send({ status: status });

})

app.post('/inference', Auth, async (req, res) => {

    const result = await Values(req.body.user.uid);
    console.log(result, "nodejs");
    const data = await translator(result);
    console.log(data, 'data2 nodejs');

    return res.json({ data: data });

})

app.post('/initial', Auth, async (req, res) => {

    var members = req.body.members
    var state = req.body.state
    var { uid, name, email, emailVerified } = req.body.user;

    // retrives bool value to check if user already exists in DB, if it does then returns true, where frontend logic is handled to redirect to dashboard
    // returns false if user doesnt exists
    var status = await Init(uid, name, email, state, members);

    res.send({ status: status });

})

app.get('/isexist', async (req, res) => {

    console.log(req.query.uid, 'uid');
    const status = await IsExist(req.query.uid); // req.params.uid is used in the url as a parameter

    res.send({ status: status });

})

app.get('/profile', async (req, res) => {

    const uid = req.query.uid;
    const profile = await GetProfile(uid);
    res.send({ data: profile });

});

app.get('/timeseries', async (req, res) => {

    const uid = req.query.uid;
    // console.log(uid);
    const data = await GetTimeSeries(uid);
    res.send({ data: data });

})

app.get('/billers', async (req, res) => {
})

app.post('/inference', Auth, async (req, res) => {
    try {
        const result = await Values(req.body.user.uid);
        const flaskUrl = 'http://flask-app:5000/';

        const data = await request.post(flaskUrl, { json: result });
        return res.json({ data: data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/transaction', Auth, async (req, res) => {
    try {
        const requests = req.body;

        const payurl = 'https://zuelpay.com/api/utility/billpay/transaction ';

        const data = await request.post(payurl, { json: requests });
        console.log(req.body)
        console.log(data)
        return res.json({ data: data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/fetchbill', Auth, async (req, res) => {
    try {
        const r = req.body

        const payurl = 'https://zuelpay.com/api/utility/billpay/transaction ';

        const data = await request.post(payurl, { json: requests });
        console.log(req.body)
        console.log(data)
        return res.json({ data: data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.patch('/updateprofile', Auth, async (req, res) => { // PUT is to update the whole document, PATCH is to update a part of the document
    // console.log(req.body);
    const { name } = req.body.name;
    const { state } = req.body.state;
    const { num_members } = req.body.num_members;

    const { uid } = req.body.user;

    const result = await UpdateUserProfile(uid, name, state, num_members);

    return res.json({ status: result })
})

app.listen(process.env.PORT || 8080, (err) => {
    console.log(`Server is running on Port ${process.env.PORT}`);
})

