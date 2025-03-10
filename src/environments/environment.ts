// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
   firebaseConfig: {
    apiKey: "AIzaSyDN7QagcoBS4821DrlpvO0khMNJ2qFuabE",
    authDomain: "romina-proyect.firebaseapp.com",
    projectId: "romina-proyect",
    storageBucket: "romina-proyect.firebasestorage.app",
    messagingSenderId: "511869476616",
    appId: "1:511869476616:web:056cdc48fc07aaaf8f96bd",
    measurementId: "G-425NMC1YS0"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
