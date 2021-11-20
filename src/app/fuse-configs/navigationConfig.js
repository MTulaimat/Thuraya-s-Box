import { authRoles } from 'app/auth';
import i18next from 'i18next';
import DocumentationNavigation from '../main/documentation/DocumentationNavigation';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'pages',
		title: 'Pages',
		type: 'group',
		icon: 'pages',
		children: [
			{
				id: 'teacher',
				title: 'Home',
				type: 'item',
				auth: authRoles.teacherOnly,
				icon: 'home',
				url: '/pages/teacher'
			},
			{
				id: 'admin',
				title: 'Home',
				type: 'item',
				auth: authRoles.adminOnly,
				icon: 'home',
				url: '/pages/admin'
			},
			{
				id: 'profile',
				title: 'Profile',
				type: 'item',
				auth: authRoles.studentOnly,
				icon: 'person',
				url: '/pages/student',
			},
			{
				id: 'playground',
				title: 'Playground',
				type: 'item',
				auth: authRoles.studentOrHigher,
				icon: 'computer',
				url: '/pages/custom/PlaygroundPage'
			},

			{
				id: 'leaderboard',
				title: 'Leaderboard',
				type: 'item',
				auth: authRoles.studentOrHigher,
				icon: 'leaderboard',
				url: '/pages/leaderboard'
			}

			// TODOXD Remove this if it's not needed, I created teacherprofile page instead
			// {
			// 	id: 'students',
			// 	title: 'Students',
			// 	type: 'item',
			// 	auth: authRoles.teacherOrHigher,
			// 	icon: 'people',
			// 	url: '/pages/custom/StudentsPage'
			// }
		]
	},
	{
		type: 'divider',
		id: 'divider-2'
	},
	{
		id: 'actions',
		title: 'Actions',
		type: 'group',
		icon: 'pages',
		children: [
			{
				id: 'logout',
				title: 'Log out',
				type: 'item',
				auth: authRoles.studentOrHigher,
				url: '/logout',
				icon: 'exit_to_app'
			},
			{
				type: 'divider',
				id: 'divider-2'
			},
		]
	},
	/*{
		id: 'user-interface',
		title: 'FOR DEVELOPMENT',
		type: 'collapse',
		icon: 'web',
		children: [
			DocumentationNavigation,
			{
				id: 'icons',
				title: 'Icons',
				type: 'item',
				icon: 'photo',
				url: '/ui/icons'
			},
			{
				id: 'ui-typography',
				title: 'Typography',
				type: 'item',
				icon: 'text_fields',
				url: '/ui/typography'
			},
			{
				id: 'helper-classes',
				title: 'Helper Classes',
				type: 'item',
				icon: 'help_outline',
				url: '/ui/helper-classes'
			},
			{
				id: 'page-layouts',
				title: 'Page Layouts',
				type: 'collapse',
				icon: 'view_quilt',
				children: [
					{
						id: 'carded',
						title: 'Carded',
						type: 'collapse',
						badge: {
							title: 12,
							bg: '#525E8A',
							fg: '#FFFFFF'
						},
						children: [
							{
								id: 'carded-full-width',
								title: 'Full Width',
								type: 'item',
								url: '/ui/page-layouts/carded/full-width'
							},
							{
								id: 'carded-full-width-tabbed',
								title: 'Full Width Tabbed',
								type: 'item',
								url: '/ui/page-layouts/carded/full-width-tabbed'
							},
							{
								id: 'carded-full-width-2',
								title: 'Full Width 2',
								type: 'item',
								url: '/ui/page-layouts/carded/full-width-2'
							},
							{
								id: 'carded-full-width-2-tabbed',
								title: 'Full Width 2 Tabbed',
								type: 'item',
								url: '/ui/page-layouts/carded/full-width-2-tabbed'
							},
							{
								id: 'carded-left-sidebar',
								title: 'Left Sidebar',
								type: 'item',
								url: '/ui/page-layouts/carded/left-sidebar'
							},
							{
								id: 'carded-left-sidebar-tabbed',
								title: 'Left Sidebar Tabbed',
								type: 'item',
								url: '/ui/page-layouts/carded/left-sidebar-tabbed'
							},
							{
								id: 'carded-left-sidebar-2',
								title: 'Left Sidebar 2',
								type: 'item',
								url: '/ui/page-layouts/carded/left-sidebar-2'
							},
							{
								id: 'carded-left-sidebar-2-tabbed',
								title: 'Left Sidebar 2 Tabbed',
								type: 'item',
								url: '/ui/page-layouts/carded/left-sidebar-2-tabbed'
							},
							{
								id: 'carded-right-sidebar',
								title: 'Right Sidebar',
								type: 'item',
								url: '/ui/page-layouts/carded/right-sidebar'
							},
							{
								id: 'carded-right-sidebar-tabbed',
								title: 'Right Sidebar Tabbed',
								type: 'item',
								url: '/ui/page-layouts/carded/right-sidebar-tabbed'
							},
							{
								id: 'carded-right-sidebar-2',
								title: 'Right Sidebar 2',
								type: 'item',
								url: '/ui/page-layouts/carded/right-sidebar-2'
							},
							{
								id: 'carded-right-sidebar-2-tabbed',
								title: 'Right Sidebar 2 Tabbed',
								type: 'item',
								url: '/ui/page-layouts/carded/right-sidebar-2-tabbed'
							}
						]
					},
					{
						id: 'simple',
						title: 'Simple',
						type: 'collapse',
						badge: {
							title: 8,
							bg: '#525E8A',
							fg: '#FFFFFF'
						},
						children: [
							{
								id: 'simple-full-width',
								title: 'Full Width',
								type: 'item',
								url: '/ui/page-layouts/simple/full-width'
							},
							{
								id: 'simple-left-sidebar',
								title: 'Left Sidebar',
								type: 'item',
								url: '/ui/page-layouts/simple/left-sidebar'
							},
							{
								id: 'simple-left-sidebar-2',
								title: 'Left Sidebar 2',
								type: 'item',
								url: '/ui/page-layouts/simple/left-sidebar-2'
							},
							{
								id: 'simple-left-sidebar-3',
								title: 'Left Sidebar 3',
								type: 'item',
								url: '/ui/page-layouts/simple/left-sidebar-3'
							},
							{
								id: 'simple-right-sidebar',
								title: 'Right Sidebar',
								type: 'item',
								url: '/ui/page-layouts/simple/right-sidebar'
							},
							{
								id: 'simple-right-sidebar-2',
								title: 'Right Sidebar 2',
								type: 'item',
								url: '/ui/page-layouts/simple/right-sidebar-2'
							},
							{
								id: 'simple-right-sidebar-3',
								title: 'Right Sidebar 3',
								type: 'item',
								url: '/ui/page-layouts/simple/right-sidebar-3'
							},
							{
								id: 'simple-tabbed',
								title: 'Tabbed',
								type: 'item',
								url: '/ui/page-layouts/simple/tabbed'
							}
						]
					},
					{
						id: 'blank',
						title: 'Blank',
						type: 'item',
						url: '/ui/page-layouts/blank'
					}
				]
			},
			{
				id: 'auth',
				title: 'Auth',
				type: 'group',
				icon: 'verified_user',
				children: [
					{
						id: 'login',
						title: 'Login',
						type: 'item',
						url: '/login',
						auth: authRoles.guestOnly,
						icon: 'lock'
					},
					{
						id: 'register',
						title: 'Register',
						type: 'item',
						url: '/register',
						auth: authRoles.guestOnly,
						icon: 'person_add'
					},
					{
						id: 'logout',
						title: 'Logout',
						type: 'item',
						auth: authRoles.studentOrHigher,
						url: '/logout',
						icon: 'exit_to_app'
					},
					{
						id: 'auth-admin-example',
						title: 'Admin: Auth protected page',
						type: 'item',
						url: '/auth/admin-role-example',
						icon: 'security'
					},
					{
						id: 'only-admin-navigation-item',
						title: 'Nav item only for Admin',
						type: 'item',
						auth: authRoles.adminOnly,
						url: '/auth/admin-role-example',
						icon: 'verified_user'
					},
					{
						id: 'auth-staff-example',
						title: 'Staff: Auth protected page',
						type: 'item',
						url: '/auth/staff-role-example',
						icon: 'security'
					},
					{
						id: 'only-staff-navigation-item',
						title: 'Nav item only for Staff',
						type: 'item',
						auth: authRoles.teacherOrHigher,
						url: '/auth/staff-role-example',
						icon: 'verified_user'
					},
					{
						id: 'auth-guest-example',
						title: 'Guest: Auth protected page',
						type: 'item',
						url: '/auth/guest-role-example',
						icon: 'security'
					},
					{
						id: 'only-guest-navigation-item',
						title: 'Nav item only for Guest',
						type: 'item',
						auth: authRoles.guestOnly,
						url: '/auth/guest-role-example',
						icon: 'verified_user'
					}
				]
			}
		]
	}*/
];

export default navigationConfig;
