import { useState } from "react";
import './Cart.css'

function Cart() {

    const [item, setItem] = useState('');
    const [cartList, setCartList] = useState([]);

    function addItems() {
        if(!item) {
            alert('Empty item cannot be added to Cart');
        }
        setCartList([...cartList, item]);
        setItem('');
    }

    return (
        <div className="cart-styles">
            <h1>Hello from Cart</h1>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
            <button onClick={addItems}>Add Item</button>

            <h2>Your Cart Items</h2>
            {cartList.length ===0 && <p>Your cart is empty</p>}
            <ol>
                {cartList.map((item, index) => (
                   <li key={index}>
                        <p>{item}</p>
                        <button onClick={() => setCartList(cartList.filter((item, i) => i !== index))}>Remove Item</button>
                   </li> 
                ))}
            </ol>
        </div>
    )
}

export default Cart;