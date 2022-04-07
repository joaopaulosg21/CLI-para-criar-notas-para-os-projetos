import { Sequelize,DataTypes } from "sequelize";
import config from "./config.js";

const { database,user,password,host} = config;

const sequelize = new Sequelize(database,user,password,{
    host:host,
    dialect:"mysql"
})

const projetos = sequelize.define('projetos',{
    title:{
        type:DataTypes.STRING
    }
})
const anotacoes = sequelize.define('anotacoes',{
    title:{
        type:DataTypes.STRING
    }
})


projetos.hasMany(anotacoes);
anotacoes.belongsTo(projetos);

export {projetos,anotacoes}