const bms = require('./bms');
const firebase = require('firebase');
const namespace = require('fs').readFileSync('/etc/hostname', 'utf8').trim();

// init
firebase.initializeApp({
	apiKey: "AIzaSyAs3FvBCADM66wR1-leBz6aIjK1wZfUxRo",
	authDomain: "homefront-2ccb4.firebaseapp.com",
	databaseURL: "https://homefront-2ccb4.firebaseio.com",
	projectId: "homefront-2ccb4",
	storageBucket: "homefront-2ccb4.appspot.com",
	messagingSenderId: "482384317544"
});
const firestore = firebase.firestore();
firestore.settings({timestampsInSnapshots: true});
const powerwall = new bms('/dev/ttyACM0');
const timestamp = new Date().getTime();

// Wait to accumulate data and then submit
setTimeout(async () => {
	try {
		let data = powerwall.data();
		data.timestamp = timestamp;

		console.log(`(${(new Date()).toISOString()}) Saving...`);
		await firestore.collection('Battery').doc(namespace)
			.collection('data').doc(timestamp.toString())
			.set(data);
		powerwall.close();
		console.log(`(${(new Date()).toISOString()}) Saved`);
		process.exit();
	} catch(err) {
		console.log(err);
		process.exit(1);
	}
}, 5000);

// Remove any records older than 30 days
firestore.collection('Battery').doc(namespace).collection('data')
	.where('timestamp', '<', timestamp - 2592000000).get()
	.then(snapshot => snapshot.forEach(doc => doc.ref.delete()));
