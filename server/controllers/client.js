     import ProductModel from "../models/Product.js"
import ProductStatModel from "../models/ProductStat.js"
import UserModel from "../models/User.js";
import TransactionModel from "../models/Transactions.js";
import getCountryIso3 from "country-iso-2-to-3"
export const getProducts = async(req,res)=>{

try{ 
   
    const products = await  ProductModel.find({});
    const productswithStat = await Promise.all(
          products.map(async(product)=>{
            const stat =await ProductStatModel.find({
                productId : product._id
            })
            return{
                ...product._doc,
                stat, 
            }
          })
    )
   
    return res.status(201).json(productswithStat)
    }
    catch(err){
        return res.status(404).json({message : err.message})

    }
}
export const getCustomers = async(req,res)=>{

try{ 
    
    const customers = await UserModel.find({role: 'user'}).select("-password");
   
    return res.status(201).json(customers)
    }
    catch(err){
        return res.status(404).json({message : err.message})

    }
}
export const getTransactions = async (req, res) => {
  try {
    let { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    page = parseInt(page);
    pageSize = parseInt(pageSize);

    // Validate page and pageSize
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(pageSize) || pageSize < 1) pageSize = 20;

    // Generate sort object
    let sortFormatted = {};
    if (sort) {
      try {
        const sortParsed = JSON.parse(sort);
        sortFormatted[sortParsed.field] = sortParsed.sort === "asc" ? 1 : -1;
      } catch (err) {
        return res.status(400).json({ message: "Invalid sort parameter" });
      }
    }

    // Build filter
    const filter = {};
    if (search) {
      filter.$or = [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ];
    }

    const skip = (page - 1) * pageSize;

    const transactions = await TransactionModel.find(filter)
      .sort(sortFormatted)
      .skip(skip)
      .limit(pageSize);

    const total = await TransactionModel.countDocuments(filter);

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getGeography = async(req,res)=>{

try{ 
    
    const users = await UserModel.find();
    const mappedLocations = users.reduce((acc,{country})=>{
          const countryISO3 = getCountryIso3(country);
          if(!acc[countryISO3]){
           acc[countryISO3] = 0;
          }
           acc[countryISO3]++;
           return acc;
    },{})
   
     const formattedLocations = Object.entries(mappedLocations).map(
        ([country,count])=>{
            
            return {id: country,value : count}
        }
     )
      console.log(formattedLocations)
    return res.status(201).json(formattedLocations)
    }
    catch(err){
        return res.status(404).json({message : err.message})

    }
}