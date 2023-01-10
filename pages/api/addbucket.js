import dbConnect from "../../db/connectDb";
import User from "../../models/User";
import { verify } from "jsonwebtoken";
import Bucket from '../../models/Bucket'

dbConnect();

const secret = "arunmani";


export default async function handler(req, res) {

    const { method } = req;

    if (method === "POST") {

        try{
            
            const jwt = req.cookies.token;

            if (!jwt) {
                res.status(403).json({ message: "un authorized" });
            }
    
            const dataFromToken = verify(jwt, secret);
    
            const currentUser = await User.findOne({ email: dataFromToken.email })

            const bucket = await new Bucket({
                name:req.body.bucketTitle,
                card:[]
            })

            await bucket.save()

            await User.update(
                { _id: currentUser.id }, 
                { $push: { bucket } },
            );
            
            return res.status(200).json({ message:'success'});

        
        }catch(e){

            console.log(e)

            return res.status(403).json({ message:'something went to wrong' });
        }

    }

}