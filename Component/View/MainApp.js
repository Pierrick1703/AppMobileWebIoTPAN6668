import { StyleSheet, View } from 'react-native';
import ButtonMAJ from './ButtonMAJ';
import CourierOn from './CourierOn';

export default function MainApp() {
	return (
		<View style={styles.container}>
			<ButtonMAJ/>
            <CourierOn />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
        height : 200,
        width : 200
	},
});