import express from 'express';
const router = express.Router();
import CartsManager from '../dao/models/carts.model.js';

import mongoose from 'mongoose';
const Cart = mongoose.model('carts');
const cartsManager = new CartsManager(Cart);

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartsManager.getCartById(cartId);
        
        if (cart && cart !== "Carrito no encontrado.") {
            res.render('cart', { cart });
        } else {
            res.status(404).json({ message: "Carrito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error de servidor" });
    }
});

export default router;