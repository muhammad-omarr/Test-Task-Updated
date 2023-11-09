// CardDisplay.js
import React from "react";
import Chatbot from "./Chatbot";
import {loadStripe} from "@stripe/stripe-js"

const CardDisplay = ({ cards, loading, loadMore }) => {

  const makePayment = async (card) => {
    const stripe = await loadStripe("pk_test_51OAc0oJqWRu9iAYxXumD6rcFtfAStXyf3kD0ZUzfBSAOEK4c1QxxPbB4KOsQTeDPtNU1DejP5H2Q6TdHv6mpZ3NE00oj7iRyBp");

    const body = {
      card: [card] // Add the card information you want to send
      // Add any other necessary information to the body
    };

    const headers = {
      "Content-Type": "application/json",
    };

      const response = await fetch("http://localhost:4000/api/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.log(result.error);
        }
      }
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="w-full h-48">
              <img
                src={card.imageUrl}
                alt={card.name}
                onError={(e) => {
                  e.target.src = "placeholder-image-url.jpg";
                }}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <hr />
              <h4>{card.artist}</h4>
              <hr />
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {card.text}
              </p>

              <button
                onClick={() => makePayment(card)}
                className="bg-black text-white py-2 px-4 rounded-lg text-center my-2"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center my-4">Loading...</p>}
      <button
        onClick={loadMore}
        disabled={loading}
        className="block mx-auto bg-blue-500 text-white py-2 px-4 rounded-lg text-center mt-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Load More
      </button>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default CardDisplay;
