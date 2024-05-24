const mongoose=require('mongoose')
const connectionString=process.env.DB_Connection_string
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB atlas Connected with authServer!!!");
}).catch((err)=>{
    console.log("MongoDB atlas connection Failed!!",err);
})