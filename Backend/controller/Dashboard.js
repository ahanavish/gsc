const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function dashboard(uid){

    // get members and state
    const dbRef = collection(db, "users");
    const snap = await getDoc(doc(db, 'users', `${uid}`));
    if(snap.exists()){
        const data = snap.data();
        const state = data.state;
        const members = data.members;

        return {members, state}
    }else{
        return false;
    }
    
}