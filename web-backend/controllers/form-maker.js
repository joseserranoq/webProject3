const { response, request } = require('express');
const { writeFile,readFile } = require('fs');   
//metodo get,post.. etc
const path = './db/data.json'

//el metodo get se utiliza para obtener la informacion de los urls de un usuario
const formMakerGet = (req = request , res = response) => {
    let forms_query;
    //console.log(req.body)
    if(req.body.data !== null){
        readFile(path,'utf-8',(err,data)=>{
            if(err){
                console.log(err)
                return;
            }
            form = JSON.parse(data)
            //console.log(form)
            for (i in form.users){
                if(form.users[i].email === req.body.email){
                    console.log('se ha encontrado el usuario en el getForm-maker')
                    forms_query = form.users[i].forms
                    //console.log(forms_query)                    
                }
            }   
            res.json({
                msg: 'get API - controlador form-maker',
                forms: JSON.stringify(forms_query)
            })
        })
    }

}


/* 
{
    email: localStorage.emailVar,
    formId: this.currentForm,
    url: formUrl,
    register_url: 'aqui va el url de registro'
}
*/
const formMakerPost = (req = request , res = response) => {
    let form;
    if(req.body.data !== null){
        readFile(path,'utf-8',(err,data)=>{
            if(err){
                console.log(err)
                return;
            }
            form = JSON.parse(data)
            console.log(form)
            //generar cambio
            //TODO: verificar al usuario asociado con el form
            console.log(req.body)
            for (i in form.users){
                if(form.users[i].email === req.body.email){
                    let user = req.body
                    
                    console.log('se ha encontrado el usuario'+ user)
                    form.users[i].forms.push(
                    {
                        formId: user.formId,
                        url: user.url, 
                        register_url: user.register_url
                    })
                }
            }            
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
