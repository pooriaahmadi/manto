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
        const matches = db.createObjectStore("matches", {
            autoIncrement: true,
        });
        matches.createIndex("team", "team");
        matches.createIndex("user", "user");
        matches.createIndex("number", "number");
        const answers = db.createObjectStore("answers", {
            autoIncrement: true,
        });
        answers.createIndex("proeprty", "property");
        answers.createIndex("match", "match");
        const categories = db.createObjectStore("categories", {
            autoIncrement: true,
        });
        categories.createIndex("title", "title", {
            unique: true,
        });
        const properties = db.createObjectStore("properties", {
            autoIncrement: true,
        });
        properties.createIndex("category", "category");
        properties.createIndex("title", "title", {
            unique: true,
        });

        const waitingMatches = db.createObjectStore("waiting_matches", {
            autoIncrement: true,
        });
        waitingMatches.createIndex("match", "match");
        const qualificationMatches = db.createObjectStore(
            "qualification_matches", {
                autoIncrement: true,
            }
        );
        qualificationMatches.createIndex("number", "number", {
            unique: true,
        });
        const dublicates = db.createObjectStore("dublicates", {
            autoIncrement: true,
        });
        dublicates.createIndex("proeprty", "property");
        dublicates.createIndex("match", "match");
        const comments = db.createObjectStore("comments", {
            autoIncrement: true,
        });
        comments.createIndex("team", "team");
        db.createObjectStore("pitproperties", {
            autoIncrement: true,
        });
        const pitAnswers = db.createObjectStore("pitanswers", {
            autoIncrement: true,
        });
        pitAnswers.createIndex("team", "team");
        pitAnswers.createIndex("property", "property");
    };
    static PitAnswers = class PitAsnwers {
        static insert = async({ db, content, property, team }) => {
            const txn = db.transaction("pitanswers", "readwrite");
            const pitAnswers = txn.objectStore("pitanswers");
            return await pitAnswers.add({
                content,
                property,
                team,
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("pitanswers", "readwrite");
            const pitAnswers = txn.objectStore("pitanswers");
            await pitAnswers.clear();
        };
        static all = async({ db }) => {
            const txn = db.transaction("pitanswers", "readonly");
            const objectStore = txn.objectStore("pitanswers");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("pitanswers", "readwrite");
            const pitAnswers = txn.objectStore("pitanswers");
            return await pitAnswers.get(id);
        };
        static getByTeam = async({ db, team_id }) => {
            const txn = db.transaction("pitanswers", "readonly");
            const objectStore = txn.objectStore("pitanswers");
            const index = objectStore.index("team");
            const keys = await index.getAllKeys(team_id);
            return (await index.getAll(team_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getByProperty = async({ db, property_id }) => {
            const txn = db.transaction("pitanswers", "readonly");
            const objectStore = txn.objectStore("pitanswers");
            const index = objectStore.index("property");
            const keys = await index.getAllKeys(property_id);
            return (await index.getAll(property_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
    };
    static PitProperties = class PitProperties {
        static insert = async({ db, content }) => {
            const txn = db.transaction("pitproperties", "readwrite");
            const pitProperties = txn.objectStore("pitproperties");
            return await pitProperties.add({
                content,
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("pitproperties", "readwrite");
            const pitProperties = txn.objectStore("pitproperties");
            await pitProperties.clear();
        };
        static all = async({ db }) => {
            const txn = db.transaction("pitproperties", "readonly");
            const objectStore = txn.objectStore("pitproperties");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("pitproperties", "readwrite");
            const pitProperties = txn.objectStore("pitproperties");
            return await pitProperties.get(id);
        };
    };
    static Comments = class Comments {
        static insert = async({ db, content, team }) => {
            const txn = db.transaction("comments", "readwrite");
            const comments = txn.objectStore("comments");
            return await comments.add({
                content,
                team,
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("comments", "readwrite");
            const comments = txn.objectStore("comments");
            await comments.clear();
        };
        static all = async({ db }) => {
            const txn = db.transaction("comments", "readonly");
            const objectStore = txn.objectStore("comments");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("comments", "readwrite");
            const comments = txn.objectStore("comments");
            return await comments.get(id);
        };
        static getByTeam = async({ db, team_id }) => {
            const txn = db.transaction("comments", "readonly");
            const objectStore = txn.objectStore("comments");
            const index = objectStore.index("team");
            const keys = await index.getAllKeys(team_id);
            return (await index.getAll(team_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
    };
    static QualificationMatches = class QualificationMatches {
        static insert = async({ db, number, redTeams, blueTeams }) => {
            const txn = db.transaction("qualification_matches", "readwrite");
            const qualificationMatches = txn.objectStore(
                "qualification_matches"
            );
            return await qualificationMatches.add({
                number,
                red: redTeams,
                blue: blueTeams,
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("qualification_matches", "readwrite");
            const qualificationMatches = txn.objectStore(
                "qualification_matches"
            );
            await qualificationMatches.clear();
        };
        static all = async({ db }) => {
            const txn = db.transaction("qualification_matches", "readonly");
            const objectStore = txn.objectStore("qualification_matches");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("qualification_matches", "readwrite");
            const qualificationMatches = txn.objectStore(
                "qualification_matches"
            );
            return await qualificationMatches.get(id);
        };
        static getByNumber = async({ db, number }) => {
            const txn = db.transaction("qualification_matches", "readwrite");
            const qualificationMatches = txn.objectStore(
                "qualification_matches"
            );
            const index = qualificationMatches.index("number");
            return {
                id: await index.getKey(number),
                ...(await index.get(number)),
            };
        };
    };
    static WaitingMatches = class WaitingMatches {
        static insert = async({ db, match_id }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waitingMatches = txn.objectStore("waiting_matches");
            return await waitingMatches.add({ match: match_id });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waitingMatches = txn.objectStore("waiting_matches");
            await waitingMatches.delete(id);
        };
        static deleteByMatch = async({ db, match_id }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waitingMatches = txn.objectStore("waiting_matches");
            const index = waitingMatches.index("match");
            await waitingMatches.delete(await index.getKey(match_id));
        };
        static all = async({ db }) => {
            const txn = db.transaction("waiting_matches", "readonly");
            const objectStore = txn.objectStore("waiting_matches");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("waiting_matches", "readwrite");
            const waiting_matches = txn.objectStore("waiting_matches");
            await waiting_matches.clear();
        };
    };
    static Matches = class Matches {
        static all = async({ db }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getByTeam = async({ db, team_id }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            const index = objectStore.index("team");
            const keys = await index.getAllKeys(team_id);
            return (await index.getAll(team_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getByNumber = async({ db, number }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            const index = objectStore.index("number");
            const keys = await index.getAllKeys(number);
            return (await index.getAll(number)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("matches", "readonly");
            const objectStore = txn.objectStore("matches");
            try {
                return await objectStore.get(id);
            } catch (error) {}
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("matches", "readwrite");
            const objectStore = txn.objectStore("matches");
            await objectStore.delete(id);
        };
        static clear = async({ db }) => {
            const txn = db.transaction("matches", "readwrite");
            const matches = txn.objectStore("matches");
            await matches.clear();
        };
    };
    static Categories = class Categories {
        static all = async({ db }) => {
            const txn = db.transaction("categories", "readonly");
            const objectStore = txn.objectStore("categories");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("categories", "readwrite");
            const objectStore = txn.objectStore("categories");
            await objectStore.delete(id);
        };
        static clear = async({ db }) => {
            const txn = db.transaction("categories", "readwrite");
            const categories = txn.objectStore("categories");
            await categories.clear();
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("categories", "readonly");
            const categories = txn.objectStore("categories");
            try {
                return await categories.get(id);
            } catch (error) {}
        };
    };
    static Users = class Users {
        static clear = async({ db }) => {
            const txn = db.transaction("users", "readwrite");
            const users = txn.objectStore("users");
            await users.clear();
        };
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
                const id = await index.getKey(username);
                const query = await index.get(username);
                return { id, ...query };
            } catch (err) {
                return undefined;
            }
        };
        static all = async({ db }) => {
            const txn = db.transaction("users", "readonly");
            const objectStore = txn.objectStore("users");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("users", "readwrite");
            const objectStore = txn.objectStore("users");
            await objectStore.delete(id);
        };
    };
    static Teams = class Teams {
        static clear = async({ db }) => {
            const txn = db.transaction("teams", "readwrite");
            const teams = txn.objectStore("teams");
            await teams.clear();
        };
        static getById = async({ db, id }) => {
            const txn = db.transaction("teams", "readonly");
            const teams = txn.objectStore("teams");
            try {
                const query = await teams.get(id);
                return query;
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
                return query;
            } catch (err) {
                return undefined;
            }
        };
        static all = async({ db }) => {
            const txn = db.transaction("teams", "readonly");
            const objectStore = txn.objectStore("teams");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("teams", "readwrite");
            const objectStore = txn.objectStore("teams");
            await objectStore.delete(id);
        };
    };
    static Properties = class Properties {
        static getByCategory = async({ db, category_id }) => {
            const txn = db.transaction("properties", "readonly");
            const objectStore = txn.objectStore("properties");
            const index = objectStore.index("category");
            const keys = await index.getAllKeys(category_id);
            return (await index.getAll(category_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("properties", "readwrite");
            const objectStore = txn.objectStore("properties");
            await objectStore.delete(id);
        };
        static all = async({ db }) => {
            const txn = db.transaction("properties", "readonly");
            const objectStore = txn.objectStore("properties");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static clear = async({ db }) => {
            const txn = db.transaction("properties", "readwrite");
            const properties = txn.objectStore("properties");
            await properties.clear();
        };
    };
    static insertProperty = async({ db, title, type, category_id }) => {
        const txn = db.transaction("properties", "readwrite");
        const properties = txn.objectStore("properties");
        await properties.add({
            title: title,
            type: type,
            category: category_id,
        });
    };
    static Answers = class Answers {
        static getByProperty = async({ db, property_id }) => {
            const txn = db.transaction("answers", "readwrite");
            const answers = txn.objectStore("answers");
            const index = answers.index("proeprty");
            try {
                const id = await index.getKey(property_id);
                if (!id) return;
                return {
                    ...(await index.get(property_id)),
                    id: id,
                };
            } catch (error) {
                return;
            }
        };
        static getByMatch = async({ db, match_id }) => {
            const txn = db.transaction("answers", "readwrite");
            const answers = txn.objectStore("answers");
            const index = answers.index("match");
            const keys = await index.getAllKeys(match_id);
            return (await index.getAll(match_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("answers", "readwrite");
            const objectStore = txn.objectStore("answers");
            await objectStore.delete(id);
        };

        static getByMatchAndProperty = async({
            db,
            property_id,
            match_id,
        }) => {
            let answers = await Database.Answers.all({ db });
            answers = answers.filter(
                (item) =>
                item.property === property_id && item.match === match_id
            );
            return answers.length ? answers[0] : undefined;
        };
        static all = async({ db }) => {
            const txn = db.transaction("answers", "readonly");
            const objectStore = txn.objectStore("answers");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static update = async({ db, id, data }) => {
            const txn = db.transaction("answers", "readwrite");
            const answers = txn.objectStore("answers");
            const answer = await answers.get(id);
            await answers.put({...answer, ...data }, id);
        };
        static clear = async({ db }) => {
            const txn = db.transaction("answers", "readwrite");
            const answers = txn.objectStore("answers");
            await answers.clear();
        };
    };
    static Dublicates = class Dublicates {
        static getByProperty = async({ db, property_id }) => {
            const txn = db.transaction("dublicates", "readwrite");
            const dublicates = txn.objectStore("dublicates");
            const index = dublicates.index("proeprty");
            try {
                const id = await index.getKey(property_id);
                if (!id) return;
                return {
                    ...(await index.get(property_id)),
                    id: id,
                };
            } catch (error) {
                return;
            }
        };
        static getByMatch = async({ db, match_id }) => {
            const txn = db.transaction("dublicates", "readwrite");
            const dublicates = txn.objectStore("dublicates");
            const index = dublicates.index("match");
            const keys = await index.getAllKeys(match_id);
            return (await index.getAll(match_id)).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static delete = async({ db, id }) => {
            const txn = db.transaction("dublicates", "readwrite");
            const objectStore = txn.objectStore("dublicates");
            await objectStore.delete(id);
        };

        static getByMatchAndProperty = async({
            db,
            property_id,
            match_id,
        }) => {
            let dublicates = await Database.Dublicates.all({ db });
            dublicates = dublicates.filter(
                (item) =>
                item.property === property_id && item.match === match_id
            );
            return dublicates.length ? dublicates[0] : undefined;
        };
        static all = async({ db }) => {
            const txn = db.transaction("dublicates", "readonly");
            const objectStore = txn.objectStore("dublicates");
            const keys = await objectStore.getAllKeys();
            return (await objectStore.getAll()).map((item, index) => {
                return { id: keys[index], ...item };
            });
        };
        static update = async({ db, id, data }) => {
            const txn = db.transaction("dublicates", "readwrite");
            const dublicates = txn.objectStore("dublicates");
            const dublicate = await dublicates.get(id);
            await dublicates.put({...dublicate, ...data }, id);
        };
        static clear = async({ db }) => {
            const txn = db.transaction("dublicates", "readwrite");
            const dublicates = txn.objectStore("dublicates");
            await dublicates.clear();
        };
        static insert = async({ db, content, property_id, match_id }) => {
            const txn = db.transaction("dublicates", "readwrite");
            const dublicates = txn.objectStore("dublicates");
            return await dublicates.add({
                content: content,
                property: property_id,
                match: match_id,
            });
        };
    };
    static insertAnswer = async({ db, content, property_id, match_id }) => {
        const txn = db.transaction("answers", "readwrite");
        const answers = txn.objectStore("answers");
        return await answers.add({
            content: content,
            property: property_id,
            match: match_id,
        });
    };
    static insertCategory = async({ db, title }) => {
        const txn = db.transaction("categories", "readwrite");
        const categories = txn.objectStore("categories");
        return await categories.add({
            title,
        });
    };
    static insertUser = async({ db, username, name }) => {
        const txn = db.transaction("users", "readwrite");
        const users = txn.objectStore("users");
        return await users.add({
            username,
            name,
        });
    };
    static insertTeam = async({ db, number, name }) => {
        const txn = db.transaction("teams", "readwrite");
        const teams = txn.objectStore("teams");
        return await teams.add({
            number,
            name,
        });
    };
    static insertMatch = async({ db, number, team_id, user_id }) => {
        const txn = db.transaction("matches", "readwrite");
        const matches = txn.objectStore("matches");
        return await matches.add({
            team: team_id,
            user: user_id,
            number,
        });
    };
}
export default Database;