import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuditLogsPage } from '../AuditLogsPage';
import * as authClient from '../../../lib/auth-client';
import { AuditService } from '../../../lib/services/audit';

// Mock auth client
vi.mock('../../../lib/auth-client', () => ({
  useSession: vi.fn(),
}));

// Mock audit service
vi.mock('../../../lib/services/audit', () => ({
  AuditService: {
    getUserAuditLogs: vi.fn(),
    exportAuditLogs: vi.fn(),
  },
}));

const mockLogs = [
  {
    id: '1',
    userId: 'user123',
    action: 'login',
    success: true,
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    createdAt: new Date(),
    details: { method: 'email' },
    error: null,
  },
  {
    id: '2',
    userId: 'user123',
    action: 'logout',
    success: true,
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0',
    createdAt: new Date(Date.now() - 3600000),
    details: {},
    error: null,
  },
  {
    id: '3',
    userId: 'user123',
    action: 'login_failed',
    success: false,
    ip: '192.168.1.101',
    userAgent: 'Mozilla/5.0',
    createdAt: new Date(Date.now() - 7200000),
    details: { reason: 'Invalid password' },
    error: 'Invalid password',
  },
];

const renderAuditLogsPage = () => {
  return render(
    <BrowserRouter>
      <AuditLogsPage />
    </BrowserRouter>
  );
};

describe('AuditLogsPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authClient.useSession).mockReturnValue({
      data: { user: { id: 'user123', email: 'test@example.com' } },
      isPending: false,
    } as any);
  });

  it('should render audit logs page', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Security Activity Log')).toBeInTheDocument();
      expect(screen.getByText(/view your recent account activity/i)).toBeInTheDocument();
    });
  });

  it('should display audit log entries', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText('Login Failed')).toBeInTheDocument();
    });
  });

  it('should show success and failure indicators', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      const successBadges = screen.getAllByText('Success');
      const failedBadges = screen.getAllByText('Failed');
      
      expect(successBadges).toHaveLength(2);
      expect(failedBadges).toHaveLength(1);
    });
  });

  it('should handle action filter', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      const filterSelect = screen.getByLabelText('Filter by action');
      fireEvent.change(filterSelect, { target: { value: 'login' } });
    });

    await waitFor(() => {
      expect(AuditService.getUserAuditLogs).toHaveBeenCalledWith(
        'user123',
        expect.objectContaining({ action: 'login' })
      );
    });
  });

  it('should handle date range filter', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      const startDateInput = screen.getByLabelText('Start date');
      const endDateInput = screen.getByLabelText('End date');
      
      fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
      fireEvent.change(endDateInput, { target: { value: '2024-12-31' } });
    });

    await waitFor(() => {
      expect(AuditService.getUserAuditLogs).toHaveBeenLastCalledWith(
        'user123',
        expect.objectContaining({
          startDate: expect.any(Date),
          endDate: expect.any(Date),
        })
      );
    });
  });

  it('should handle pagination', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 50,
      page: 1,
      totalPages: 5,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(AuditService.getUserAuditLogs).toHaveBeenLastCalledWith(
        'user123',
        expect.objectContaining({ offset: 10 })
      );
    });
  });

  it('should handle CSV export', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    const mockExport = vi.mocked(AuditService.exportAuditLogs);
    mockExport.mockResolvedValueOnce('csv,data,here');

    // Mock URL.createObjectURL and document.createElement
    global.URL.createObjectURL = vi.fn(() => 'blob:url');
    const mockLink = { click: vi.fn(), setAttribute: vi.fn() };
    vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);

    renderAuditLogsPage();
    
    await waitFor(() => {
      const exportButton = screen.getByRole('button', { name: /export csv/i });
      fireEvent.click(exportButton);
    });

    await waitFor(() => {
      expect(mockExport).toHaveBeenCalledWith('user123', 'csv', expect.any(Object));
      expect(mockLink.click).toHaveBeenCalled();
    });
  });

  it('should show loading state', () => {
    vi.mocked(AuditService.getUserAuditLogs).mockImplementation(() => new Promise(() => {}));

    renderAuditLogsPage();
    
    expect(screen.getByText('Loading audit logs...')).toBeInTheDocument();
  });

  it('should display error on fetch failure', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockRejectedValueOnce(
      new Error('Failed to fetch logs')
    );

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load audit logs/i)).toBeInTheDocument();
    });
  });

  it('should show empty state', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: [],
      total: 0,
      page: 1,
      totalPages: 0,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText(/no audit logs found/i)).toBeInTheDocument();
    });
  });

  it('should display IP addresses and user agents', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText('192.168.1.100')).toBeInTheDocument();
      expect(screen.getByText('192.168.1.101')).toBeInTheDocument();
      expect(screen.getAllByText('Mozilla/5.0')).toHaveLength(3);
    });
  });

  it('should format timestamps correctly', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      // Should show relative time like "Just now", "1 hour ago", etc.
      const timeElements = screen.getAllByText(/ago|just now/i);
      expect(timeElements.length).toBeGreaterThan(0);
    });
  });

  it('should show action details when available', async () => {
    vi.mocked(AuditService.getUserAuditLogs).mockResolvedValueOnce({
      logs: mockLogs,
      total: 3,
      page: 1,
      totalPages: 1,
    });

    renderAuditLogsPage();
    
    await waitFor(() => {
      expect(screen.getByText('Method: email')).toBeInTheDocument();
      expect(screen.getByText('Reason: Invalid password')).toBeInTheDocument();
    });
  });
});