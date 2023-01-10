import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import Bucket from "../../models/Bucket";
import Card from '../../models/Card'
// const uuidv4 = require("uuid/v4")
import { v4 as uuidv4 } from "uuid";

dbConnect();

const secret = "arunmani";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const jwt = req.cookies.token;

      if (!jwt) {
        res.status(403).json({ message: "un authorized" });
      }

      var card = await Card.findById(req.body.cardId)
      
      const dataFromToken = verify(jwt, secret);

      await Bucket.update(
        { _id: req.body.oldBucket }, 
        { $pull: {card: card._id }},
     );

     await Bucket.update(
        { name: req.body.newBucket }, 
        { $push: { card }},
     );
  

     User.find({ email: dataFromToken.email })
     .lean()
     .populate({ path: "bucket" })
     .exec(function (err, docs) {
       var options = {
         path: "bucket.card",
         model: "Card",
       };

       if (err) {

         return res.status(403).json({ message: "something went to wrong" });

       };
       User.populate(docs, options, function (err, user) {
     

         return res.status(200).json({ user: user[0], message: "success" });

       });
     });


    } catch (e) {
      console.log(e);

      return res.status(403).json({ message: "something went to wrong" });
    }
  }
}
