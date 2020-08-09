import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

export default class FirebaseConfig {
  constructor() {
    this.firebaseConfig = {
      apiKey: 'AIzaSyCWv1Tq9oeFkDbkc1QsA0Ue6nLP6IxdEos',
      authDomain: 'zemoga-server.firebaseapp.com',
      databaseURL: 'https://zemoga-server.firebaseio.com',
      projectId: 'zemoga-server',
      storageBucket: 'zemoga-server.appspot.com',
      messagingSenderId: '275183785204',
      appId: '1:275183785204:web:22797f6eb1d28acc007aa1',
    };
    this.firebase = firebase;
    this.init();
  }

  init() {
    this.firebase.initializeApp(this.firebaseConfig);
  }

  getFirestore() {
    return this.firebase.firestore();
  }
}
