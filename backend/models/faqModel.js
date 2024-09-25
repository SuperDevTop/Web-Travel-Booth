import mongoose from 'mongoose'

const faqModel = mongoose.Schema(
  {
    question:  { type: String },
    answer:  { type: String },
    status: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const Faq = mongoose.model("Faq", faqModel);

export default Faq;
