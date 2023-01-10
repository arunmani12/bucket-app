import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import Bucket from "../../models/Bucket";
import mongoose from 'mongoose'
import Card from '../../models/Card'



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

      const dataFromToken = verify(jwt, secret);
     
      let card = await Card.findById(req.body.cardId)

      let user = await User.findOne({ email: dataFromToken.email })

      
      await User.update(
        { _id: user.id }, 
        { $push: { history:{card: card._id,time:new Date()} } },
        { $push: { historyTime:{
            id:req.body.cardId,
            time:new Date()
        } } },
       );

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log(e);

      return res.status(403).json({ message: "something went to wrong" });
    }
  }
}
