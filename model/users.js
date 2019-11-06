const db = require("./conn.js");
const bcrypt = require("bcryptjs");
class User{
    constructor(first_name, last_name, email_address, password){
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_address = email_address;
        this.password = password;
    }
    checkPassword(hashPassword){
        return bcrypt.compareSync(this.password,hashPassword);
    }
    async login() {
        try {
            const response = await db.one(
                `SELECT id, first_name, last_name, password FROM boxinglogin WHERE email = $1;`,
                [this.email_address]
            );
            const isValid = this.checkPassword(response.password);

            if (!!isValid) {
                const { id, first_name, last_name } = response;
                return { isValid, id, first_name, last_name };
            } else {
                return { isValid };
            }
        } catch (err) {
            return err.message;
        }
    }
    async save(){
        console.log("this is the save method", this.email_address);
        const response = db.one(
            `insert into boxinglogin(first_name,last_name,email,password)values($1,$2,$3,$4) returning id;`, 
            [
            this.first_name, 
            this.last_name,
            this.email_address,
            this.password
        ]
        );
        return response;

    };catch(err){
        return err.message;
    };
    
    
}

module.exports = User;