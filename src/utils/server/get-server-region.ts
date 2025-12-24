import staticServerIps from "@/utils/server/static-server-ips.json";

interface ServerIps {
	[key: string]: {
		country_code: string;
		region_name: string;
	};
}

function isPrivateIP(ip: string): boolean {
	const privateRanges = [/^10\./, /^172\.(1[6-9]|2[0-9]|3[0-1])\./];

	return privateRanges.some((range) => range.test(ip));
}

export async function getServerRegion(address: string | undefined): Promise<{ country: string; location: string }> {
	if (!address) return { country: "N/A", location: "Unknown" };
	if (isPrivateIP(address)) return { country: "N/A", location: "Unknown" };

	const ip = `${address.substring(0, address.lastIndexOf("."))}.0`;
	const region = (staticServerIps as ServerIps)[ip];

	if (region) {
		return {
			country: region.country_code,
			location: region.region_name,
		};
	}

	const regionResponse = await fetch(`http://ip-api.com/json/${address}`)
		.then((res) => res.json())
		.catch(() => undefined);

	if (regionResponse?.status === "success") {
		return {
			country: regionResponse.countryCode,
			location: regionResponse.regionName,
		};
	}

	return { country: "N/A", location: "Unknown - err" };
}
