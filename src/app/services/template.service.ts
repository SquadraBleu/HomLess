import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Template } from 'src/app/models/template';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  templateCollection: AngularFirestoreCollection<any>;
  templates: Observable<any[]>;
  specificTemplate: Template;
  constructor(
    private afs: AngularFirestore
  ) {
    this.templateCollection = afs.collection<any>('Templates');
    this.templates = this.templateCollection.snapshotChanges().pipe(map(
      actions => actions.map ( a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return{id, ...data};
      })
    ));
  }

  getTemplates(){
    return this.templates;
  }
}
