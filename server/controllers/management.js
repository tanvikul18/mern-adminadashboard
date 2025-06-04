import UserModel from "../models/User.js"
import AffliateStatModel from "../models/AffliateStat.js";
import TransactionModel from "../models/Transactions.js"
import mongoose from "mongoose";
export const getAdmin = async(req,res)=>{

try{ 
    
    const admins = await UserModel.find({role: 'admin'}).select("-password");
    
    return res.status(201).json(admins)
    }
    catch(err){
        return res.status(404).json({message : err.message})

    }
}
export const getPerformance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const userWithStats = await UserModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);
   console.log(userWithStats)
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return TransactionModel.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
