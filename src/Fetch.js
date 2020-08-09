/* eslint-disable class-methods-use-this */
/// Class for every fetch process
import FirebaseConfig from './FirebaseConfig';

export default class Fetch {
  constructor() {
    this.firebase = new FirebaseConfig();
    this.dataBase = this.firebase.getFirestore();
  }

  async getCollection(collection) {
    const data = await this.dataBase.collection(collection).get();
    const dataCollection = [];
    data.forEach((doc) => {
      dataCollection.push(doc.data());
    });
    return dataCollection;
  }

  async updateDocument(collection, fetchBody) {
    try {
      const response = await this.dataBase.collection(collection);
      return response.doc(fetchBody.id).update(fetchBody);
    } catch (error) {
      return console.error(error);
    }
  }
}
