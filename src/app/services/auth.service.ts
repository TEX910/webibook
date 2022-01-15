import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore'
import { environment } from 'src/environments/environment';
import { OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  firebase = initializeApp(environment.firebaseConfig);
  googleProvider = new GoogleAuthProvider();
  auth = getAuth();
  db = getFirestore();

  constructor(
  ) {
  }

  ngOnInit() {
  }


  // Sign in with Google
  public GoogleAuth() {

    signInWithPopup(this.auth, this.googleProvider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential) {
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log('Succesfully logged in: '+user);
        try {
          const docRef = await addDoc(collection(this.db, "users"), {
            uid: user.uid,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

}
