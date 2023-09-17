const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    old_url : {
        type : String,
        require : true
    },
    new_url: {
        type : String,
        require : true
    },
    clicks : {
        type : Number,
        require : true
        
    }
})


const url = new mongoose.model("urls",schema)


module.exports = url 