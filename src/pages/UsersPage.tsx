import React from 'react';
import { Container, Card } from '../lib/dev-container';
import { AlertCircle, Users } from 'lucide-react';
import { useUsersPage } from '../hooks/useUsersPage';
import { UserFilters } from '../components/users/UserFilters';
import { UserTable } from '../components/users/UserTable';
import { UserPagination } from '../components/users/UserPagination';

export function UsersPage() {
  const {
    users,
    pagination,
    isLoading,
    error,
    filters,
    updateFilters,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    handleUserHover,
  } = useUsersPage();

  return (
    <Container componentId="users-page" className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="h-4 w-4" />
          <span>{pagination.totalCount} total users</span>
        </div>
      </div>

      {/* Filters */}
      <UserFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onSearch={() => updateFilters({})} // Triggers refetch
      />

      {/* Error State */}
      {error && (
        <Card componentId="error-card" className="bg-red-50 border-red-200 p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error.message}</p>
          </div>
        </Card>
      )}

      {/* Users Table */}
      {!error && (
        <>
          <UserTable 
            users={users} 
            onUserHover={handleUserHover}
            isLoading={isLoading}
          />

          {/* Pagination */}
          <UserPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={goToPage}
            onNext={nextPage}
            onPrevious={previousPage}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
          />
        </>
      )}
    </Container>
  );
}