// Exception because this is a CLASS

import {print, OutputType} from "../helpers/print.js"
export default class Exception extends Error{
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGODB = "Cannot connect to MongoDB"
    static USER_EXIST = "User already exists"
    static CANNOT_REGISTER_USER = "Cannot register user"
    static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password"
    constructor(message){
        super(message) // call constructor of parent class Error
        print(message, OutputType.ERROR)
        //this.validationErrors = validationErrors
    }
}