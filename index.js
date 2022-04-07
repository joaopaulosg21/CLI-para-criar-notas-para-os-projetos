import {createInterface} from 'readline';
import { projetos,anotacoes } from './conexao.js';
const readline = createInterface({
    input:process.stdin,
    output:process.stdout
})

const opcoes = `
    Escolha uma opção: 
    1 - Ver projetos,
    2 - Adicionar projeto,
    3 - Ver anotações,
    4 - Adicionar anotação
`
readline.question(opcoes,(item)=>{
    if(item == 1){
        const result = projetos.findAll();
        result.then((values)=>{
            values.map((item)=>{
                console.log(item.dataValues.title)
            })
        })
    }else if(item == 2){
        readline.question("Titulo: ",(title)=>{
            projetos.create({
                title:title
            });
            console.log(`Projeto ${title} criado`)
        })
    }else if(item == 3){
        readline.question("Nome do projeto: ",(value)=>{
            const result = projetos.findAll({logging:false});
            result.then((values)=>{
                values.map((item)=>{
                    if(value == item.dataValues.title){
                        const anot = anotacoes.findAll({logging:false,where:{projetoId:item.dataValues.id}})
                        anot.then((data)=>{
                            data.map((item)=>{
                                console.log(`${item.dataValues.id} - ${item.dataValues.title}`)
                            })
                        })
                    }
                })  
            })
        })
    }else if(item == 4){
        readline.question("Nome do projeto: ",async(value)=>{
            const projeto = await projetos.findOne({where:{title:value}});
            if(projeto){
                readline.question("Digite a anotação: ",async(title)=>{
                    await anotacoes.create({
                    title:title,
                    projetoId:projeto.dataValues.id
                    })
                    console.log("Nova anotação criada")
                })
            }else{
                console.log("Projeto não existe")
            }
  
        })
    }
})