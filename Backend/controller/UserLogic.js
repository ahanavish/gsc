const db = require('../config.js')

const { collection, getFirestore, getDoc, query, where, orderBy, addDoc, doc, setDoc } = require("firebase/firestore");

module.exports = async function UserLogic(uid, appliance, result, MaxDuration, MaxPower) {

    try {

        var result = result;
        console.log(result, ' new result');

        const dbRef = collection(db, "users");
        const snap = await getDoc(doc(db, 'users', `${uid}`));

        // check if user exists
        if (snap.exists()) {

            const data = snap.data();

            var members = data.members;

            console.log(('before'), result, members);
            for (let i = 0; i < result.length; i++) {
                result[i] = (result[i] / members);
                console.log(result[i], ' loging');
            }
            console.log(('after'), result);


            var engy = 0;
            for (let i = 0; i < result.length; i++) {
                engy += result[i];
            }
            console.log(engy, 'engy');

            const formattedDate = new Date().toISOString().slice(0, 10);

            console.log(formattedDate);

            const energy = data.energy
            if ((energy) != undefined) {
                var dayArr = energy.day;
                var engyArr = energy.engy;

                // pushes new value to array
                console.log(engyArr);
                engyArr.push(engy);
                dayArr.push(formattedDate);

                // list of arrays, day and engy
                const engylis = { day: dayArr, engy: engyArr }

                console.log(engylis, 'energy');


                await setDoc(doc(dbRef, `${uid}`), {
                    // make it so that it has a new id for each entry
                    energy: engylis

                }, {
                    merge: true
                })

            } else {
                // set new values
                const engylis = { day: [formattedDate], engy: [engy] }

                console.log(engylis, 'energy new');
                console.log(MaxDuration, MaxPower, 'test');

                await setDoc(doc(dbRef, `${uid}`), {
                    // make it so that it has a new id for each entry
                    energy: engylis,
                    MaxDuration: MaxDuration,
                    MaxPower: MaxPower

                }, {
                    merge: true
                })
            }
        } else {

            return false
        }
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }

}