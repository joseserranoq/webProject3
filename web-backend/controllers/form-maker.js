const { response, request } = require('express');
const { writeFile,readFile } = require('fs');   
//metodo get,post.. etc
const path = './db/data.json'
const formMakerGet = (req = request , res = response) => {
    //console.log(req.query)
    res.json({
        msg: 'get API - controlador form-maker'
    })
}

const formMakerPost = (req = request , res = response) => {
    let form;
    if(req.body.data !== null){
        readFile(path,'utf-8',(err,data)=>{
            if(err){
                console.log(error)
                return;
            }
            form = JSON.parse(data)
            console.log(form)
            //generar cambio
            //TODO: verificar al usuario asociado con el form
            form.users[0].forms.push({
                formId: 'form-1',
                url: './db/sample.txt' , 
                content: req.body.data
            })
            
            //se escribe nuevamente el json con la nueva info
            writeFile(path,JSON.stringify(form),(err)=>{
                if(err){
                    console.log(err)
                    return;
                }
                console.log('se ha escrito correctamente')
            })

        })

    }


    res.json({
        body: req.body.data,
        msg: 'post API - controlador form-maker'
    })
    console.log(req.body)

}
module.exports = {
    formMakerGet,
    formMakerPost
}
