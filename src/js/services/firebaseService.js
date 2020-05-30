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
                color,
                uid: categoryNode.key,
            }
        );
    }

    getCategories({uid}, callback) {
        this.getData(callback, this.categoryRef(uid));
    }

    async removeCategory({uid}, categoryId) {
        await this.categoryRef(uid).child(categoryId).remove();
    }

    expenseRef(uid) {
        return firebase.database().ref(`/expense${uid}`);
    }

    async writeExpense({uid}, expense) {
        const expenseNode = await this.expenseRef(uid).push();
        await expenseNode.set(
            {

            }
        );
    }

    getExpense({uid}, callback) {
        this.getData(callback, this.expenseRef(uid));
    }

    incomeRef(uid) {
        return firebase.database().ref(`/income${uid}`);
    }

    async writeIncome({uid}, income) {
        const incomeNode = await this.incomeRef(uid).push();
        await incomeNode.set(
            {

            }
        );
    }

    getIncomes({uid}, callback) {
        this.getData(callback, this.incomeRef(uid));
    }

}

export default FirebaseService;