import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const API = "https://dummyjson.com/products";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.log("Error", error);
      }
    }
    fetchData();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Beauty Products</h1>
      <div className="bg-pink-100 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">🛒 Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.title} x {item.quantity}
                </span>
                <div>
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-red-300 rounded mx-1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-green-300 rounded mx-1"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <p className="font-bold mt-2">Total: ${cartTotal.toFixed(2)}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              {product.description.slice(0, 60)}...
            </p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-pink-600 font-bold text-lg">
                ${product.price}
              </span>
              <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                ⭐ {product.rating}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Stock: {product.stock} | Brand: {product.brand}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-pink-500 text-white py-2 rounded-xl mt-2 hover:bg-pink-600 transition"
            >
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
