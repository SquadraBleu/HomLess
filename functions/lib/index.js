"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch_1 = require("algoliasearch");
//Init Algolia Pipe Client
const client = algoliasearch_1.default(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('inmuebles_search');
exports.indexInmuebles = functions.firestore
    .document('Inmuebles/{UID}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = context.params.UID;
    console.log('This is objectID ' + objectID);
    //Push data to Algolia Index
    return index.saveObject(Object.assign(Object.assign({}, data), { objectID }));
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
    var _a, _b;
    const data = (_b = (_a = snap === null || snap === void 0 ? void 0 : snap.after) === null || _a === void 0 ? void 0 : _a.data()) !== null && _b !== void 0 ? _b : snap.after;
    const objectID = context.params.UID;
    return index.partialUpdateObject(Object.assign(Object.assign({}, data), { objectID }));
});
//# sourceMappingURL=index.js.map