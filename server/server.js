const express=require('express');
const app=express();
const cors =require('cors')
const bodyParser=require('body-parser')
require('./config/conn');
const port =process.env.PORT || 5002
app.use(cors())
app.use(bodyParser.json({limit: '30mb',extended:false}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// app.use(express.static(path.join(__dirname, "/frontend/build")));
//   app.get('/',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
//   })
app.use('/api/users',require('./routes/user'));
app.use('/api/auth',require('./routes/login'));

app.use('/api/posts',require('./routes/postmessage'))

app.listen(port,()=>{
    console.log(`server running at port no:${port}`);
})