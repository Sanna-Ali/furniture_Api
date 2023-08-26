
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'Product'
          },
        qty:{
            type:Number,
            required:true
        }
   } ],
   user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  totalPrice:{
    type:Number,
    required:true
  }
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
