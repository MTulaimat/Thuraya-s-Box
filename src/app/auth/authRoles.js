/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	teacher: ['admin', 'teacher'],
	student: ['admin', 'teacher', 'student'],
	onlyGuest: [] // If logged in (with any role), won't be able to access it.
};

export default authRoles;
