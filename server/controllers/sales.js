import OverallStatModel from "../models/OverallStat.js"
export const getSales = async(req,res)=>{

try{
   
    const sale = await OverallStatModel.find();
    return res.status(201).json(sale[0])
    }
    catch(err){
        return res.status(404).json({message : err.message})

    }
}