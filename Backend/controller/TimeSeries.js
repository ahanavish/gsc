const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc } = require("firebase/firestore");

module.exports = async function timeseries(uid) {

    // return day and engy
    const snap = await getDoc(doc(db, 'users', `${uid}`));
    const data = snap.data();
    var check;

    try {

        check = data.energy;
        if (check == undefined) {
            return false;
        }

    } catch (err) {
        return false
    }

    const dbref = collection(db, 'default')
    const docref = doc(dbref, 'NAPvgeEwIeKgfcR4QttS')
    const snap2 = await getDoc(docref);
    const data2 = snap2.data();

    console.log(data2.atav);
    console.log(data.energy);
    if(check != undefined){
        
        const state = data.state;
        console.log(state, ' state');
        const energy = data.energy;
        const day = energy.day;
        const engy = energy.engy;
        return {state, day, engy, data2};
    }

}