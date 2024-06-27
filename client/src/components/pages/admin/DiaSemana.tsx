function DiaSemana({ horario, dia }) {
	const bloques = [
		"M1 8am - 9am",
		"M2 9am - 10 am",
		"M3 10am - 11am",
		"M4 11am - 12am",
		"M4 11am - 12am",
		"M4 11am - 12am",
		"M4 11am - 12am",
		"M4 11am - 12am",
		"M4 11am - 12am",
	];
	const lista = horario.map((item: [], index: number) => {
		const ayudantes = item.join();
		if (ayudantes.length === 0) {
			return <ul key={index}>{bloques[index]}: Vacio</ul>;
		} else {
			return (
				<ul key={index}>
					<div className="">
						{bloques[index]}: {ayudantes}
					</div>
				</ul>
			);
		}
	});

	return (
		<div>
			<div className="text-center">{dia}</div>
			<div className="ml-20">{lista}</div>
		</div>
	);
}

export default DiaSemana;
