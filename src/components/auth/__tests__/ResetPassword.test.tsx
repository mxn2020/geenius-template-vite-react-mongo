import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ResetPassword } from '../ResetPassword';
import * as authClient from '../../../lib/auth-client';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  resetPassword: vi.fn(),
}));

// Mock URLSearchParams
const mockSearchParams = new URLSearchParams();
mockSearchParams.set('token', 'test-token');

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams],
  };
});

const renderResetPassword = (initialEntries = ['/reset-password?token=test-token']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <ResetPassword />
    </MemoryRouter>
  );
};

describe('ResetPassword Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render reset password form', () => {
    renderResetPassword();
    
    expect(screen.getByText('Reset your password')).toBeInTheDocument();
    expect(screen.getByText(/enter your new password below/i)).toBeInTheDocument();
    expect(screen.getByLabelText('New Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset password/i })).toBeInTheDocument();
  });

  it('should show error when no token provided', () => {
    renderResetPassword(['/reset-password']);
    
    expect(screen.getByText(/invalid or missing reset token/i)).toBeInTheDocument();
  });

  it('should show password strength indicator', () => {
    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    
    // Initially all checks should be false
    expect(screen.getByText(/at least 8 characters/i)).toHaveClass('text-gray-500');
    expect(screen.getByText(/one uppercase letter/i)).toHaveClass('text-gray-500');
    expect(screen.getByText(/one lowercase letter/i)).toHaveClass('text-gray-500');
    expect(screen.getByText(/one number/i)).toHaveClass('text-gray-500');
    expect(screen.getByText(/one special character/i)).toHaveClass('text-gray-500');

    // Enter a strong password
    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });

    // All checks should be green
    expect(screen.getByText(/at least 8 characters/i)).toHaveClass('text-green-600');
    expect(screen.getByText(/one uppercase letter/i)).toHaveClass('text-green-600');
    expect(screen.getByText(/one lowercase letter/i)).toHaveClass('text-green-600');
    expect(screen.getByText(/one number/i)).toHaveClass('text-green-600');
    expect(screen.getByText(/one special character/i)).toHaveClass('text-green-600');
  });

  it('should validate password match', async () => {
    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.change(confirmInput, { target: { value: 'DifferentP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('should handle password reset submission', async () => {
    const mockResetPassword = vi.mocked(authClient.resetPassword);
    mockResetPassword.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.change(confirmInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith({
        newPassword: 'StrongP@ss1',
        token: 'test-token',
      });
    });
  });

  it('should show success message after reset', async () => {
    const mockResetPassword = vi.mocked(authClient.resetPassword);
    mockResetPassword.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.change(confirmInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password reset successful/i)).toBeInTheDocument();
      expect(screen.getByText(/your password has been reset/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /go to login/i })).toHaveAttribute('href', '/login');
    });
  });

  it('should display error message on failure', async () => {
    const mockResetPassword = vi.mocked(authClient.resetPassword);
    mockResetPassword.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid or expired token' },
    });

    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.change(confirmInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid or expired token')).toBeInTheDocument();
    });
  });

  it('should disable form during submission', async () => {
    const mockResetPassword = vi.mocked(authClient.resetPassword);
    mockResetPassword.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.change(confirmInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(passwordInput).toBeDisabled();
      expect(confirmInput).toBeDisabled();
      expect(submitButton).toBeDisabled();
      expect(screen.getByText('Resetting...')).toBeInTheDocument();
    });
  });

  it('should enforce minimum password requirements', async () => {
    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    // Weak password
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.change(confirmInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password does not meet security requirements/i)).toBeInTheDocument();
    });
  });

  it('should show link to request new token on error', async () => {
    const mockResetPassword = vi.mocked(authClient.resetPassword);
    mockResetPassword.mockResolvedValueOnce({
      data: null,
      error: { message: 'Token expired' },
    });

    renderResetPassword();
    
    const passwordInput = screen.getByLabelText('New Password');
    const confirmInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /reset password/i });

    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.change(confirmInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const requestNewLink = screen.getByRole('link', { name: /request a new reset link/i });
      expect(requestNewLink).toBeInTheDocument();
      expect(requestNewLink).toHaveAttribute('href', '/forgot-password');
    });
  });
});