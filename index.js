const mongoose = require("mongoose");
const port = 5000;
const app = require("./app");
//mongoose.connect('mongodb://localhost/testaroo', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// mongoose.connection.once('open', () =>{
//     console.log('connection established')
// }).on('connectionError',(err) =>{
//     console.log(err);
// })

mongoose.connect(
  "mongodb+srv://root:Vikranth@202148@vkcluster.gvjbdfi.mongodb.net/instaclone?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected")
);
app.listen(port, () => console.log(`App listening on port ${port}!`));
