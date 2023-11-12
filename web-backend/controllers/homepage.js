const { response, request } = require('express');

//metodos get,post.. etc
const homepageGet = (req = request, res = response) => {
    res.json({
        msg: 'get API - controlador'
    })
}

module.exports = {
    homepageGet
}