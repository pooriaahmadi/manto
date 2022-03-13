class Database {
    static first_time = (db) => {
        const users = db.createObjectStore("users", {
            autoIncrement: true,
        });
        const usersIndex = users.createIndex("username", "username", {
            unique: true,
        });
        const teams = db.createObjectStore("teams", {
            autoIncrement: true,
        });
        const teamsIndex = teams.createIndex("number", "number", {
            unique: true,
        });
        const matches = db.createObjectStore("matches", {
            autoIncrement: true,
        });
        const answers = db.createObjectStore("answers", {
            autoIncrement: true,
        });
        const categories = db.createObjectStore("categories", {
            autoIncrement: true,
        });
        const properties = db.createObjectStore("properties", {
            autoIncrement: true,
        });
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
}
export default Database;