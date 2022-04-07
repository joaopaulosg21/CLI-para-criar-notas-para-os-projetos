import { config } from "dotenv";
config({
    path:'.env'
})

export default {
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST
}