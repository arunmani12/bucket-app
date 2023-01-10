import User from "../../models/User";
import { verify } from "jsonwebtoken";
const secret = "arunmani";
import Card from "../../models/Card";


export default async function handler(req, res) {
  const { cookies } = req;

  const jwt = cookies.token;

  if (!jwt) {
    return res.json({ message: " you are already not logged in..." });
  } else {
    const jwt = req.cookies.token;

    const dataFromToken = verify(jwt, secret);
 
  

    User.find({ email: dataFromToken.email })
    .lean()
    .populate({ path: "history" })
    .exec(function (err, docs) {
      var options = {
        path: "history.card",
        model: "Card",
      };

      if (err) {

        return res.status(403).json({ message: "something went to wrong" });

      };

      User.populate(docs, options, function (err, user) {
    
        var history = user[0].history

        // console.log(history)

        return res.status(200).json({ history, message: "success" });

      });
    });

  }
}
