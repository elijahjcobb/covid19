import {
	Covid19,
	Covid19Country,
	Covid19CountryDaily,
	Covid19ProvinceDaily,
	Covid19RegionDaily,
	Covid19Summary
} from "../index";

jest.setTimeout(1000000);

test("getAllCountries", async(): Promise<void> => {

	const countries: Covid19Country[] = await Covid19.getAllCountries();

	for (const c of countries) {

		expect(c.name).toBeDefined();
		expect(c.name.length).toBeGreaterThan(0);
		expect(c.id).toBeDefined();
		expect(c.id.length).toBeGreaterThan(0);

	}

});

test("summary", async(): Promise<void> => {

	const summary: Covid19Summary = await Covid19.getSummary();

	expect(summary).toBeDefined();
	expect(summary.global).toBeDefined();
	expect(summary.global.recovered).toBeDefined();
	expect(summary.global.deaths).toBeDefined();
	expect(summary.global.confirmed).toBeDefined();
	expect(summary.global.recovered.total).toBeGreaterThanOrEqual(summary.global.recovered.new);
	expect(summary.global.deaths.total).toBeGreaterThanOrEqual(summary.global.deaths.new);
	expect(summary.global.confirmed.total).toBeGreaterThanOrEqual(summary.global.confirmed.new);

	expect(summary.countries).toBeDefined();

	for (const c of summary.countries) {

		expect(c.date).toBeDefined();
		expect(c.id).toBeDefined();
		expect(c.recovered).toBeDefined();
		expect(c.deaths).toBeDefined();
		expect(c.confirmed).toBeDefined();
		expect(c.recovered.total).toBeGreaterThanOrEqual(c.recovered.new);
		expect(c.deaths.total).toBeGreaterThanOrEqual(c.deaths.new);
		expect(c.confirmed.total).toBeGreaterThanOrEqual(c.confirmed.new);

	}

});

test("daily", async(): Promise<void> => {

	const days: Covid19CountryDaily[] = await Covid19.getDailyForCountry("united-states");
	expect(days.length).toBeGreaterThan(1);

	for (const d of days) {
		expect(d.confirmed).toBeDefined();
		expect(d.recovered).toBeDefined();
		expect(d.deaths).toBeDefined();
		expect(d.date).toBeDefined();
		expect(d.active).toBeDefined();
	}

});

test("provinces", async(): Promise<void> => {

	const provinces: Covid19ProvinceDaily[] = await Covid19.getDailyForProvincesInCountry("united-states");
	expect(provinces.length).toBeGreaterThan(1);

	for (const p of provinces) {

		expect(p.province).toBeDefined();
		expect(p.recovered).toBeDefined();
		expect(p.deaths).toBeDefined();
		expect(p.confirmed).toBeDefined();
		expect(p.active).toBeDefined();
		expect(p.country).toBeDefined();
		expect(p.date).toBeDefined();

	}

});

test("regions", async(): Promise<void> => {

	const regions: Covid19RegionDaily[] = await Covid19.getDailyForRegionsInCountry("united-states");
	expect(regions.length).toBeGreaterThan(1);

	for (const r of regions) {

		expect(r.province).toBeDefined();
		expect(r.recovered).toBeDefined();
		expect(r.deaths).toBeDefined();
		expect(r.confirmed).toBeDefined();
		expect(r.active).toBeDefined();
		expect(r.country).toBeDefined();
		expect(r.date).toBeDefined();
		expect(r.city).toBeDefined();
		expect(r.lat).toBeDefined();
		expect(r.lng).toBeDefined();
	}

});