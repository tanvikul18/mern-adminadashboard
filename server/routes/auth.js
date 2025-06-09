import express from "express";
import {createUser,getLoggedInUser,protectRoute} from "../controllers/auth.js";
import { reqLogin } from "../middleware/requiredLogin.js";
   const router = express.Router();
    router.get("/protected",reqLogin,protectRoute);
 router.post("/signup",createUser);
  router.post("/signin",getLoggedInUser);
 //  router.post("/logout",loggedOutUser);
   export default router;