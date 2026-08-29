import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const add = p => {
    const item = cart.find(i => i.id === p.id);

    setCart(item
      ? cart.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...p, qty: 1 }]
    );
  };

  const change = (id, n) => {
    setCart(cart
      .map(i => i.id === id ? { ...i, qty: i.qty + n } : i)
      .filter(i => i.qty > 0)
    );
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="app">
      <nav>
        <h2>🛍️ MyShop</h2>
        <span>Home</span>
        <span>Products</span>
        <span>Cart 🛒 ({cart.length})</span>
      </nav>
      <h1>My E-commerce Website</h1>

      <input
        placeholder="Search products..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="category-buttons">
        {["All", "Men", "Women"].map(c => (
          <button onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div className="products">
        {filtered.map(p => (
          <div className="product" key={p.id}>
            <img className="product-img" src={p.image} alt={p.name} />
            <h2>{p.name}</h2>
            <p>₹{p.price}</p>
            <button onClick={() => add(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart">
        <h2>🛒 Cart</h2>

        {cart.map(i => (
          <div key={i.id}>
            {i.name} - ₹{i.price}
            <br />
            <button onClick={() => change(i.id, -1)}>−</button>
            {" "}{i.qty}{" "}
            <button onClick={() => change(i.id, 1)}>+</button>
            <button onClick={() =>
              setCart(cart.filter(x => x.id !== i.id))
            }>
              Remove
            </button>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>

        <button onClick={() => setCheckout(true)}>Checkout</button>
        <button onClick={() => setCart([])}>Clear Cart</button>
      </div>

      {checkout && (
        <div className="checkout">
          <h2>Checkout</h2>
          <input placeholder="Name" />
          <input placeholder="Email" />
          <input placeholder="Address" />

          <h3>Total: ₹{total}</h3>

          <button onClick={() => {
            alert("Order placed successfully!");
            setCart([]);
            setCheckout(false);
          }}>
            Place Order
          </button>

          <button onClick={() => setCheckout(false)}>Cancel</button>
        </div>
      )}

      <footer>
        <p>© 2026 MyShop | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;