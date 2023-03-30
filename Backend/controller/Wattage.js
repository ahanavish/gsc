const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function getWattage(){

    try{
        const dbRef = collection(db, "default");
        const snap = await getDoc(doc(db, 'default', `1`));
        
        if(snap.exists()){
            var data = snap.data()
            console.log(data);
            return data;
        }else{
            return {};
        }

    }catch(err){
        console.log(err);
    }
    
}