const db = require('../models')
const Sequelize = require('sequelize');
const Message = db.sequelize.models.Message;
const Op = Sequelize.Op;



/**
 * handling message requests
 */
const MessageController = {

    

    /**
     * Send Message
     * @param {*} req 
     * @param {*} res 
     */
     async postMessage(req, res) {
        try {

            await sequelize.query(`
            INSERT INTO messages (user_id, content)
            VALUES ('${req.user.googleId}', '${req.body.message}');
            `, {type: sequelize.QueryTypes.INSERT});
            return res.redirect('/');
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    
}

module.exports = MessageController