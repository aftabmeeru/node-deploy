const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: {
        type: String,
        uniquie: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.text(v);
                // above code is taken from regexr.com where we can get code
            },
            message: (props) => `${ props.value } is not a valid email`
        },
        required: true,
    },
    password: { type: String, minLength: 6, required: true },
    token: String,
});

exports.User = mongoose.model('User', userSchema);