// src/CreditCardWidget.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Card {
  _id: string;
  name: string;
  description: string;
  category: string;
  applyLink: string;
}

interface WidgetProps {
  theme: string;
  categories: string[];
}

const CreditCardWidget: React.FC<WidgetProps> = ({ theme, categories }) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<Card[]>('http://localhost:3000/api/cards');
        setCards(response.data);
      } catch (error) {
        console.error('Error fetching credit card data', error);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className={`widget ${theme}`}>
      {cards.filter(card => categories.includes(card.category)).map(card => (
        <div key={card._id} className="card bg-white p-4 shadow-md rounded-lg mb-4">
          <h3 className="text-xl font-semibold">{card.name}</h3>
          <p className="text-gray-600">{card.description}</p>
          <a href={card.applyLink} className="text-blue-500 hover:underline mt-2 block">Apply Now</a>
        </div>
      ))}
    </div>
  );
};

export default CreditCardWidget;
