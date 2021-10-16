import { lazy } from 'react';
import { authRoles } from "app/auth";

const LeaderboardPageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.studentOrHigher, // ID: 2 Added this to block guest from accessing this page.
	routes: [
		{
			path: '/pages/leaderboard',
			component: lazy(() => import('./Leaderboard'))
		}
	]
};

export default LeaderboardPageConfig;
