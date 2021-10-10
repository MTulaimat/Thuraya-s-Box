import { authRoles } from 'app/auth';
import { lazy } from 'react';

const AnalyticsDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.studentOrHigher, //TODOXD enable this when publishing
	routes: [
		{
			path: '/apps/dashboards/analytics',
			component: lazy(() => import('./AnalyticsDashboardApp'))
		}
	]
};

export default AnalyticsDashboardAppConfig;
