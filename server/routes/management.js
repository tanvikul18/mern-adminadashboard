import express from "express";
import { getAdmin,getPerformance } from "../controllers/management.js";
   const router = express.Router();
   
   router.get("/admins",getAdmin);
  router.get("/performance/:id",getPerformance);
   export default router;