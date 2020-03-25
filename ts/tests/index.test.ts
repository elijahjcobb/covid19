import {Covid19, Country, Global, Report} from "../index";

describe("Country", (): void => {

	test("Variable Based", async(): Promise<void> => {

		const country: Country = await Covid19.getCountry("Italy");
		expect(country).toBeDefined();
		expect(country.country).toEqual("Italy");
		expect(country.cases).toBeGreaterThan(0);

	});

	test("USA", async(): Promise<void> => {

		const country: Country = await Covid19.getUnitedStates();
		expect(country).toBeDefined();
		expect(country.country).toEqual("USA");
		expect(country.cases).toBeGreaterThan(0);

	});

	test("Undefined", async(): Promise<void> => {

		let didThrow: boolean = false;

		try {
			await Covid19.getCountry("32900239fk2039fk09kpok");
		} catch (e) {
			didThrow = true;
		}

		expect(didThrow).toBeTruthy();

	});

});

function testGlobal(global: Global): void {
	expect(global).toBeDefined();
	expect(global.cases).toBeDefined();
	expect(global.deaths).toBeDefined();
	expect(global.recovered).toBeDefined();
	expect(global.cases).toBeGreaterThan(0);
	expect(global.deaths).toBeGreaterThan(0);
	expect(global.recovered).toBeGreaterThan(0);
}

test("Global", async(): Promise<void> => {

	const global: Global = await Covid19.getGlobal();
	testGlobal(global);

});

function testCountries(countries: Country[]): void {

	expect(countries).toBeDefined();
	expect(countries.length).toBeGreaterThan(0);

	for (const country of countries) {

		expect(country).toBeDefined();
		expect(country.country).toBeDefined();

	}

}

test("All Countries", async(): Promise<void> => {

	const countries: Country[] = await Covid19.getAllCountries();
	testCountries(countries);

});

test("Report", async(): Promise<void> => {

	const report: Report = await Covid19.get();

	testGlobal(report.global);
	testCountries(report.countries);

});
