const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function SetInit(uid, name=null, email=null, state, members){

    const dbRef = collection(db, "users");
        const snap = await getDoc(doc(db, 'users', `${uid}`));
        
        if(snap.exists()){

            return false
        }else{

            await setDoc(doc(dbRef, `${uid}`), {
                name: name,
                email: email,
                state: state,
                members: members
            })
            return true
        }
        
}