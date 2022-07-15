import {useRef, useEffect} from 'react'
import Chart from 'chart.js'

interface Props {
	chartData: number[],
	label: string
}

const DataChart = ({chartData, label}: Props) => {
	let labels:string[] = [];
	let len:number = chartData.length;
	const monthNames:string[] = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	for (let i = 0; i < len; i++)
	{
		let date:Date = new Date();
		let dayBeforeDays:Date = new Date(date.setDate(date.getDate() - i));

		labels.push(`${dayBeforeDays.getDate()}  ${monthNames[dayBeforeDays.getMonth()]}`);
	}
	const formatData = (data: number[]): Chart.ChartData =>({
		labels: labels,
		datasets: [
			{
			label: label,
			data: data,
			borderColor: 'rgb(75, 192, 192)'
			}
		]
	})

	const chartRef = useRef<Chart | null>(null)

	const canvasCallback = (canvas: HTMLCanvasElement | null) => {
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (ctx) {
		chartRef.current = new Chart(ctx, {
			type: "line",
			data: formatData(chartData),
			options: {
				responsive: true,
				elements: {
					point: {
						radius: 0
					}
				}
			}
		});
		}
	};

	useEffect(() => {
		if (!chartRef.current || chartData) return;

		chartRef.current.data = formatData(chartData);
		chartRef.current.update();
	}, [chartRef.current, chartData]);

	return (
		<div className="self-center w-1/2">
		<div className="overflow-hidden" style={{minWidth: '300px'}}>
			<canvas ref={canvasCallback}></canvas>
		</div>
		</div>
	);
}

export default DataChart