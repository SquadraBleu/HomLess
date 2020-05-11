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

      let _tags: any;
      let response: any;
      return index.getObject(updateInfo).then(object => {
        response = object;
        console.log('Response Gathered ' + response);
        console.log('This is my response: ' + response);
        _tags = [...response['_tags']];
        console.log('This are my tags: ' + _tags);

        if (_tags) {
          _tags.add(TagName);
          console.log(_tags);
        } else {
          console.log('Empty field');
          return null;
        }
        const objectID = updateInfo;
        console.log('Updating to ' + _tags);
        return index.partialUpdateObject({
          _tags,
          objectID
        }).then(({}) => {
          console.log('Success Update');
        });
      }).catch(() => console.log('Error'));
    } else {
      return null;
    }
  });
