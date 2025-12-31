/** biome-ignore-all lint/suspicious/useAdjacentOverloadSignatures: biome bugs out on static methods */

export function lockConsole() {
	const prevLog = console.log;
	const prevInfo = console.info;
	const prevWarn = console.warn;
	const prevError = console.error;
	const prevDebug = console.debug;

	const noop = () => {};
	const props = {
		configurable: true,
		enumerable: true,
		set: noop,
	};

	Object.defineProperties(console, {
		log: {
			...props,
			get: () => prevLog,
		},
		info: {
			...props,
			get: () => prevInfo,
		},
		warn: {
			...props,
			get: () => prevWarn,
		},
		error: {
			...props,
			get: () => prevError,
		},
		debug: {
			...props,
			get: () => prevDebug,
		},
	});
}

export class Logger {
	static log(name: string, ...args: any[]) {
		dft.log(`[${name}]`, ...args);
	}

	static info(name: string, ...args: any[]) {
		dft.info(`[${name}]`, ...args);
	}

	static error(name: string, ...args: any[]) {
		dft.error(`[${name}]`, ...args);
	}

	static warn(name: string, ...args: any[]) {
		dft.warn(`[${name}]`, ...args);
	}

	static debug(name: string, ...args: any[]) {
		dft.debug(`[${name}]`, ...args);
	}

	constructor(
		public name: string,
		public color: string = "white",
	) {}

	private _log(level: "log" | "warn" | "error" | "info" | "debug", color: string, args: any[]) {
		console[level](
			`%c RBXEXTRA %c %c ${this.name} `,
			`background: ${color}; color: black; font-weight: bold; border-radius: 5px;`,
			"",
			`background: ${this.color}; color: black; font-weight: bold; border-radius: 5px;`,
			...args,
		);
	}

	public log(...args: any[]) {
		this._log("log", "#a6d189", args);
	}

	public info(...args: any[]) {
		this._log("info", "#89cfd1ff", args);
	}

	public error(...args: any[]) {
		this._log("error", "#e78284", args);
	}

	public warn(...args: any[]) {
		this._log("warn", "#e5c890", args);
	}

	public debug(...args: any[]) {
		this._log("debug", "#eebebe", args);
	}
}

const dft = new Logger("Default");
