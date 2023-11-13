const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (cart) {
            // if cart exists for the user
            let itemIndex = cart.products.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                // if product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity += 1;
                cart.products[itemIndex] = productItem;
            } else {
                // if product does not exists in cart, add new item
                cart.products.push({ productId, quantity: 1 });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity: 1 }],
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
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }
        res.json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
};
