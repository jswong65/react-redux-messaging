
const getRedirectPath = ({type, avatar }) => {
	// return the redirect path based on user info
	// user.type /tutor /student
	// user.avatar /tutoinfo /studentinfo
	let url = (type === 'tutor') ? '/tutor' : '/student';
	if (!avatar) {
		url += 'info';
	}
	return url
};

const handleChange = (key, val) => {
	this.setState(() => ({
		[key]: val
	}));
}

export {getRedirectPath, handleChange};