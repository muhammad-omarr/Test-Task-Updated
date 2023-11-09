const express = require("express");
const axios = require("axios");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OAc0oJqWRu9iAYxT1gCwc92XVU8eDhNa28hD1KQJk4pfaXCXePRF8DiqdkaH9OwOzR0PLeS3njDHVssHteBPD5r00WFtevSBF"
);

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

app.get("/api/cards", async (req, res) => {
  const { name, pageSize, page } = req.query;

  try {
    const response = await axios.get(
      `https://api.magicthegathering.io/v1/cards?name=${name}&pageSize=${pageSize}&page=${page}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/create-checkout-session", async (req, res) => {
  const { card } = req.body;
  // console.log(card);
  const lineItems = card.map((card) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: card.name,
      },
      unit_amount: card.cmc * 100,
    },
    quantity: 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  res.json({ id: session.id });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
