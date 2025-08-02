// src/lib/api/admin.ts

export interface AdminStats {
  users: {
    total: number;
    active: number;
    verified: number;
    admins: number;
    activeSessions: number;
  };
  content: {
    posts: number;
    publishedPosts: number;
    comments: number;
    categories: number;
    recentPosts: number;
    recentComments: number;
  };
  growth: {
    userGrowth: Array<{
      date: string;
      count: number;
    }>;
  };
  recentActivities: Array<{
    type: string;
    description: string;
    timestamp: string;
    icon: string;
    color: string;
  }>;
  systemHealth: {
    database: {
      status: string;
      responseTime: number;
      percentage: number;
    };
    api: {
      status: string;
      responseTime: number;
      percentage: number;
    };
    errorRate: {
      value: number;
      percentage: number;
    };
  };
}

function getApiUrl() {
  // In production, API routes are at the same origin
  // In development, they might be at a different port
  const baseUrl = import.meta.env.VITE_API_URL || '';
  return `${baseUrl}/api`;
}

export async function getAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${getApiUrl()}/admin-stats`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch admin stats');
  }

  return response.json();
}