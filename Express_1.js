import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Laptops } from "./Laptops.js";
import { Mobiles } from "./Mobiles.js";
import { Earpods } from "./Earpods.js";
import { Tvs } from "./Tv.js";
import { Hometheatres } from "./Hometheatres.js";
import { Keyboards } from "./Keyboards.js";
import { Mouses } from "./Mouse.js";
import { Chargers } from "./Chargers.js";
import { Usersignup } from "./Signup.js";
import { verifytoken } from "./Tokenverification.js";
import { Orders } from "./Orderconfirmation.js";

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/amazondb";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const JWT_SECRET = "92297557";
const JWT_EXPIRES_IN = "1h";




app.get("/", (req, res) => {
  res.send("Hello, MongoDB + Node.js 🚀");
});

app.get("/laptops", async (req, res) => {
  try {
    const response = await Laptops.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});


app.get("/mobiles", async (req, res) => {
  try {
    const response = await Mobiles.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.get("/earpods", async (req, res) => {
  try {
    const response = await Earpods.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.get("/tvs", async (req, res) => {
  try {
    const response = await Tvs.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.get("/hometheatres", async (req, res) => {
  try {
    const response = await Hometheatres.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.get("/keyboards", async (req, res) => {
  try {
    const response = await Keyboards.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.get("/mouses", async (req, res) => {
  try {
    const response = await Mouses.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.get("/chargers", async (req, res) => {
  try {
    const response = await Chargers.find()
    res.json({ message: response });
  } catch (error) {
    res.send("error");
  }
});

app.post("/getwishlist", async (req, res) => {
  const { _id } = req.body
  var datas = []
  try {
    const laptops = await Laptops.find({ _id: { $in: _id } })
    //console.log("-------------------------------->",laptops);

    const mobiles = await Mobiles.find({ _id: { $in: _id } })
    const earpods = await Earpods.find({ _id: { $in: _id } })
    const tvs = await Tvs.find({ _id: { $in: _id } })
    const hometheatres = await Hometheatres.find({ _id: { $in: _id } })
    const keyboards = await Keyboards.find({ _id: { $in: _id } })
    const mouses = await Mouses.find({ _id: { $in: _id } })
    const chargers = await Chargers.find({ _id: { $in: _id } })
    datas = [...laptops, ...mobiles, ...earpods, ...tvs, ...hometheatres, ...keyboards, ...mouses, ...chargers]
    //console.log(datas);
    res.json({ message: datas });
  }
  catch (error) {
    //console.log(error);

    res.json({ message: "error" });
  }
});

app.get("/getoffers", async (req, res) => {
  var datas = []
  try {
    const laptops = await Laptops.find({ offer: { $gt: 0 } });
    const mobiles = await Mobiles.find({ offer: { $gt: 0 } });
    const earpods = await Earpods.find({ offer: { $gt: 0 } });
    const tvs = await Tvs.find({ offer: { $gt: 0 } });
    const hometheatres = await Hometheatres.find({ offer: { $gt: 0 } });
    const keyboards = await Keyboards.find({ offer: { $gt: 0 } });
    const mouses = await Mouses.find({ offer: { $gt: 0 } });
    const chargers = await Chargers.find({ offer: { $gt: 0 } });
    datas = [...laptops, ...mobiles, ...earpods, ...tvs, ...hometheatres, ...keyboards, ...mouses, ...chargers]
    //console.log(datas);
    res.json({ message: datas });
  }
  catch (error) {
    //console.log(error);
    res.json({ message: "error" });
  }
});

app.post('/getuser',verifytoken,async(req,res)=>{
  try {
    const userdata=await Usersignup.findOne({_id:req.id})
    //console.log("---->",userdata);
    res.json({message:userdata});
  } catch (error) {
    res.json({ message: "error" });
  }

})

app.post("/getcart",async(req, res) => {
  const { ids } = req.body
  var datas = []
  try {
    const laptops = await Laptops.find({ _id: { $in: ids } })
    //console.log("-------------------------------->",laptops);

    const mobiles = await Mobiles.find({ _id: { $in: ids } })
    const earpods = await Earpods.find({ _id: { $in: ids } })
    const tvs = await Tvs.find({ _id: { $in: ids } })
    const hometheatres = await Hometheatres.find({ _id: { $in: ids } })
    const keyboards = await Keyboards.find({ _id: { $in: ids } })
    const mouses = await Mouses.find({ _id: { $in: ids } })
    const chargers = await Chargers.find({ _id: { $in: ids } })
    datas = [...laptops, ...mobiles, ...earpods, ...tvs, ...hometheatres, ...keyboards, ...mouses, ...chargers]
    //console.log(datas);
    res.json({ message: datas});
  }
  catch (error) {
    //console.log(error);
    res.json({ message: "error" });
  }
});


app.post("/getpricedata",async (req, res) => {
  const { ids } = req.body
  //console.log(ids);
  
  var datas = []
  try {
    // const userdata=await Usersignup.findOne({_id:req.id})
    //console.log(userdata);
    
    const laptops = await Laptops.find({ _id: { $in: ids } })
    //console.log("-------------------------------->",laptops);

    const mobiles = await Mobiles.find({ _id: { $in: ids } })
    const earpods = await Earpods.find({ _id: { $in: ids } })
    const tvs = await Tvs.find({ _id: { $in: ids } })
    const hometheatres = await Hometheatres.find({ _id: { $in: ids } })
    const keyboards = await Keyboards.find({ _id: { $in: ids } })
    const mouses = await Mouses.find({ _id: { $in: ids } })
    const chargers = await Chargers.find({ _id: { $in: ids } })
    datas = [...laptops, ...mobiles, ...earpods, ...tvs, ...hometheatres, ...keyboards, ...mouses, ...chargers]
    //console.log(datas);
    res.json({ message: datas});
  }
  catch (error) {
    //console.log(error);
    res.json({ message: "error" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const userdata = await Usersignup.insertMany([{ name: name, email: email, password: hashedPassword }])
    //console.log(userdata);
    res.json({ message: "Signup Successfully" })
  }
  catch (error) {
    //console.log(error);
    res.json({ message: "Email id already exists" })
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const finddata = await Usersignup.findOne({ email: email })
    //console.log(finddata)
    if (!finddata) {
      res.json({ message: "Invalid Credentials" })
    }
    else {
      const match = await bcrypt.compare(password, finddata.password);
      //console.log(match);
      if (match) {
        const token = jwt.sign({ id: finddata._id, email: finddata.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        //console.log(token);  
        res.json({ message: "Login Successfully", Token: token })
      }
      else {
        res.json({ message: "Password Wrong" })
      }
    }
  }
  catch (error) {
    //console.log(error);
    res.json({ message: "Login Failed" })
  }
});


app.post("/updatepassword", async (req, res) => {
  try {
    const { email, password } = req.body
    const finddata = await Usersignup.findOne({ email: email })
    //console.log(finddata);
    if (finddata) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const update = await Usersignup.updateOne({ email: email }, { $set: { password: hashedPassword } })
      res.json({ message: "Password Update Successfully" })
    }
    else {
      res.json({ message: "Mail Id Not Found" })
    }
  }
  catch (error) {
    //console.log(error);
    res.json({ message: "Password Update Failed" })
  }
});

app.post('/confirmation',async(req,res)=>{
  const{email,cartitems,cartquantity,wishlist,total}=req.body
  try {
    //const deletedata=await Orders.deleteOne({email:email})
    const response=await Orders.insertMany([{email:email,cartitems:cartitems,cartquantity:cartquantity,wishlist:wishlist,total:total}])
    //console.log(response);
    res.json({message:"Order Updated Successfully"})
  } catch (error) {
    //console.log("error");
    res.json({message:"Order Updated Failed"})
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
