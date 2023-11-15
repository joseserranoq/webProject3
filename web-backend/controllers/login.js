const { response, request } = require('express');
const { writeFile,readFile } = require('fs');  

const path = './db/data.json'
//metodos get,post.. etc
const loginGet = (req = request, res = response) => {
    //console.log(res, req)
    
    res.json({
        msg: 'get API - controlador loginGet'
    })
}

const loginPost = (req = request, res = response) => {
    console.log(req.body)

    readFile(path,'utf-8',(err,data)=>{
        if(err){
            console.log(error)
            return;
        }
        jsonData = JSON.parse(data)
        console.log(jsonData)
        //Se realiza el ingreso del nuevo usuario al data.json
        jsonData.users.push({
            email: req.body.email,
            password: req.body.password, 
            forms: []
        })
        
        //se escribe nuevamente el json con la nueva info
        writeFile(path,JSON.stringify(jsonData),(err)=>{
            if(err){
                console.log(err)
                return;
            }
            console.log('se ha escrito correctamente')
        })

    })

    res.json({
        msg: 'post API - controlador loginPost'
    })
}
module.exports = {
    loginGet,
    loginPost
}