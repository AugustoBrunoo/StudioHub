import type { UserRole } from './user';
import React from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
  allowedRoles?: UserRole[];
  description?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
