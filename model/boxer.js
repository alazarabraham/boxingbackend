const db = require("./conn");
class Boxers {
    constructor(name, bio,currentWeight,picture,video,trainer,promoter,country,fightingStyle,network,weightclass,beltnames ) {
        this.name = name;
        this.bio = bio;
        this.currentWeight;
        this.picture;
        this.video;
        this.trainer;
        this.promoter;
        this.country;
        this.fightingStyle;
        this.network;
        this.weightclass;
        this.beltnames;
    }
    static async getAll() {

        try {
            const response = await db.any(`SELECT * FROM boxer;`);
            return response;
        } catch (error) {
            return error.message;

        }
    }
    static async getById(id) {
        try {
            const response = await db.one(
                `SELECT * from boxer where id =$1;`,
                [id]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }
}


module.exports = Boxers;