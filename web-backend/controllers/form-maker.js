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
                msg: form.users,
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
const formMakerPost = (req = request, res = response) => {
    if (req.body.data !== null) {
      readFile(path, 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        let usersData = JSON.parse(data);
        let userIndex = usersData.users.findIndex(u => u.email === req.body.email);
        if (userIndex === -1) {
          // Usuario no existe, agregar nuevo usuario
          usersData.users.push({
            email: req.body.email,
            forms: [
              {
                formId: req.body.formId,
                url: req.body.url,
                register_url: req.body.register_url
              }
            ]
          });
        } else {
          // Usuario existe, agregar formulario a su lista
          usersData.users[userIndex].forms.push({
            formId: req.body.formId,
            url: req.body.url,
            register_url: req.body.register_url
          });
        }
        writeFile(path, JSON.stringify(usersData), err => {
          if (err) {
            console.log(err);
            return;
          }
          console.log('Formulario guardado correctamente');
        });
      });
    }
    res.json({
      body: req.body.data,
      msg: 'post API - controlador form-maker'
    });
    console.log(req.body);
  };
  
module.exports = {
    formMakerGet,
    formMakerPost
}
