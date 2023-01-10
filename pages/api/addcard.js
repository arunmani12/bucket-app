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

      
      let card = new Card({
        name: req.body.title,
        url: req.body.link,
      })

      await Bucket.update(
        { _id: req.body.id }, 
        { $push: { card } },
     );

      await card.save()
  

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log(e);

      return res.status(403).json({ message: "something went to wrong" });
    }
  }
}
