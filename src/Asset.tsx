type Asset = {
	assetId: string;
	active: boolean,
	asset: string,
	dateAdded: Date,
	farm: string,
	tvlChange24hValue?: number,
	stakingLink: string
}

export default Asset;