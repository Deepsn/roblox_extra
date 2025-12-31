const LOCALE_REGEX = /^[a-z]{2}(-[a-z]{2})?$/i;

export function getUrl() {
	const path = location.pathname.split("/").slice(1);
	let hostname: string | undefined = location.hostname.split(".")[0].trim();
	let locale = "en";
	let pathname: string;

	if (hostname === "www") {
		hostname = undefined;
	}

	if (path.length > 1 && LOCALE_REGEX.test(path[0])) {
		locale = path[0];
		pathname = path[1];
	} else {
		pathname = path[0];
	}

	return { hostname, locale, pathname };
}
