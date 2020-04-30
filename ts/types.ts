/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

export interface Covid19Country {
	name: string;
	id: string;
}

export interface Covid19CountryDaily {
	confirmed: number;
	deaths: number;
	recovered: number;
	active: number;
	date: Date;
}

export interface Covid19RegionDaily {
	country: string;
	province: string;
	city: string;
	lat: number;
	lng: number;
	confirmed: number;
	deaths: number;
	recovered: number;
	active: number;
	date: Date;
}

export interface Covid19ProvinceDaily {
	country: string;
	province: string;
	confirmed: number;
	deaths: number;
	recovered: number;
	active: number;
	date: Date;
}

export interface Covid19SummaryGlobalField {
	new: number;
	total: number;
}

export interface Covid19SummaryCountry {
	country: string;
	id: string;
	confirmed: Covid19SummaryGlobalField;
	deaths: Covid19SummaryGlobalField;
	recovered: Covid19SummaryGlobalField;
	date: Date;
}

export interface Covid19Summary {
	global: {
		confirmed: Covid19SummaryGlobalField,
		deaths: Covid19SummaryGlobalField,
		recovered: Covid19SummaryGlobalField
	};
	countries: Covid19SummaryCountry[];
}