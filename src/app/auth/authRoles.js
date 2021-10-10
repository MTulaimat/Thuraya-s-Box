/**
 * Authorization Roles
 */
const authRoles = {
	adminOnly: ['admin'],
	teacherOnly: ['teacher'],
	teacherOrHigher: ['admin', 'teacher'],
	studentOnly: ['student'],
	studentOrHigher: ['admin', 'teacher', 'student'],
	guestOnly: [] // If logged in (with any role), won't be able to access it.
};

export default authRoles;
