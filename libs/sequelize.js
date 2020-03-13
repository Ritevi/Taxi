var config = require('../config');
var Sequelize = require('sequelize');
const seqParams= config.get('sequelize');

var sequelize = new Sequelize(seqParams.database, seqParams.user, seqParams.password, {
    host: seqParams.host,
    dialect:seqParams.dialect,
    charset: 'utf8',
    dialectOptions: {
        collate: 'utf8_general_ci'
    }
});

module.exports = sequelize;