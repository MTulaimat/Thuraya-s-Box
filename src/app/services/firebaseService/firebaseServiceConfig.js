const devConfig = {
	apiKey: "AIzaSyAqlmHRtyFy7UEwqvHwWlPXYkjs3GPfHt0",
	authDomain: "thurayas-box.firebaseapp.com",
	projectId: "thurayas-box",
	storageBucket: "thurayas-box.appspot.com",
	messagingSenderId: "69741358593",
	appId: "1:69741358593:web:2ff4907b5f3b6c4b8c5a00",
	measurementId: "G-N1YYBE8GY9"
};

const prodConfig = {
	apiKey: "AIzaSyAqlmHRtyFy7UEwqvHwWlPXYkjs3GPfHt0",
	authDomain: "thurayas-box.firebaseapp.com",
	projectId: "thurayas-box",
	storageBucket: "thurayas-box.appspot.com",
	messagingSenderId: "69741358593",
	appId: "1:69741358593:web:2ff4907b5f3b6c4b8c5a00",
	measurementId: "G-N1YYBE8GY9"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;