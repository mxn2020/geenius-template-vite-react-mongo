import React from 'react';
import { DevModeProvider, DevModeFloatingIcon } from './DevModeProvider';
import { Sidebar } from './Sidebar';
import { ComponentRegistry } from '../types';

interface DevModeAppProps {
  children: React.ReactNode;
  registry: ComponentRegistry;
}

export const DevModeApp: React.FC<DevModeAppProps> = ({ children, registry }) => {
  return (
    <DevModeProvider registry={registry}>
      <div className="min-h-screen relative">
        {children}
        <DevModeFloatingIcon />
        <Sidebar />
      </div>
    </DevModeProvider>
  );
};

export default DevModeApp;