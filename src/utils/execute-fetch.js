export class HttpError extends Error {
	constructor(mappedResponse) {
		super(mappedResponse.statusText);

		for (const key in mappedResponse) {
			if (Reflect.has(mappedResponse, key)) {
				this[key] = mappedResponse[key];
			}
		}
	}
}

const executeFetch = async (...args) => {
	const response = await fetch(...args);

	let body = await response.text();

	try {
		if (response.headers.get('content-type').includes('application/json')) {
			body = JSON.parse(body);
		}
	} catch {}

	const mappedResponse = {
		body,
		status: response.status,
		statusText: response.statusText,
	};

	if (response.ok) {
		return mappedResponse;
	}

	throw new HttpError(mappedResponse);
};

export default executeFetch;
