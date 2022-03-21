import { useState } from 'react';
import { Button, Text } from 'react-native';
import FirebaseService from '../Data/Firebase';


export default function ButtonUpdate() {


	const [date, setDate] = useState();

	async function updateStatus() {
		let statusList = await FirebaseService.getSensor();
    	}
    //bouton d'update pour récupérer et afficher les informations récupérer de la page Firebase
    return (
		<div>
			<Text>Get Box Letter status</Text>
			<Button onPress={updateStatus}>Update </Button>
            		</div>
	);
}