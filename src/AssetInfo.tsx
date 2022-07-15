import React from 'react';
import {Grid, Card, CardContent} from '@mui/material';

interface AssetInfoInterface {
    assetId?: string,
    asset?: string,
    farm?: string
}

export const AssetInfo = ({assetId, asset, farm}:AssetInfoInterface) => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Card sx={card}>
                    <CardContent>
                        <p style={textStyle}>Name: {assetId}</p>
                        <p style={textStyle}>Asset: {asset}</p>
                        <p style={textStyle}>Farm: {farm}</p>
                    </CardContent>
                </Card>	
            </Grid>
        </Grid>
    )
}

const textStyle = {
	color: 'rgb(75, 192, 192)',
	fontWeight: 'bold'
}

const card = {
	minWidth: 300,
	backgroundColor: '#31363D',
	margin: '5px'
}
