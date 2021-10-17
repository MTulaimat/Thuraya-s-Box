import { lazy } from 'react';
import { authRoles } from "app/auth";

const StudentPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.studentOrHigher, // ID: 2 Added this to block guest from accessing this page.
	routes: [
		{
			path: '/pages/student',
			component: lazy(() => import('./StudentPage'))
		}
	]
};

export default StudentPageConfig;
