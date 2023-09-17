const express = require('express')
const app = express()
const mongoose = require("mongoose")

require('dotenv').config()
app.use(express.static('public'))
app.set("view engine", "ejs");


const url_model = require("./schema/urls")

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected"))

const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

function shorted(url,host){
    const random_string = generateRandomString()
    
    const new_link = `${host}/${random_string}`
    
    try{
        const new_link_db = new url_model({
            old_url: url,
            new_url: new_link,
            clicks : 0
        })

        const save_db = new_link_db.save()
        console.log("new link saved to Db")
    }catch(e){
        console.log(e)
    }
   
    console.log(new_link)
    return new_link
}


app.get("/",function(req,res){
    res.render("index")

})

app.get("/result",function(req,res){
    console.log(req.query.link)
    console.log(req.get('host'))
    const random_string = shorted(req.query.link,req.get('host').toString())
    res.render("result",{
        new_url : random_string,
        old_url : req.query.link.toString()
    })
})

app.get("/*",async function(req,res){
    const path = req.path.replace("/","")
    console.log(path)
    try{
        let url_list = await url_model.findOne({new_url:{$regex:path}})
        console.log(url_list)
        if(url_list.length<1){
            res.render("index")
        }else{
            res.writeHead(301, { Location:url_list.old_url});
            res.end()
        }

    }catch(e){
        console.log(e)
    }
    
})


app.listen(process.env.PORT,function(){
    console.log("app listening on port :",process.env.PORT)
})