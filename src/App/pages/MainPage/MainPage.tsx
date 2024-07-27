import React from "react";
import { Footer, Header } from "../../components";



export default function MainPage () {
	const [file, setFile] = React.useState<File|null>(null);

	function handleChange (ev: React.ChangeEvent<HTMLInputElement>) {
		if (ev.target.files) {
			const firstFile = ev.target.files[0];
			setFile(firstFile);

			const fr = new FileReader();
			fr.onload = () => {
				if (fr.result && fr.result instanceof ArrayBuffer) {
					const buffer: ArrayBuffer = fr.result;
					const bytes = new Uint8Array(buffer);
					console.log(bytes);
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
				</section>
			</main>

			<Footer />
		</div>
	);
}
