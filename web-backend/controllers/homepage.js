const { response, request } = require('express');

//metodos get,post.. etc
const homepageGet = (req = request, res = response) => {
    //console.log(res, req)
    res.json({
        msg: 'get API - controlador'
    })
}

const homepagePost = (req = request, res = response) => {
    res.json({
        msg: 'post API - controlador'
    })
}
module.exports = {
    homepageGet,
    homepagePost
}