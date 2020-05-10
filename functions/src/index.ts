import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const env = functions.config();

import algoliasearch from 'algoliasearch'

//Init Algolia Pipe Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('inmuebles_search');

exports.indexInmuebles = functions.firestore
  .document('Inmuebles/{UID}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = context.params.UID;
    console.log('This is objectID ' + objectID);
    //Push data to Algolia Index
    return index.saveObject({
      ...data,
      objectID
    });
  });

exports.unindexInmuebles = functions.firestore
  .document('Inmuebles/{UID}')
  .onDelete((snap, context) => {
    const objectID = context.params.UID;
    //Remove data to Algolia Index
    return index.deleteObject(objectID);
  });

exports.updateindexInmuebles = functions.firestore
  .document('Inmuebles/{UID}')
  .onUpdate((snap, context) => {
    const data = snap?.after?.data() ?? snap.after;
    const objectID = context.params.UID;
    return index.partialUpdateObject({
      ...data,
      objectID
    });
  });
