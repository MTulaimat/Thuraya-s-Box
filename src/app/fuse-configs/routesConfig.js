import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import RegisterConfig from 'app/main/register/RegisterConfig';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import musabPagesConfig from 'app/main/pages/custom/musabPagesConfig';
import { Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { useState } from "react";
import { useSelector } from "react-redux";


const routeConfigs = [
	//...appsConfigs,
	//...pagesConfigs,
	//...authRoleExamplesConfigs,
	//DocumentationConfig,
	//UserInterfaceConfig,
	...musabPagesConfig,
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	LogoutConfig,
	CallbackConfig,
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
	{
		path: '/',
		exact: true,
		component: () => {
			const user = useSelector(({ auth }) => auth.user);

			if (user.role.toString().includes('student')) {
				return <Redirect to="/pages/custom/PlaygroundPage" />; // ID: 1 Changed this so that the homepage is the playground page.
			} else if (user.role.toString().includes('teacher')) {
				return <Redirect to="/pages/teacher" />;
			} else {
				return <Redirect to="/pages/admin" />;
			}
		}
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
