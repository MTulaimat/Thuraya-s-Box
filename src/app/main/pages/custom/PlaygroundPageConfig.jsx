import { lazy } from 'react';
import { authRoles } from 'app/auth'

const PlaygroundPage = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.student, //TODOXD enable this when done with students page dev
	routes: [
		{
			path: '/pages/custom/PlaygroundPage',
			component: lazy(() => import('./PlaygroundPage'))
		}
	]
};

export default PlaygroundPage;
