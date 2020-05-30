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

    categoryRef(uid) {
        return firebase.database().ref(`/category${uid}`);
    }

    async writeCategory({uid}, title, description, color) {
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
                title,
                description,
                uid: categoryNode.key,
            }
        );
    }

    async getCategories({uid}, callback) {
        this.categoryRef(uid).on("value", (snapshot) => {
            if (snapshot.exists()) {
                callback(Object.values(snapshot.val()));
            } else {
                callback([]);
            }
        });
    }

    async removeCategory({uid}, categoryId) {
        await this.categoryRef(uid).child(categoryId).remove();
    }
}

export default FirebaseService;