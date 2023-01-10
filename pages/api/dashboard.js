import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import Bucket from "../../models/Bucket";
import Card from "../../models/Card";

dbConnect();

const secret = "arunmani";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    try {
      const jwt = req.headers.authorization;

      if (!jwt) {
        res.status(403).json({ message: "un authorized" });
      }

      const dataFromToken = verify(jwt, secret);

      const currentUser = await User.findOne({ email: dataFromToken.email })
        .populate("bucket")
        .populate("history");



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



    //   return res.status(200).json({ user: currentUser, message: "success" });
    } catch (e) {
      console.log(e);

      return res.status(403).json({ message: "something went to wrong" });
    }
  }
}
