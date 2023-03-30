const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function timeseries(uid){
    
    // return day and engy
    const snap = await getDoc(doc(db, 'users', `${uid}`));
    const data = snap.data();
    var check;

    try{
        check = data.energy;
        if(check == undefined){
            return false;
        }

    }catch(err){
        return false
    }
    
    const dbref = collection(db, 'default')
    const docref = document(dbref, '2')
    const snap2 = await getDoc(dbref);
    const data2 = snap2.data();

    console.log(data.energy);
    if(check != undefined){
        const energy = data.energy;
        const day = energy.day;
        const engy = energy.engy;
        return {day, engy, data2};
    }

}