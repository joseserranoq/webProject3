const { response, request } = require('express');

//metodos get,post.. etc
const indexGet = (req = request, res = response) => {
    console.log(res, req)
    res.json({
        msg: 'get API - controlador'
    })
}

module.exports = {

}