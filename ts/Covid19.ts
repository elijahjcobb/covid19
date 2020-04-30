/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

import {PdMethod, PdRequest, PdResponse} from "@element-ts/palladium";
import {
	Covid19ProvinceDaily,
	Covid19RegionDaily,
	Covid19SummaryCountry,
	Covid19Summary,
	Covid19CountryDaily,
	Covid19Country
} from "./types";

export abstract class Covid19 {

	/**
	 * Internal method to fetch the JSON from an endpoint.
	 * @param endpoint The endpoint to access.
	 */
	private static async fetch<T extends object>(endpoint: string): Promise<T> {

		const request: PdRequest = new PdRequest();

		request.setMethod(PdMethod.Get);
		request.setUrl("https://api.covid19api.com" + endpoint);

		const res: PdResponse = await request.request();

		if (res.statusCode !== 200) throw new Error("Received non 200 status code: " + res.statusCode + " from API.");
		const obj: object | undefined = res.getJSON();
		if (obj === undefined) throw new Error("Response from API was undefined.");

		return obj as unknown as T;

	}

	/**
	 * Get the name and id of all countries in the dataset.
	 */
	public static async getAllCountries(): Promise<Covid19Country[]> {

		const nonFormattedResponse: {Country: string, Slug: string}[] = await this.fetch("/countries");
		const countries: Covid19Country[] = [];

		for (const c of nonFormattedResponse) {
			countries.push({
				name: c.Country,
				id: c.Slug
			});
		}

		return countries;

	}

	/**
	 * Get all days for a country.
	 * @param id The country's id which can be found by calling getAllCountries().
	 */
	public static async getDailyForCountry(id: string): Promise<Covid19CountryDaily[]> {

		const nonFormattedResponse: {
			Confirmed: number,
			Deaths: number,
			Recovered: number,
			Active: number,
			Date: string
		}[] = await this.fetch("/total/dayone/country/" + id);
		const countries: Covid19CountryDaily[] = [];

		for (const c of nonFormattedResponse) {
			countries.push({
				confirmed: c.Confirmed,
				deaths: c.Deaths,
				recovered: c.Recovered,
				active: c.Active,
				date: new Date(c.Date)
			});
		}

		return countries;

	}

	/**
	 * Get all regions for all days for a country.
	 * @param id The country's id which can be found by calling getAllCountries().
	 */
	public static async getDailyForRegionsInCountry(id: string): Promise<Covid19RegionDaily[]> {

		const nonFormattedResponse: {
			Country: string,
			Province: string,
			City: string,
			Lat: string,
			Lon: string,
			Confirmed: number,
			Deaths: number,
			Recovered: number,
			Active: number,
			Date: string
		}[] = await this.fetch("/dayone/country/" + id);
		const countries: Covid19RegionDaily[] = [];

		for (const c of nonFormattedResponse) {
			countries.push({
				country: c.Country,
				province: c.Province,
				city: c.City,
				lat: parseFloat(c.Lat),
				lng: parseFloat(c.Lon),
				confirmed: c.Confirmed,
				deaths: c.Deaths,
				recovered: c.Recovered,
				active: c.Active,
				date: new Date(c.Date)
			});
		}

		return countries;

	}

	/**
	 * Get all provinces for all days for a country.
	 * @param id The country's id which can be found by calling getAllCountries().
	 */
	public static async getDailyForProvincesInCountry(id: string): Promise<Covid19ProvinceDaily[]> {

		const regions: Covid19RegionDaily[] = await this.getDailyForRegionsInCountry(id);
		const provinces: { [province: string]: Covid19ProvinceDaily } = {};

		for (const r of regions) {

			const p: Covid19ProvinceDaily | undefined = provinces[r.province];

			if (p === undefined) {
				provinces[r.province] = {
					active: r.active,
					confirmed: r.confirmed,
					country: r.country,
					date: r.date,
					deaths: r.deaths,
					province: r.province,
					recovered: r.recovered
				};
				continue;
			}

			p.confirmed += r.confirmed;
			p.deaths += r.deaths;
			p.recovered += r.recovered;

			provinces[p.province] = p;

		}

		return Object.values(provinces);

	}

	/**
	 * Get a summary of today.
	 */
	public static async getSummary(): Promise<Covid19Summary> {

		const nonFormattedResponse: {
			Global: {
				NewConfirmed: number,
				TotalConfirmed: number,
				NewDeaths: number,
				TotalDeaths: number,
				NewRecovered: number,
				TotalRecovered: number
			},
			Countries: {
				Country: string,
				Slug: string,
				NewConfirmed: number,
				TotalConfirmed: number,
				NewDeaths: number,
				TotalDeaths: number,
				NewRecovered: number,
				TotalRecovered: number,
				Date: string
			}[]
		} = await this.fetch("/summary");

		const countries: Covid19SummaryCountry[] = [];

		for (const c of nonFormattedResponse.Countries) {
			countries.push({
				country: c.Country,
				id: c.Slug,
				date: new Date(c.Date),
				confirmed: {
					new: c.NewConfirmed,
					total: c.TotalConfirmed
				},
				deaths: {
					new: c.NewDeaths,
					total: c.TotalDeaths
				},
				recovered: {
					new: c.NewRecovered,
					total: c.TotalRecovered
				}
			});
		}

		return {
			global: {
				confirmed: {
					new: nonFormattedResponse.Global.NewConfirmed,
					total: nonFormattedResponse.Global.TotalConfirmed
				},
				deaths: {
					new: nonFormattedResponse.Global.NewDeaths,
					total: nonFormattedResponse.Global.TotalDeaths
				},
				recovered: {
					new: nonFormattedResponse.Global.NewRecovered,
					total: nonFormattedResponse.Global.TotalRecovered
				}
			},
			countries
		};

	}

}