
export interface OptionsForGetHostWithPort {
	protocol: string;
	port: number;
	hostname: string;
}

export function getHostWithPort(
	opts: OptionsForGetHostWithPort
): string {
	let requestURLPrefix: string = `${opts.protocol}://${opts.hostname}`;
	if (!isNaN(opts.port) && opts.port !== 80 && opts.port !== 8080) {
		requestURLPrefix = `${requestURLPrefix}:${opts.port}`
	}
	return requestURLPrefix;
}
