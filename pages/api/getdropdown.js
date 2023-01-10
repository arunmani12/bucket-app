import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import Bucket from "../../models/Bucket";
import Card from "../../models/Card";
// const uuidv4 = require("uuid/v4")
import { v4 as uuidv4 } from "uuid";

dbConnect();

const secret = "arunmani";

export default async function handler(req, res) {
  const { method } = req;


    try {
      const jwt = req.cookies.token;

      const dataFromToken = verify(jwt, secret);

      if (!jwt) {
        res.status(403).json({ message: "un authorized" });
      }

     
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
      
          let category = []

          for (let bck of user[0].bucket){

            category.push({
                name:bck.name,
                id:bck._id
            })

          }

          console.log(category)

          return res.status(200).json({ category, message: "success" });

        });
      });
      
      

    } catch (e) {
      console.log(e);

      return res.status(403).json({ message: "something went to wrong" });
    }
  
}
