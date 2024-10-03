// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyC4AufZQxA2jlYj-UBrmm8n_vpPfRxGvnU",
    authDomain: "kanban-board-620c3.firebaseapp.com",
    databaseURL: "https://kanban-board-620c3-default-rtdb.firebaseio.com",
    projectId: "kanban-board-620c3",
    storageBucket: "kanban-board-620c3.appspot.com",
    messagingSenderId: "397370238541",
    appId: "1:397370238541:web:176cc3eb099a0061d11e04",
    measurementId: "G-5J87F6JMZH"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});