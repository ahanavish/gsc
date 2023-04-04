const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function IsExist(uid){

    const dbRef = collection(db, "users");
    const snap = await getDoc(doc(db, 'users', `${uid}`));
    console.log(snap.data());
    
    if(snap.exists()){
        console.log('exist');
        return true

    }else{
        return false
    }
    
}