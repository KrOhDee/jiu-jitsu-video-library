import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

test('renders Navbar component without crashing', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const navbarTitle = screen.getByText('JitsuCavern');
  expect(navbarTitle).toBeInTheDocument();
});

test('renders navigation links correctly', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const homeLink = screen.getByText('Home');
  const signInLink = screen.getByText('Sign In');
  const signUpLink = screen.getByText('Sign Up');

  expect(homeLink).toBeInTheDocument();
  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});
