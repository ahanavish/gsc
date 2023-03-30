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
    
    console.log(data.energy);
    if(check != undefined){
        const energy = data.energy;
        const day = energy.day;
        const engy = energy.engy;
        return {day, engy};
    }

}