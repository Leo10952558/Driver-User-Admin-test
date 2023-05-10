import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'tabler-home' },
  },
  {
    title: 'Live map',
    icon: { icon: 'tabler-map' },
  },
  {
    title: 'Routes',
    icon: { icon: 'tabler-route' },
    children: [
      {
        title: 'Routes 1',
        to: null,
      },
      {
        title: 'Routes 2',
        to: null
      },
    ],
  },
  {
    title: 'Trucks',
    icon: { icon: 'tabler-truck' },
    children: [
      {
        title: 'Trucks 1',
        to: null,
      },
      {
        title: 'Trucks 2',
        to: null
      },
    ],
  },
  {
    title: 'Drivers',
    icon: { icon: 'tabler-user-circle' },
    children: [
      {
        title: 'Overview',
        to: { name: 'drivers-list' },
      },
      {
        title: 'Alerts',
        to: null
      },
    ],
  },
  {
    title: 'Timesheets',
    icon: { icon: 'tabler-calendar-stats' },
    children: [
      {
        title: 'Timesheets 1',
        to: null,
      },
      {
        title: 'Timesheets 2',
        to: null
      },
    ],
  },
  {
    title: 'Announcements',
    icon: { icon: 'tabler-alert-circle' },
    children: [
      {
        title: 'Announcements 1',
        to: null,
      },
      {
        title: 'Announcements 2',
        to: null
      },
    ],
  },
  {
    title: 'Dashboard',
    to: { name: 'index' },
    icon: { icon: 'tabler-home' },
  },
] as VerticalNavItems
