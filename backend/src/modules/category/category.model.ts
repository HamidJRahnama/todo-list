import mongoose, { Types } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId:{ type: Types.ObjectId, ref:"Users", required:true}
  },
  { timestamps: true } 
);

export default mongoose.model("Categorys", categorySchema);
