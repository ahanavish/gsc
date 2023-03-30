const db = require('../config.js')
const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function UpdateUserProfile(uid, name, state, num_members){
    
    const dbRef = collection(db, "users");
    const snap = await getDoc(doc(db, 'users', `${uid}`));

    try{
        
        await setDoc(doc(dbRef, `${uid}`), {
            // make it so that it has a new id for each entry
            name : name,
            state: state,
            members: num_members
    
        }, {
            merge: true
        })
        
        return true

    }catch(err){
        console.log(err)
        return false
    }

}