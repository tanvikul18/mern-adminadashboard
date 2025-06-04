import UserModel from "../models/User.js"
import OverallStatModel from "../models/OverallStat.js"
import TransactionModel from "../models/Transactions.js"
import mongoose from "mongoose";
export const getUser = async(req,res)=>{

try{
   
    const id= req.params.id;
    
    const user = await UserModel.findById(id);
     console.log(user)    
    return res.status(201).json(user)
    }
    catch(err){
        return res.status(404).json({message : err.message})

    }
}
export const getDashboardStats = async(req,res)=>{

  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await TransactionModel.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall Stats */
    const overallStat = await OverallStatModel.find({ year: currentYear });
   console.log("overallStat",overallStat[0])
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = overallStat[0].dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}