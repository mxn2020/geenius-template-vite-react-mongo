import React from 'react';
import { Container, Card, Button, Label, Input } from '../lib/dev-container';
import { Settings, Bell, Globe, Moon, Shield } from 'lucide-react';

export function SettingsPage() {
  return (
    <Container componentId="settings-page" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application settings and preferences</p>
      </div>

      {/* General Settings */}
      <Card componentId="general-settings-card" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Settings className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">General Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label componentId="app-name-label" htmlFor="app-name">Application Name</Label>
            <Input
              componentId="app-name-input"
              id="app-name"
              type="text"
              placeholder="My Application"
              className="mt-1"
            />
          </div>
          <div>
            <Label componentId="app-url-label" htmlFor="app-url">Application URL</Label>
            <Input
              componentId="app-url-input"
              id="app-url"
              type="url"
              placeholder="https://myapp.com"
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card componentId="notification-settings-card" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Notification Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email alerts for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-gray-600">Get browser push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card componentId="appearance-settings-card" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Moon className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Appearance</h2>
        </div>
        <div className="space-y-4">
          <div>
            <Label componentId="theme-label" htmlFor="theme">Theme</Label>
            <select
              id="theme"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card componentId="security-settings-card" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-semibold">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Button componentId="enable-2fa-button" variant="outline" size="sm">
              Enable
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Session Timeout</p>
              <p className="text-sm text-gray-600">Automatically log out after inactivity</p>
            </div>
            <select className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button componentId="save-settings-button" variant="default" size="lg">
          Save Settings
        </Button>
      </div>
    </Container>
  );
}