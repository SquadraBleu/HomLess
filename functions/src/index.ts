import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const env = functions.config();

import algoliasearch from 'algoliasearch';

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

exports.gatherTags = functions.firestore
  .document('Tags/{UID}')
  .onUpdate((change, context) => {
    const data = change.after;
    if (data) {
      const InmueblesID = data.get('IDInmuebles');
      const TagName = data.get('Hashtag');
      const updateInfo = InmueblesID.pop();
      console.log('Updated Prop: ' + updateInfo + ' with Tag: ' + TagName);

      return index.getObject(updateInfo).then(object => {
        console.log(object);
        // @ts-ignore
        const _tags: any = [...object['_tags']];
        console.log('This are my tags: ' + _tags);
        _tags.push(TagName);

        const objectID = updateInfo;
        console.log('Updating to ' + _tags + ' with OID: ' + objectID);
        index.partialUpdateObject({
          _tags,
          objectID
        }).then(({}) => {
          console.log('Success Update');
        }).catch(reason => console.log(reason));
      });
    } else {
      return null;
    }
  });
