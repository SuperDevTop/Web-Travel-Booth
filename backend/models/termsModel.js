import mongoose from "mongoose";

const termsSchema = mongoose.Schema(
    {
        title: {
            type: "String",
            required: true,
        },
        description: {
            type: "String",
            required: true,
        }
    }, {
        timestamps: true
    }
);

const Terms = mongoose.model("Terms", termsSchema);
export default Terms;