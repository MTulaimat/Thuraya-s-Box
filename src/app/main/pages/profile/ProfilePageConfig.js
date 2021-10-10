import { lazy } from 'react';
import { authRoles } from "app/auth";

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.studentOrHigher, // ID: 2 Added this to block guest from accessing this page.
	routes: [
		{
			path: '/pages/profile',
			component: lazy(() => import('./ProfilePage'))
		}
	]
};

export default ProfilePageConfig;
