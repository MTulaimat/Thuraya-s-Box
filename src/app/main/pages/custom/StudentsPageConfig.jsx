import { lazy } from 'react';
import { authRoles } from 'app/auth'

const StudentsPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.teacher, //TODOXD enable this when done with students page dev
	routes: [
		{
			path: '/pages/custom/StudentsPage',
			component: lazy(() => import('./StudentsPage'))
		}
	]
};

export default StudentsPageConfig;
