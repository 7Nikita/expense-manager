import {Transaction} from "../models/transaction.js";
import {Category} from "../models/category.js";

class FirebaseService {

    async readUserData({uid}) {
        const snapshot = await firebase.database().ref("users/").child(uid).once("value");
        const data = snapshot.val();
        return data;
    }

    usersRef() {
        return firebase.database().ref("/users");
    }

    async writeUserData({uid}, email, username, name, surname) {
        await this.usersRef().child(uid).set(
            {
                email: email,
                username: username,
                name: name,
                surname: surname,
            }
        );
    }

    getData(callback, ref) {
        ref.on("value", (snapshot) => {
            if (snapshot.exists()) {
                callback(Object.values(snapshot.val()));
            } else {
                callback([]);
            }
        });
    }

    categoryRef(uid) {
        return firebase.database().ref(`/category${uid}`);
    }

    async writeCategory({uid}, category) {
        /*
            Path is `/category${uid}`, nor /category/${uid}, because firebase
            can't add a new node to the list. In this way we need to copy
            already existing nodes and add the new one.
            When we remove one nesting level, we can just add new node
            to the list.
         */
        const categoryNode = await this.categoryRef(uid).push();
        await categoryNode.set(
            {
                title: category.title,
                description: category.description,
                color: category.color,
                uid: categoryNode.key,
            }
        );
    }

    getCategories({uid}, callback) {
        this.getData(callback, this.categoryRef(uid));
    }

    async getCategoriesList({uid}) {
        const snapshot = await this.categoryRef(uid).once("value");
        return Object.values(snapshot.val() ?? []);
    }

    async getCategoriesDict({uid}) {
        const snapshot = await this.categoryRef(uid).once("value");
        return snapshot.val();
    }

    async removeCategory({uid}, categoryId) {
        await this.categoryRef(uid).child(categoryId).remove();
    }

    transactionRef(uid) {
        return firebase.database().ref(`/transaction${uid}`);
    }

    async writeTransaction({uid}, transaction) {
        const transactionNode = await this.transactionRef(uid).push();
        await transactionNode.set(
            {
                amount: transaction.amount,
                place: transaction.place,
                description: transaction.description,
                category_id: transaction.category_id,
                date: transaction.date,
                type: transaction.type,
                uid: transactionNode.key,
            }
        );
    }

    getTransactions({uid}, callback) {
        this.getData(callback, this.transactionRef(uid));
    }

    async removeTransaction({uid}, transactionId) {
        await this.transactionRef(uid).child(transactionId).remove();
    }

    async uploadImage({uid}, image) {

    }
}

export default FirebaseService;