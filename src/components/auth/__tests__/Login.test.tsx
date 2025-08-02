import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../Login';
import * as authClient from '../../../lib/auth-client';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  signIn: {
    email: vi.fn(),
    social: vi.fn(),
  },
}));

// Mock fetch
global.fetch = vi.fn();

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    renderLogin();
    
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('should show forgot password link', () => {
    renderLogin();
    
    const forgotLink = screen.getByText('Forgot password?');
    expect(forgotLink).toBeInTheDocument();
    expect(forgotLink).toHaveAttribute('href', '/forgot-password');
  });

  it('should show sign up link', () => {
    renderLogin();
    
    const signUpLink = screen.getByText('Sign up');
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/register');
  });

  it('should handle email login submission', async () => {
    const mockSignIn = vi.mocked(authClient.signIn.email);
    mockSignIn.mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ role: 'user' }),
    });

    renderLogin();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('should display error message on login failure', async () => {
    const mockSignIn = vi.mocked(authClient.signIn.email);
    mockSignIn.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid credentials' },
    });

    renderLogin();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('should disable form during submission', async () => {
    const mockSignIn = vi.mocked(authClient.signIn.email);
    mockSignIn.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderLogin();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Signing in...')).toBeInTheDocument();
    });
  });

  it('should handle social login buttons', async () => {
    const mockSocialSignIn = vi.mocked(authClient.signIn.social);
    
    renderLogin();
    
    const googleButton = screen.getByRole('button', { name: /google/i });
    const githubButton = screen.getByRole('button', { name: /github/i });

    expect(googleButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();

    fireEvent.click(googleButton);
    
    await waitFor(() => {
      expect(mockSocialSignIn).toHaveBeenCalledWith({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    });
  });

  it('should redirect admin users to admin dashboard', async () => {
    const mockSignIn = vi.mocked(authClient.signIn.email);
    mockSignIn.mockResolvedValueOnce({
      data: { user: { id: '123', email: 'admin@example.com' } },
      error: null,
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ role: 'admin' }),
    });

    // Mock window.location
    delete (window as any).location;
    window.location = { href: '' } as any;

    renderLogin();
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe('/admin');
    });
  });
});