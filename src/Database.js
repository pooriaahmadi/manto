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
    static Users = class Users {
        static getById = async({ db, id }) => {
            const txn = db.transaction("users", "readonly");
            const users = txn.objectStore("users");
            try {
                const query = await users.get(id);
                return query;
            } catch (err) {
                return undefined;
            }
        };
        static getByUsername = async({ db, username }) => {
            const txn = db.transaction("users", "readonly");
            const users = txn.objectStore("users");
            const index = users.index("username");
            try {
                const query = await index.get(username);
                return query;
            } catch (err) {
                return undefined;
            }
        };
        static all = async({ db }) => {
            const txn = db.transaction("users", "readonly");
            const objectStore = txn.objectStore("users");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return {...item, id: keys[index] };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("users", "readwrite");
            const objectStore = txn.objectStore("users");
            await objectStore.delete(id);
        };
    };
    static Teams = class Teams {
        static getById = async({ db, id }) => {
            const txn = db.transaction("teams", "readonly");
            const teams = txn.objectStore("teams");
            try {
                const query = await teams.get(id);
                return query.result;
            } catch (err) {
                return undefined;
            }
        };
        static getByNumber = async({ db, number }) => {
            const txn = db.transaction("teams", "readonly");
            const teams = txn.objectStore("teams");
            const index = teams.index("number");
            try {
                const query = await index.get(number);
                return query.result;
            } catch (err) {
                return undefined;
            }
        };
        static all = async({ db }) => {
            const txn = db.transaction("teams", "readonly");
            const objectStore = txn.objectStore("teams");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return {...item, id: keys[index] };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("teams", "readwrite");
            const objectStore = txn.objectStore("teams");
            await objectStore.delete(id);
        };
    };
    static insertProperty = async({ db, title, type, category_id }) => {
        const txn = db.transaction("properties", "readwrite");
        const properties = txn.objectStore("properties");
        await properties
            .put({
                title: title,
                type: type,
                category: category_id,
            })
            .catch((e) => {
                console.log(e.target.errorCode);
            });
    };
    static insertAnswer = async({ db, content, property_id, match_id }) => {
        const txn = db.transaction("answers", "readwrite");
        const answers = txn.objectStore("answers");
        await answers
            .put({
                content: content,
                property: property_id,
                match: match_id,
            })
            .catch((e) => {
                console.log(e.target.errorCode);
            });
    };
    static insertCategory = async({ db, title }) => {
        const txn = db.transaction("categories", "readwrite");
        const categories = txn.objectStore("categories");
        await categories
            .put({
                title,
            })
            .catch((e) => {
                console.log(e.target.errorCode);
            });
    };
    static insertUser = async({ db, username, name }) => {
        const txn = db.transaction("users", "readwrite");
        const users = txn.objectStore("users");
        await users
            .put({
                username,
                name,
            })
            .catch((e) => {
                console.log(e.target.errorCode);
            });
    };
    static insertTeam = async({ db, number, name }) => {
        const txn = db.transaction("teams", "readwrite");
        const teams = txn.objectStore("teams");
        await teams
            .put({
                number,
                name,
            })
            .catch((e) => {
                console.log(e.target.errorCode);
            });
    };
    static insertMatch = async({ db, team_id, user_id }) => {
        const txn = db.transaction("matches", "readwrite");
        const matches = txn.objectStore("matches");
        await matches
            .put({
                team: team_id,
                user: user_id,
            })
            .catch((e) => {
                console.log(e.target.errorCode);
            });
    };
}
export default Database;