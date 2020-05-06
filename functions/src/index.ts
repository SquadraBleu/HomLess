import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch'

//Init Algolia Pipe Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('inmuebles_search');

exports.indexInmuebles = functions.firestore
  .document('Inmuebles/{UID}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    //Push data to Algolia Index
    return index.addObject({
      objectId,
      ...data
    });
  });

exports.unindexInmuebles = functions.firestore
  .document('Inmuebles/{UID}')
  .onDelete((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    //Remove data to Algolia Index
    return index.deleteObject(objectId);
  });
exports.updateindexInmuebles = functions.firestore
  .document('Inmuebles/{UID}')
  .onUpdate((snap, context) => {
    const data = snap?.after?.data() ?? snap.after;
    const objectId = data.id;
    return index.addObject({
      objectId,
      ...data
    });
  });
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
