const AdminBro = require('admin-bro')
const Question = require('../models/question')
const topic = require('../models/Topic')


const options = {
    resources: [Question,topic],
};

module.exports = options;