import {Injectable} from '@angular/core';
import {addDoc, collection, Firestore, getDocs, query} from "@angular/fire/firestore";

type Task = {
  title: String,
  description: String,
  status: String,
  date: Date
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public firestore: Firestore) { }
  async createTask(name: string, description: string, date: Date) {
    const docRef = await addDoc(collection(this.firestore, 'Tasks'), {
      title: name,
      description: description,
      status: 'pending',
      date: date
    });
    console.log("Document written with ID: ", docRef.id);
  }

  async getTasks() {
    return (
      await getDocs(query(collection(this.firestore, 'tasks')))
    ).docs.map((robots) => robots.data());
  }
}
