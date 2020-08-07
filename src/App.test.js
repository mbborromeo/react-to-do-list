import React from 'react';
import { render, wait, screen } from '@testing-library/react';
import App from './App';

// Make sure loading indicator comes up first
//test('App renders loading initially', () => {
describe("App", () => {
  it("renders loading initially", () => {
    const { getByText } = render(<App />);
    const loading = getByText('Loading...');
    expect( loading ).toBeInTheDocument();
  });
});
