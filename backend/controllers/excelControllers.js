import Excel from "../models/excel.js";
export const storeDataByValiditing = async (req, res) => {
    try {
        const { entries } = req.body;
        
        if (!entries || !Array.isArray(entries) || entries.length === 0) {
            return res.json({ success: false, message: "Missing Data" });
        }

        for (const data of entries) {
            if (!data.name || !data.amount || !data.verified) {
                return res.json({ success: false, message: "Missing Credentials" });
            }
        }

        const excel = new Excel({ entries });
        await excel.save();
        return res.json({ success: true, message: "Excel saved to database successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}