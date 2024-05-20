// public/widget.js
import React from 'react';
import ReactDOM from 'react-dom';
import CreditCardWidget from './src/CreditCardWidget';

window.CreditCardWidget = {
  init: ({ elementId, theme, categories }) => {
    ReactDOM.render(
      <CreditCardWidget theme={theme} categories={categories} />,
      document.getElementById(elementId)
    );
  }
};
