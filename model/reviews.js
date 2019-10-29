const db = require("./conn.js");
const bcrypt = require("bcryptjs");
class Reviews{
    constructor( boxerReview){
        this.boxerReview = boxerReview;
  
    }

    }
    async reviews() {
        try {
            const response = await db.one(
                `SELECT id FROM boxerReview WHERE boxers = $1;`,
                [this.email_address]
            ); 
            
        }
    }
    async save(){
        console.log("this is the save method", this.boxerReview);
        const response = db.one(
            `insert into boxerReview( boxerReview($1) returning id;`, 
            [
                this.boxerReview = boxerReview;
        ]);
        return response;

    };catch(err){
        return err.message;
    };

module.exports = Reviews;