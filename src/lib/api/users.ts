// src/lib/api/users.ts

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastActive: string;
  emailVerified: boolean;
  preferences?: {
    theme: string;
    emailNotifications: boolean;
    language: string;
    timezone: string;
  };
}

export interface UserDetails extends User {
  preferences: {
    theme: string;
    emailNotifications: boolean;
    language: string;
    timezone: string;
  };
  recentActivity: {
    id: string;
    action: string;
    details: string;
    timestamp: string;
    ip: string;
  }[];
  sessions: {
    id: string;
    active: boolean;
    createdAt: string;
    expiresAt: string;
    userAgent: string;
    ip: string;
  }[];
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

function getApiUrl() {
  // In production, API routes are at the same origin
  // In development, they might be at a different port
  const baseUrl = import.meta.env.VITE_API_URL || '';
  return `${baseUrl}/api`;
}

export async function getUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}): Promise<UsersResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.role) queryParams.append('role', params.role);

  const response = await fetch(`${getApiUrl()}/users?${queryParams}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function getUserById(userId: string): Promise<User> {
  const response = await fetch(`${getApiUrl()}/users/${userId}`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}

export async function getUserDetails(userId: string): Promise<UserDetails> {
  const response = await fetch(`${getApiUrl()}/users/${userId}/details`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
}

export async function updateUser(userId: string, updates: Partial<Pick<User, 'role'>>): Promise<User> {
  const response = await fetch(`${getApiUrl()}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
}

export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${getApiUrl()}/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}