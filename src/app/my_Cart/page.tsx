// components/Cart.tsx
"use client";
import { useEffect, useState } from 'react';

interface CartItem {
  productId: any;
  _id: string;
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("yourTokenKey");
      const response = await fetch('/api/requests', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setCartItems(data);
    };

    fetchCartItems();
    
  }, []);

  // Function to delete an item
  const deleteItem = async (id: any) => {
    const token = localStorage.getItem("yourTokenKey");
    await fetch(`/api/requests`, {
      method: 'DELETE',
      body: JSON.stringify({ id }), // Send the id in the body
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      <ul>
        {cartItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center mb-2 border p-2">
            <div>
              <strong>{item.productId?.name}</strong> - desc: {item.productId?.description} - Price: ${item.productId?.price}
            </div>
            <div>
              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-500 text-white px-2 py-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
