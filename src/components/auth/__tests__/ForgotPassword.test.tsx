import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ForgotPassword } from '../ForgotPassword';
import * as authClient from '../../../lib/auth-client';
import { RateLimitService } from '../../../lib/services/rate-limit';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  forgetPassword: vi.fn(),
}));

// Mock rate limit service
vi.mock('../../../lib/services/rate-limit', () => ({
  RateLimitService: {
    checkLimit: vi.fn(),
  },
}));

const renderForgotPassword = () => {
  return render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  );
};

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render forgot password form', () => {
    renderForgotPassword();
    
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
    expect(screen.getByText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument();
  });

  it('should show back to login link', () => {
    renderForgotPassword();
    
    const loginLink = screen.getByText('Back to login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('should handle password reset request', async () => {
    const mockCheckLimit = vi.mocked(RateLimitService.checkLimit);
    const mockForgetPassword = vi.mocked(authClient.forgetPassword);
    
    mockCheckLimit.mockResolvedValueOnce({ allowed: true });
    mockForgetPassword.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockCheckLimit).toHaveBeenCalledWith('test@example.com', 'password_reset');
      expect(mockForgetPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        redirectTo: '/reset-password',
      });
    });
  });

  it('should show success message after request', async () => {
    const mockCheckLimit = vi.mocked(RateLimitService.checkLimit);
    const mockForgetPassword = vi.mocked(authClient.forgetPassword);
    
    mockCheckLimit.mockResolvedValueOnce({ allowed: true });
    mockForgetPassword.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeInTheDocument();
      expect(screen.getByText(/we've sent a password reset link/i)).toBeInTheDocument();
    });
  });

  it('should handle rate limiting', async () => {
    const mockCheckLimit = vi.mocked(RateLimitService.checkLimit);
    mockCheckLimit.mockResolvedValueOnce({ 
      allowed: false, 
      retryAfter: 3600 
    });

    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/too many password reset attempts/i)).toBeInTheDocument();
      expect(screen.getByText(/please try again in 60 minutes/i)).toBeInTheDocument();
    });
  });

  it('should display error message on failure', async () => {
    const mockCheckLimit = vi.mocked(RateLimitService.checkLimit);
    const mockForgetPassword = vi.mocked(authClient.forgetPassword);
    
    mockCheckLimit.mockResolvedValueOnce({ allowed: true });
    mockForgetPassword.mockResolvedValueOnce({
      data: null,
      error: { message: 'Failed to send reset email' },
    });

    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to send reset email')).toBeInTheDocument();
    });
  });

  it('should disable form during submission', async () => {
    const mockCheckLimit = vi.mocked(RateLimitService.checkLimit);
    const mockForgetPassword = vi.mocked(authClient.forgetPassword);
    
    mockCheckLimit.mockResolvedValueOnce({ allowed: true });
    mockForgetPassword.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });
  });

  it('should validate email format', async () => {
    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    // The form should not submit with invalid email
    await waitFor(() => {
      expect(vi.mocked(RateLimitService.checkLimit)).not.toHaveBeenCalled();
      expect(vi.mocked(authClient.forgetPassword)).not.toHaveBeenCalled();
    });
  });

  it('should clear form after successful submission', async () => {
    const mockCheckLimit = vi.mocked(RateLimitService.checkLimit);
    const mockForgetPassword = vi.mocked(authClient.forgetPassword);
    
    mockCheckLimit.mockResolvedValueOnce({ allowed: true });
    mockForgetPassword.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderForgotPassword();
    
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /send reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput).toHaveValue('');
    });
  });
});