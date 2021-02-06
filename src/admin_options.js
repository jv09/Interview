const AdminBro = require('admin-bro')
const Question = require('../models/question')
const topic = require('../models/Topic')
const Interview = require('../models/interviewexp')
const Company = require('../models/company')

const options = {
    resources: [Question,topic,Interview,Company],
};

module.exports = options;