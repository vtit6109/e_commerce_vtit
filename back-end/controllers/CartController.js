const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // if cart exists for the user
            let itemIndex = cart.products.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                // if product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity += quantity;
                cart.products[itemIndex] = productItem;
            } else {
                // if product does not exists in cart, add new item
                cart.products.push({ productId, quantity: quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity: quantity }],
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};

exports.getCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.findOne({ userId }).populate({
            path: 'products.productId',
            populate: {
                path: 'category', 
                populate: {path: 'catalog'}
            }
        });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};


exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        let itemIndex = cart.products.findIndex(p => p.productId._id == productId);

        if (itemIndex > -1) {
            cart.products.splice(itemIndex, 1);
        } else {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

        cart = await cart.save();
        return res.status(200).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};


exports.updateQuantity = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        let itemIndex = cart.products.findIndex(p => p.productId._id == productId);

        if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            productItem.quantity = quantity;
            cart.products[itemIndex] = productItem;
        } else {
            return res.status(404).json({ message: 'Product not found in cart.' });
        }

        cart = await cart.save();
        return res.status(200).send(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
};

