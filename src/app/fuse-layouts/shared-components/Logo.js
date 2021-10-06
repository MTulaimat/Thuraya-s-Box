import { makeStyles } from '@material-ui/core/styles';
import { navbarCloseMobile } from 'app/store/fuse/navbarSlice';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const useStyles = makeStyles(theme => ({
	root: {
		'& .logo-icon': {
			transition: theme.transitions.create(['width', 'height'], {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		},
		'& .react-badge, & .logo-text': {
			transition: theme.transitions.create('opacity', {
				duration: theme.transitions.duration.shortest,
				easing: theme.transitions.easing.easeInOut
			})
		}
	},
	reactBadge: {
		backgroundColor: '#121212',
		color: '#61DAFB'
	}
}));

function Logo() {
	const classes = useStyles();
	const dispatch = useDispatch();

	function closeNavbar() {
		dispatch(navbarCloseMobile()); // TODOXD this is how to close navbar
	}

	return (
		<div className={clsx(classes.root, 'flex items-center')}>
			<Link to="/" onClick={() => closeNavbar()}>
				<img
					className="logo-icon w-36 h-36"
					src="assets/images/logos/Thurayas box - Logo only.svg"
					alt="logo"
				/>
			</Link>
		</div>
	);
}

export default Logo;
