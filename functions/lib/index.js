"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch = require("algoliasearch");
//Init Algolia Pipe Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('inmuebles_search');
exports.indexInmuebles = functions.firestore
    .document('Inmuebles/{UID}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectId = snap.id;
    //Push data to Algolia Index
    return index.addObject(Object.assign({ objectId }, data));
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
    var _a, _b;
    const data = (_b = (_a = snap === null || snap === void 0 ? void 0 : snap.after) === null || _a === void 0 ? void 0 : _a.data()) !== null && _b !== void 0 ? _b : snap.after;
    const objectId = data.id;
    return index.addObject(Object.assign({ objectId }, data));
});
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//# sourceMappingURL=index.js.map