import express from 'express'
import cartModel from '../config/models/cart.js'
import productModel from '../config/models/products.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router();
// helper function to get cart
const getCart = async (userId, guestId) => {
    if (userId) {
        return await cartModel.findOne({ userId: userId });
    }
    else if (guestId) {
        return await cartModel.findOne({ guestId });
    }
    else {
        return null;
    }
}




// create the cart post request fro loginin user public 
router.post('/', async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        // user login in aur guest
        let cart = await getCart(userId, guestId);

        // cart exist need  to update
        if (cart) {

            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            );

            if (productIndex > -1) {

                cart.products[productIndex].quantity += quantity;

            } else {

                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }

            // Correct total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();

            return res.status(200).json({
                success: true,
                cart
            });

        } else {

            const newCart = await cartModel.create({
                userId: userId ? userId : undefined,

                guestId: guestId
                    ? guestId
                    : "guest_" + new Date().getTime(),

                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity
                    }
                ],

                totalPrice: product.price * quantity
            });

            return res.status(201).json({
                success: true,
                cart: newCart
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
})

// put route to update the cart qunatity fro guest and user
router.put('/', async (req, res) => {
    const { productId, quantity, size, color, userId, guestId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size == size && p.color == color);

        if (productIndex > -1) {
            // update 
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            }
            else {
                cart.products.splice(productIndex, 1);
            }
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.json(cart);
        }
        else {
            return res.status(404).json({ message: "product not found in cart" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
})


// delete the product from cart
router.delete('/', async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);
        if (!cart) {
            return res.status(404).json({ message: "cart not found" });
        }

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId && p.size == size && p.color == color);

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else {
            return res.status(400).json({ message: "product not found in cart" });
        }

    }
    catch (error) {
        return res.status(500).json({ message: "server error" });
    }
})


// route get to login user cart
router.get('/', async (req, res) => {
    const { userId, guestId } = req.query;
    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            return res.json(cart);
        }
        else {
            return res.status(404).json({ message: "cart not found" });
        }

    } catch (error) {
        return res.status(500).json({ message: 'server error' });
    }
})

// post request to merge the cart
router.post('/merge', protect, async (req, res) => {
    const { guestId } = req.body;
    try {
        const guestCart = await cartModel.findOne({ guestId });
        const userCart = await cartModel.findOne({ userId: req.user._id });

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: 'guest Cart is empty' });
            }
            if (userCart) {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) => item.productId.toString() === guestItem.productId && item.size === guestItem.size && item.color === guestItem.color
                    )

                    if (productIndex > -1) {
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }
                    else {
                        userCart.products.push(guestItem);
                    }
                });
                userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

                await userCart.save();

                // remove guest cart after merging
                try {
                    await cartModel.findOneAndDelete({ guestId });
                }
                catch (error) {
                    console.log("error in delte the guest cart");
                }
                return res.status(200).json(userCart);
            }
            else {
                // if user has no exisying cart assign the guest cart to the user
                guestCart.user = req.user._id;
                guestCart.guestId = undefined;
                await guestCart.save();

                return res.status(200).json(guestCart);
            }
        }
        else {
            if (userCart) {
                // guest cart alreday merge return usercart
                return res.status(200).json(userCart);
            }
            return res.status(404).json({ message: "guest cart not found" });
        }

    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
})
export default router;
