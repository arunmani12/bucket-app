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
      const jwt = req.cookies.token;

      if (!jwt) {
        res.status(403).json({ message: "un authorized" });
      }

      const dataFromToken = verify(jwt, secret);

      await Card.findByIdAndDelete(req.body.id);

      var newHistory = [];


      await User.find({ email: dataFromToken.email })
        .lean()
        .populate({ path: "history" })
        .exec(function (err, docs) {
          var options = {
            path: "history.card",
            model: "Card",
          };

          if (err) {
            return res.status(403).json({ message: "something went to wrong" });
          }

          User.populate(docs, options, function (err, user) {
            var history = user[0].history;

          

            newHistory = history.filter((d) => d.card !== null);


            const filter = { email: dataFromToken.email };

            const update = { history: newHistory };
            
            User.findOneAndUpdate(filter, update,null,function (err, docs) {

              if (err){
                console.log(err)
              }
              else{
               
                return res.status(200).json({ message: "success" });

               }

            });
            
          });
        });


    } catch (e) {
      console.log(e);

      return res.status(403).json({ message: "something went to wrong" });
    }
  }
}
