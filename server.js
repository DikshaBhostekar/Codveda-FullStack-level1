const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1, name: "T-shirt", price: 799, category: "Men",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
  },
  {
    id: 2, name: "Jeans", price: 1499, category: "Men",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d"
  },
  {
    id: 3, name: "Dress", price: 1299, category: "Women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8"
  },
  {
    id: 4, name: "Jacket", price: 1999, category: "Men",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5"
  },
  {
    id: 5, name: "Shoes", price: 2499, category: "Women",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
  }
];

app.get("/api/products", (req, res) => res.json(products));

app.post("/api/products", (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.status(201).json(product);
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id != req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);