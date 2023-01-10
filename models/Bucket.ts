import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const bucketModel = new Schema( {
    name:{type:String,required:true},
    card:[{ 
        type:Schema.Types.ObjectId,
        ref:'Card'
    }]
},
{ timestamps: true })

module.exports = mongoose.models.Bucket ||  mongoose.model("Bucket", bucketModel);