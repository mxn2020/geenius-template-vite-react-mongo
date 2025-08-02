import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../Register';
import * as authClient from '../../../lib/auth-client';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  signUp: {
    email: vi.fn(),
  },
}));

// Mock fetch
global.fetch = vi.fn();

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render registration form', () => {
    renderRegister();
    
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should show sign in link', () => {
    renderRegister();
    
    const signInLink = screen.getByText('Sign in');
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/login');
  });

  it('should validate email format', async () => {
    renderRegister();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // The form should not submit with invalid email
    await waitFor(() => {
      expect(vi.mocked(authClient.signUp.email)).not.toHaveBeenCalled();
    });
  });

  it('should handle registration submission', async () => {
    const mockSignUp = vi.mocked(authClient.signUp.email);
    mockSignUp.mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ role: 'user' }),
    });

    renderRegister();
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
    });
  });

  it('should display error message on registration failure', async () => {
    const mockSignUp = vi.mocked(authClient.signUp.email);
    mockSignUp.mockResolvedValueOnce({
      data: null,
      error: { message: 'Email already exists' },
    });

    renderRegister();
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email already exists')).toBeInTheDocument();
    });
  });

  it('should disable form during submission', async () => {
    const mockSignUp = vi.mocked(authClient.signUp.email);
    mockSignUp.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderRegister();
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(nameInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Creating account...')).toBeInTheDocument();
    });
  });

  it('should enforce minimum password length', async () => {
    renderRegister();
    
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    // The form should not submit with short password
    await waitFor(() => {
      expect(vi.mocked(authClient.signUp.email)).not.toHaveBeenCalled();
    });
  });

  it('should redirect to dashboard after successful registration', async () => {
    const mockSignUp = vi.mocked(authClient.signUp.email);
    mockSignUp.mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ role: 'user' }),
    });

    // Mock window.location
    delete (window as any).location;
    window.location = { href: '' } as any;

    renderRegister();
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.href).toBe('/dashboard');
    });
  });
});