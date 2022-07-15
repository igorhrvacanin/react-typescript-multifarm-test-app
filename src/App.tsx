import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Asset from './Asset';
import {AssetInfo} from './AssetInfo'
import DataChart from './DataChart'
import {Grid, Card, CardContent} from '@mui/material'

const api = axios.create({
baseURL: 'https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000'
})

function App() {
	const [asset, updateAsset] = useState<Asset>();
	const [firstChartData, updateFirstChartData] = useState<number[]>([]);
	const [secondChartData, updateSecondChartData] = useState<number[]>([]);

	useEffect(() => {
		const getData = async () => {
			let idx: string = '';
			let asset: Asset | undefined = undefined;

			api.get('').then(({data}) => {
				idx = data.data.findIndex((x: { assetId: string; }) => x.assetId === 'ETH_Lido__ETH');
				asset = data.data[idx];
				updateAsset(asset);
				
				return asset;
			}).catch(err => {
				return err;
			})
		}

		const setChartData = (trend:string, startPosition:number, numberOfMonths:number) => {
			let data:number[] = [];

			for (let i = 0; i < numberOfMonths; i++)
			{
				if (data.length === 0)
				{
					data.push(startPosition);
				} else
				{
					data.push(trend === 'positive' ? (data[i - 1] + (data[i - 1] * 0.05)) : (data[i - 1] - (data[i - 1] * 0.05)));
				}

			}
			return data;
		}
		
		getData();
		updateFirstChartData(setChartData('positive', 1000, 10));
		updateSecondChartData(setChartData('negative', 50, 15));

	}, []);


	return (
		<div>
			<h1 style={{color: 'white', textAlign: 'center'}}>API Call and fake chart data with React an Typesctipt</h1>
			<AssetInfo {...asset}></AssetInfo>
			<Grid container>
				<Grid item md={6} xs={12}>
					<Card style={cardStyle}>
						<CardContent>
							{asset && <DataChart chartData={firstChartData} label="Asset APR"></DataChart>}
						</CardContent>
					</Card>	
				</Grid>
				<Grid item md={6} xs={12}>
					<Card style={cardStyle}>
						<CardContent>
							{asset && <DataChart chartData={secondChartData} label="Asset TVL"></DataChart>}
						</CardContent>
					</Card>	
				</Grid>
			</Grid>
		</div>
	);
}

const cardStyle = {
	backgroundColor: '#31363D',
	margin: '5px'
}

export default App;
