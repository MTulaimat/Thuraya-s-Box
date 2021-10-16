import { lazy } from 'react';
import { authRoles } from "app/auth";

const TeacherProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.teacherOrHigher, // ID: 2 Added this to block guest from accessing this page.
	routes: [
		{
			path: '/pages/teacher', // TODOXD: make this url take the teachers id
			component: lazy(() => import('./TeacherProfilePage'))
		}
	]
};

export default TeacherProfilePageConfig;
