export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('bn', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}).format(new Date(date));
