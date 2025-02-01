import mongoose from "mongoose";

const ExcelSchema = new mongoose.Schema({
    entries: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            verified: {
                type: String,
                required: true
            },
            additionalFields: {
                type: Map,
                of: mongoose.Schema.Types.Mixed
            }
        }
    ],
});

const Excel = mongoose.model("Excel", ExcelSchema);
export default Excel;
