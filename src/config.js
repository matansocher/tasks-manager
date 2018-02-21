import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCFxOvbE0KR9lxFEc0p9BMCRUg8jG02FG0",
	authDomain: "tasks-manager-debc1.firebaseapp.com",
	databaseURL: "https://tasks-manager-debc1.firebaseio.com",
	projectId: "tasks-manager-debc1",
	storageBucket: "tasks-manager-debc1.appspot.com",
	messagingSenderId: "845065083081"
};

const fire = firebase.initializeApp(config);
export default fire;
