const getRedirectPath = ({ type, avatar }) => {
	// return the redirect path based on user info
	// user.type /tutor /student
	// user.avatar /tutoinfo /studentinfo
	let url = (type === 'tutor') ? '/student' : '/tutor';
	if (!avatar) {
		url = (type === 'tutor') ? '/tutor' : '/student';
		url += 'info';
	}
	return url
};

const getChatId = (fromId, toId) => {
	return [fromId, toId].sort().join('_');
}

export { getRedirectPath, getChatId };