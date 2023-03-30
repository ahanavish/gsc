const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function GetValues(uid){

    // get energy quantity from db
    const dbRef = collection(db, "users");
    const snap = await getDoc(doc(db, 'users', `${uid}`));

    if(snap.exists()){
        const data = snap.data();
        const energy = data.energy;
        const members = data.members;
        const state = data.state;
        return {energy, state, members};
    }else{
        return false;
    }
    
}