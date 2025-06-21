import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);

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
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
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

  const placeOrder = () => {
    alert("Order placed successfully!");
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Products</h1>

      {showCheckout ? (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Checkout Page</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <p className="font-bold mt-2">Total: ${cartTotal.toFixed(2)}</p>
          <button
            onClick={placeOrder}
            className="w-full mt-4 bg-green-500 text-white py-2 rounded"
          >
            Place Order
          </button>
          <button
            onClick={() => setShowCheckout(false)}
            className="w-full mt-2 text-blue-600 underline"
          >
            Back to Products
          </button>
        </div>
      ) : (
        <>
          <div className="bg-pink-100 p-3 rounded mb-4">
            <h2 className="text-lg font-semibold mb-2">Cart</h2>
            {cart.length === 0 ? (
              <p>Cart is empty.</p>
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
                        className="bg-red-300 px-2 rounded"
                      >
                        -
                      </button>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="bg-green-300 px-2 ml-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
                <p className="font-bold">Total: ${cartTotal.toFixed(2)}</p>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="mt-2 bg-blue-500 text-white w-full py-2 rounded"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-3 rounded shadow hover:shadow-md"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">
                  {product.description.slice(0, 50)}...
                </p>
                <p className="text-pink-600 font-bold">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 w-full bg-pink-500 text-white py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
