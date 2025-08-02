import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SessionsPage } from '../SessionsPage';
import * as authClient from '../../../lib/auth-client';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  useSession: vi.fn(),
  listSessions: vi.fn(),
  revokeSession: vi.fn(),
  revokeSessions: vi.fn(),
}));

// Mock UAParser
vi.mock('ua-parser-js', () => ({
  default: vi.fn().mockImplementation(() => ({
    getBrowser: () => ({ name: 'Chrome', version: '91' }),
    getOS: () => ({ name: 'macOS', version: '11.4' }),
    getDevice: () => ({ type: 'desktop' }),
  })),
}));

const mockSessions = [
  {
    id: 'session1',
    token: 'current-token',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'session2',
    token: 'other-token',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    expiresAt: new Date(Date.now() + 82800000).toISOString(),
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6)',
    ipAddress: '192.168.1.101',
  },
];

const renderSessionsPage = () => {
  return render(
    <BrowserRouter>
      <SessionsPage />
    </BrowserRouter>
  );
};

describe('SessionsPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authClient.useSession).mockReturnValue({
      data: { 
        user: { id: '123', email: 'test@example.com' },
        session: { token: 'current-token' },
      },
      isPending: false,
    } as any);
  });

  it('should render sessions list', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: mockSessions,
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Active Sessions')).toBeInTheDocument();
      expect(screen.getByText(/manage your active sessions/i)).toBeInTheDocument();
    });
  });

  it('should show loading state', () => {
    vi.mocked(authClient.listSessions).mockImplementation(() => new Promise(() => {}));

    renderSessionsPage();
    
    expect(screen.getByText('Loading sessions...')).toBeInTheDocument();
  });

  it('should display session details', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: mockSessions,
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Current session')).toBeInTheDocument();
      expect(screen.getByText('Chrome on macOS')).toBeInTheDocument();
      expect(screen.getByText('192.168.1.100')).toBeInTheDocument();
    });
  });

  it('should show device icons', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: mockSessions,
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      // Look for device type indicators
      const sessions = screen.getAllByRole('article');
      expect(sessions).toHaveLength(2);
    });
  });

  it('should handle session revocation', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: mockSessions,
      error: null,
    } as any);
    
    const mockRevokeSession = vi.mocked(authClient.revokeSession);
    mockRevokeSession.mockResolvedValueOnce({
      data: {},
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      const revokeButtons = screen.getAllByRole('button', { name: /revoke/i });
      expect(revokeButtons.length).toBeGreaterThan(0);
      
      // Find the non-current session revoke button
      const otherSessionRevoke = revokeButtons.find(btn => 
        !btn.closest('[data-current-session="true"]')
      );
      
      if (otherSessionRevoke) {
        fireEvent.click(otherSessionRevoke);
      }
    });

    await waitFor(() => {
      expect(mockRevokeSession).toHaveBeenCalledWith({ sessionId: 'session2' });
    });
  });

  it('should confirm before revoking all other sessions', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: mockSessions,
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      const revokeAllButton = screen.getByRole('button', { name: /revoke all other sessions/i });
      fireEvent.click(revokeAllButton);
    });

    // Should show confirmation
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('should handle revoking all other sessions', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: mockSessions,
      error: null,
    } as any);
    
    const mockRevokeSessions = vi.mocked(authClient.revokeSessions);
    mockRevokeSessions.mockResolvedValueOnce({
      data: {},
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      const revokeAllButton = screen.getByRole('button', { name: /revoke all other sessions/i });
      fireEvent.click(revokeAllButton);
    });

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockRevokeSessions).toHaveBeenCalled();
    });
  });

  it('should display error on fetch failure', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: null,
      error: { message: 'Failed to fetch sessions' },
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch sessions')).toBeInTheDocument();
    });
  });

  it('should show session warnings', async () => {
    const suspiciousSessions = [
      ...mockSessions,
      {
        id: 'session3',
        token: 'suspicious-token',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        userAgent: 'Unknown Browser',
        ipAddress: '10.0.0.1', // Different subnet
      },
    ];

    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: suspiciousSessions,
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      expect(screen.getByText(/unusual location detected/i)).toBeInTheDocument();
    });
  });

  it('should refresh sessions after revocation', async () => {
    const listSessionsMock = vi.mocked(authClient.listSessions);
    listSessionsMock
      .mockResolvedValueOnce({
        data: mockSessions,
        error: null,
      } as any)
      .mockResolvedValueOnce({
        data: [mockSessions[0]], // Only current session remains
        error: null,
      } as any);
    
    const mockRevokeSession = vi.mocked(authClient.revokeSession);
    mockRevokeSession.mockResolvedValueOnce({
      data: {},
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      const revokeButtons = screen.getAllByRole('button', { name: /revoke/i });
      const otherSessionRevoke = revokeButtons.find(btn => 
        !btn.closest('[data-current-session="true"]')
      );
      
      if (otherSessionRevoke) {
        fireEvent.click(otherSessionRevoke);
      }
    });

    await waitFor(() => {
      expect(listSessionsMock).toHaveBeenCalledTimes(2);
    });
  });

  it('should handle empty sessions list', async () => {
    vi.mocked(authClient.listSessions).mockResolvedValueOnce({
      data: [],
      error: null,
    } as any);

    renderSessionsPage();
    
    await waitFor(() => {
      expect(screen.getByText(/no active sessions found/i)).toBeInTheDocument();
    });
  });
});