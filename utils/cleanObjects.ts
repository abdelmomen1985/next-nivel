export function cleanObjects(obj: any) {
	for (var propName in obj) {
		if (
			obj[propName] === null ||
			obj[propName] === undefined ||
			obj[propName] === '' ||
			obj[propName] === ' ' ||
			obj[propName] === 'default' ||
			(typeof obj[propName] === 'object' && obj[propName].length === 0)
		) {
			delete obj[propName];
		}
	}
	return obj;
}
