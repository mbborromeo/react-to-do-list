import React from 'react';
import { render, wait, screen } from '@testing-library/react';
import App from './App';

// Make sure loading indicator comes up first
test('App renders loading initially', () => {
  const { getByText } = render(<App />);
  const loading = getByText('Loading...');
  expect( loading ).toBeInTheDocument();
});

// Wait for items to load and display
test('Heading renders after API results are returned', () => {
  await wait(
    () => expect(screen.getByText('TO DO')).toBeInTheDocument()
  );
});