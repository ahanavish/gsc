const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");


module.exports = async function UserLogic(uid, name=null, email=null, state, result){
    try{
        const dbRef = collection(db, "users");
        const snap = await getDoc(doc(db, 'users', `${uid}`));
        if(snap.exists()){
            await setDoc(doc(dbRef, `${uid}`), {
                state: state,
                energy: result,
            }, {
                merge: true
            })
        }else{
            await setDoc(doc(dbRef, `${uid}`), {
                name: name,
                email: email,
                state: state,
                energy: result           
            })
        }
        return true;

    }catch(e){
        console.log(e);
        return false;
    }
}