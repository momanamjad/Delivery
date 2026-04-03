import express from 'express';
import {  addToCart, removeFromCart, getCart} from '../controllers/cartControler';
const cartRouter = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';





cartRouter.post('/add',authMiddleware,addToCart);
cartRouter.post('/remove',authMiddleware,removeFromCart);
cartRouter.post('/get',authMiddleware,getCart);




export default cartRouter;