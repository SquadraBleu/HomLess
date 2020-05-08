// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyC3KNNcLVHVKaXuUsMOqfEjZDaFtg48e3I',
    authDomain: 'homlessp.firebaseapp.com',
    databaseURL: 'https://homlessp.firebaseio.com',
    projectId: 'homlessp',
    storageBucket: 'homlessp.appspot.com',
    messagingSenderId: '459530495286',
    appId: '1:459530495286:web:6ed9b2c4fcdb185fabbf97'
  },
  algolia: {
    appId: 'B5VE5KJCB3',
    apiKey: '177f4ba2df8282c9e2b2f7c6c4423e73'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
