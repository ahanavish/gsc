const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc} = require("firebase/firestore");

module.exports = async function UserLogic(uid, appliance, result){

    try{
        const dbRef = collection(db, "users");
        const snap = await getDoc(doc(db, 'users', `${uid}`));

        // check if user exists
        if(snap.exists()){
            var engy = 0;
            for(let i=0; i<result.length; i++){
                engy += result[i];
            }

            var date = new Date();
            var day = date.getDate();
            console.log(day);

            // get energy value from db using uid
            const snap = await getDoc(doc(db, 'users', `${uid}`));
            const data = snap.data();

            const energy = data.energy
            if( (energy) != undefined){
                var dayArr = energy.day;
                var engyArr = energy.engy;

                // pushes new value to array
                console.log(engyArr);
                engyArr.push(engy);
                dayArr.push(day); 

                // list of arrays, day and engy
                const engylis = {day:dayArr,engy:engyArr}

                console.log(energy, 'energy');

                await setDoc(doc(dbRef, `${uid}`), {
                    // make it so that it has a new id for each entry
                    energy : engylis

                }, {
                    merge: true
                })

            }else{
                // set new values
                const engylis = {day:[day],engy:[engy]}

                console.log(energy, 'energy');

                await setDoc(doc(dbRef, `${uid}`), {
                    // make it so that it has a new id for each entry
                    energy : engylis

                }, {
                    merge: true
                })
            }
        }else{

            /*var engy = {}
            appliance.forEach((appl)=> {
                engy[appl] = result[(appliance.indexOf(appl))]
            });

            await setDoc(doc(dbRef, `${uid}`), {
                name: name,
                email: email,
                state: state,
                energy: engy,
                members: members
            })*/
            return false
        }
        return true;

    }catch(e){
        console.log(e);
        return false;
    }
    
}