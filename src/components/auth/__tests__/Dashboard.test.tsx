import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
import * as authClient from '../../../lib/auth-client';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  signOut: vi.fn(),
  useSession: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

const mockUser = {
  id: '123',
  email: 'test@example.com',
  name: 'Test User',
};

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authClient.useSession).mockReturnValue({
      data: { user: mockUser },
      isPending: false,
    } as any);
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ role: 'user' }),
    });
  });

  it('should render user dashboard', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    vi.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: true,
    } as any);

    renderDashboard();
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show dashboard navigation items', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('View Sessions')).toBeInTheDocument();
      expect(screen.getByText('View Audit Logs')).toBeInTheDocument();
    });
  });

  it('should handle sign out', async () => {
    const mockSignOut = vi.mocked(authClient.signOut);
    mockSignOut.mockResolvedValueOnce({} as any);

    renderDashboard();
    
    await waitFor(() => {
      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      expect(signOutButton).toBeInTheDocument();
      
      fireEvent.click(signOutButton);
    });

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('should show admin link for admin users', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ role: 'admin' }),
    });

    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });
  });

  it('should not show admin link for regular users', async () => {
    renderDashboard();
    
    await waitFor(() => {
      expect(screen.queryByText('Admin Dashboard')).not.toBeInTheDocument();
    });
  });

  it('should handle session error', () => {
    vi.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
    } as any);

    renderDashboard();
    
    expect(screen.getByText('No session found')).toBeInTheDocument();
  });

  it('should display user stats when available', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ role: 'user' }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          loginCount: 42,
          lastLogin: new Date().toISOString(),
          activeSessions: 3,
        }),
      });

    renderDashboard();
    
    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
      expect(screen.getByText('Total Logins')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Active Sessions')).toBeInTheDocument();
    });
  });

  it('should handle user stats fetch error', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ role: 'user' }),
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

    renderDashboard();
    
    // Should still render dashboard without stats
    await waitFor(() => {
      expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
    });
  });

  it('should navigate to sessions page', async () => {
    renderDashboard();
    
    await waitFor(() => {
      const sessionsLink = screen.getByText('View Sessions');
      expect(sessionsLink).toHaveAttribute('href', '/sessions');
    });
  });

  it('should navigate to audit logs page', async () => {
    renderDashboard();
    
    await waitFor(() => {
      const auditLink = screen.getByText('View Audit Logs');
      expect(auditLink).toHaveAttribute('href', '/audit-logs');
    });
  });
});