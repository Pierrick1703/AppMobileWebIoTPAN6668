import { FirebaseError, initializeApp } from 'firebase/app';
import { getFirestore, collection, collectionGroup, getDocs, query, limit, orderBy } from 'firebase/firestore/lite';

//pour plus de sécurité les crédentials devraient être dans un fichier à part
const firebaseConfig = {
    apiKey: "AIzaSyBbGOeD8365ggEI4G9wkYQWs9Uhui9GsYg",
    authDomain: "boite-d6840.firebaseapp.com",
    projectId: "boite-d6840",
    storageBucket: "boite-d6840.appspot.com",
    messagingSenderId: "599338280084",
    appId: "1:599338280084:web:29466407241cc6d0c28081"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

class FirebaseService {

	/**
	 * Get a list of status from last sensor 
	 * @return {Array}
	 */
	static async getSensor() {
		let sensorPath = 'sensors'
		let sensorCol = collection(firestore, sensorPath);
		let sensorSnapshot = await getDocs(sensorCol);
		let sensorList = sensorSnapshot.docs.map(sensor => sensor.data());
		let dataList = Array();
		for (let sensor of sensorList) {
			let sensorDataCol = [
				collection(firestore, sensorPath, sensor.date, 'samples'),
			];
            console.log(sensorDataCol);
			for (let dataCollection of sensorDataCol) {
				let q = query(dataCollection, orderBy('date', 'desc'), limit(1));
				await getDocs(q).then((dataSnapshot) => {
					if (dataSnapshot.docs.length > 0) {
						let collectionName = dataCollection.path.slice(sensorPath.length + sensor.date.length - dataCollection.path.length + 2);
						console.log(collectionName);
                        let recordedDataList = dataSnapshot.docs.map(value => value.data());
						return new Array(collectionName, recordedDataList);
					}
				}).then((dataArray) => {
					if (dataArray !== undefined) {
						dataList.push(dataArray);
						console.log('add new data');
					}
				});
			};
		};
		return dataList;
	}
}
export default FirebaseService;