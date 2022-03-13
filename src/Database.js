class Database {
    static first_time = (db) => {
        const users = db.createObjectStore("users", {
            autoIncrement: true,
        });
        users.createIndex("username", "username", {
            unique: true,
        });
        const teams = db.createObjectStore("teams", {
            autoIncrement: true,
        });
        teams.createIndex("number", "number", {
            unique: true,
        });
        db.createObjectStore("matches", {
            autoIncrement: true,
        });
        db.createObjectStore("answers", {
            autoIncrement: true,
        });
        db.createObjectStore("categories", {
            autoIncrement: true,
        });
        db.createObjectStore("properties", {
            autoIncrement: true,
        });
    };
    static insertProperty = ({ db, title, type, category_id }) => {
        const txn = db.transaction("properties", "readwrite");
        const properties = txn.objectStore("properties");
        let query = properties.put({
            title: title,
            type: type,
            category: category_id,
        });
        query.onsuccess = (e) => {
            console.log(e);
        };
        query.onerror = (e) => {
            console.log(e.target.errorCode);
        };
    };
    static insertAnswer = ({ db, content, property_id, match_id }) => {
        const txn = db.transaction("answers", "readwrite");
        const answers = txn.objectStore("answers");
        let query = answers.put({
            content: content,
            property: property_id,
            match: match_id,
        });
        query.onsuccess = (e) => {
            console.log(e);
        };
        query.onerror = (e) => {
            console.log(e.target.errorCode);
        };
    };
    static insertCategory = ({ db, title }) => {
        const txn = db.transaction("categories", "readwrite");
        const categories = txn.objectStore("categories");
        let query = categories.put({
            title,
        });
        query.onsuccess = (e) => {
            console.log(e);
        };
        query.onerror = (e) => {
            console.log(e.target.errorCode);
        };
    };
    static insertUser = ({ db, username, name }) => {
        const txn = db.transaction("users", "readwrite");
        const users = txn.objectStore("users");
        let query = users.put({
            username,
            name,
        });
        query.onsuccess = (e) => {
            console.log(e);
        };
        query.onerror = (e) => {
            console.log(e.target.errorCode);
        };
    };
    static insertTeam = ({ db, number, name }) => {
        const txn = db.transaction("teams", "readwrite");
        const teams = txn.objectStore("teams");
        let query = teams.put({
            number,
            name,
        });
        query.onsuccess = (e) => {
            console.log(e);
        };
        query.onerror = (e) => {
            console.log(e.target.errorCode);
        };
    };
    static insertMatch = ({ db, team_id, user_id }) => {
        const txn = db.transaction("matches", "readwrite");
        const matches = txn.objectStore("matches");
        let query = matches.put({
            team: team_id,
            user: user_id,
        });
        query.onsuccess = (e) => {
            console.log(e);
        };
        query.onerror = (e) => {
            console.log(e.target.errorCode);
        };
    };
}
export default Database;