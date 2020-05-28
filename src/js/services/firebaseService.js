class FirebaseService {
    async readUserData({uid}) {
        const snapshot = await firebase.database().ref("users/").child(uid).once("value");
        const data = snapshot.val();
        return data;
    }

    async writeUserData(user, email, username, name, surname) {
        firebase.database().ref("users/" + user.uid).set(
            {
                email: email,
                username: username,
                name: name,
                surname: surname,
            }
        );
    }
}

export default FirebaseService;