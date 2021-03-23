const { check, validationResult } = require('express-validator');
exports.validateSendMessageRequest = [
    check('message')
    .notEmpty()
    .withMessage('Message is required'),
];

exports.isRequestValidate = (req, res, next) => {
    
        const errors = validationResult(req);
        if(errors.array().length > 0 ){
            return res.status(400).json({error: errors.array()[0].msg})
        }
        next();
}