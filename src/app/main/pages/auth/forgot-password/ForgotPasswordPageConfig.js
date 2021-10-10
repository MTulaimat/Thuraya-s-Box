import { lazy } from 'react';
import { authRoles } from 'app/auth';

const ForgotPasswordPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.guestOnly,
	routes: [
		{
			path: '/forgot-password',
			component: lazy(() => import('./ForgotPasswordPage'))
		}
	]
};

export default ForgotPasswordPageConfig;
