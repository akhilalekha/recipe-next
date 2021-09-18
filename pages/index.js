import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";

export default function Home() {
	const [items, setItems] = useState([]);
	const [input, setInput] = useState("");
	const [query, setQuery] = useState("icecream");
	// const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let URI = `https://api.edamam.com/search?q=${query}&app_id=${keys.appID}&app_key=${keys.appKey}`;
		const getRecipes = async () => {
			const response = await fetch(URI);
			const data = await response.json();
			console.log({ data });
			setItems(data.hits);
			// setLoaded(true);
		};
		console.log("test");
		getRecipes();
	}, [query]);

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(input);
		setInput("");
	};
	return (
		<div className="bg-green-800">
			<Head>
				<title>Recipe App</title>
				<meta name="description" content="search and see recipes" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col justify-center items-center h-full">
				<div className="px-8 mt-4 w-full">
					<h1 className="font-semibold text-2xl text-white">
						Search for recipes
					</h1>
				</div>

				<form className="flex mx-5" onSubmit={getSearch}>
					<label htmlFor="searchString"></label>
					<input
						id="searchString"
						type="search"
						className="m-5 px-6 py-2 rounded-md border-none focus:outline-none"
						// value={input}
						placeholder="Search recipes..."
						// onChange={handleChange}
					/>
					<button
						className="m-5 text-white bg-black px-6 py-2 rounded-md shadow-sm border-none"
						type="submit"
						// onClick={getSearch}
					>
						Search
					</button>
				</form>

				{/* <Popup items={loaded ? items : "nothing"} /> */}
				{/* <div className="cardContainer">
					{items.map((item) => (
						<Card
							key={uuidv4()}
							image={item.recipe.image}
							name={item.recipe.label}
							calories={item.recipe.calories}
							time={item.recipe.totalTime}
							dietlabels={item.recipe.dietLabels}
							url={item.recipe.url}
							ingredients={item.recipe.ingredients}
						/>
					))}
				</div> */}
			</main>
		</div>
	);
}
