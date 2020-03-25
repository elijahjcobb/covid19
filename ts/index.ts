/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {PdMethod, PdRequest, PdResponse} from "@element-ts/palladium";

/**
 * An interface for a Country.
 */
export interface Country {
	country: string;
	cases: number;
	todayCases: number;
	deaths: number;
	todayDeaths: number;
	recovered: number;
	active: number;
	critical: number;
	casesPerOneMillion: number;
	deathsPerOneMillion: number;
}

/**
 * An interface for the Global statistics.
 */
export interface Global {
	cases: number;
	deaths: number;
	recovered: number;
}

/**
 * An interface for a report which has all countries, global statistics, and a timestamp.
 */
export interface Report {
	countries: Country[];
	global: Global;
	timestamp: number;
}

export abstract class Covid19 {

	/**
	 * Internal method to get JSON for a URL.
	 * @param url A url to fetch.
	 */
	private static async getData<T>(url: string): Promise<T> {

		const req: PdRequest = new PdRequest();

		req.setUrl(url);
		req.setMethod(PdMethod.Get);

		const res: PdResponse = await req.request();
		const obj: object | undefined = res.getJSON();
		if (!obj) throw new Error("Unable to fetch json from API.");

		return obj as unknown as T;

	}

	/**
	 * Get the statistics for the United States.
	 */
	public static async getUnitedStates(): Promise<Country> {

		return this.getCountry("USA");

	}

	/**
	 * Get the statistics for a specific coutnry.
	 * @param country The country name (will search, does not have to be exact).
	 */
	public static async getCountry(country: string): Promise<Country> {

		return await this.getData(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);

	}

	/**
	 * Get the statistics for all countries.
	 */
	public static async getAllCountries(): Promise<Country[]> {

		return this.getData("https://coronavirus-19-api.herokuapp.com/countries");

	}

	/**
	 * Get the global statistics.
	 */
	public static async getGlobal(): Promise<Global> {

		return this.getData("https://coronavirus-19-api.herokuapp.com/all");

	}

	/**
	 * Get the statistics for all countries and the globe.
	 */
	public static async get(): Promise<Report> {

		const global: Global = await this.getGlobal();
		const countries: Country[] = await this.getAllCountries();

		return {
			global,
			countries,
			timestamp: Date.now()
		};

	}

}