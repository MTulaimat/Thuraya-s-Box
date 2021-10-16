import { lazy } from 'react';
import { authRoles } from "app/auth";

const AdminProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.adminOnly, // ID: 2 Added this to block guest from accessing this page.
	routes: [
		{
			path: '/pages/admin',
			component: lazy(() => import('./AdminProfilePage'))
		}
	]
};

export default AdminProfilePageConfig;
