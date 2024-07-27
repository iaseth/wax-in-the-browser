import React from "react";
import { Footer, Header } from "../../components";
import { CandleDS } from "../../types";



export default function MainPage () {
	const [file, setFile] = React.useState<File|null>(null);
	const [candles, setCandles] = React.useState<CandleDS[]>([]);

	function handleChange (ev: React.ChangeEvent<HTMLInputElement>) {
		if (ev.target.files) {
			const firstFile = ev.target.files[0];
			setFile(firstFile);

			const fr = new FileReader();
			fr.onload = () => {
				if (fr.result && fr.result instanceof ArrayBuffer) {
					const buffer: ArrayBuffer = fr.result;
					const bytes = new Uint8Array(buffer);
					const numberOfCandles = Math.floor(bytes.length / 5);
					const candles: CandleDS[] = [];

					for (let index = 0; index < numberOfCandles; index++) {
						if (index >= 100) break;

						const start = index * 5;
						const end = start + 5;
						const arr = bytes.slice(start, end);
						const candle: CandleDS = {
							timestamp: arr[0],
							open: arr[1],
							high: arr[2],
							low: arr[3],
							close: arr[4]
						};
						candles.push(candle);
					}

					setCandles(candles);
				}
			};

			fr.readAsArrayBuffer(firstFile);
		}
	}

	return (
		<div>
			<Header />

			<main className="min-h-screen py-12">
				<section className="max-w-5xl mx-auto px-4">
					<h4>Wax in the Browser</h4>

					<section className="py-4">
						<input type="file" onChange={handleChange} />
					</section>

					<section className="py-12">
						<table>
							<tbody>
								{candles.map((candle, i) => <tr key={i}>
									<td>{i+1}</td>
									<td>{candle.timestamp}</td>
									<td>{candle.open}</td>
									<td>{candle.high}</td>
									<td>{candle.low}</td>
									<td>{candle.close}</td>
								</tr>)}
							</tbody>
						</table>
					</section>
				</section>
			</main>

			<Footer />
		</div>
	);
}
