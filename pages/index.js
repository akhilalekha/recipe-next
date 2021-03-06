import Head from "next/head";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "../components/Card";
import config from "../config/config";

export default function Home() {
	const limit = 9;
	const [items, setItems] = useState([]);
	const [input, setInput] = useState("");
	const [query, setQuery] = useState("");
	const [loaded, setLoaded] = useState(false);
	const [pg, setPg] = useState({
		from: 0,
		to: 9
	});

	// useEffect(() => {
	// 	console.log("test");
	// 	getRecipes();
	// }, [query]);

	const getRecipes = async (from, to) => {
		let URI = `https://api.edamam.com/search?q=${input}&app_id=${config.appID}&app_key=${config.appKey}&from=${from}&to=${to}`;
		const response = await fetch(URI);
		const data = await response.json();
		// console.log({ data });
		setItems(data.hits);
		if (data) {
			setLoaded(true);
		}
	};

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		getRecipes(pg.from, pg.to);
		// setQuery(input);
		// setInput("");
	};

	const handleNext = () => {
		setPg((prevState) => {
			return {
				from: prevState.from + limit,
				to: prevState.to + limit
			};
		});
		let from = pg.from + limit;
		let to = pg.to + limit;
		getRecipes(from, to);
	};

	const handlePrevious = () => {
		setPg((prevState) => {
			return {
				from: prevState.from - limit,
				to: prevState.to - limit
			};
		});
		let from = pg.from - limit;
		let to = pg.to - limit;
		getRecipes(from, to);
	};

	return (
		<div className="bg-green-800 h-screen">
			<Head>
				<title>Recipe App</title>
				<meta name="description" content="search and see recipes" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col justify-center items-center bg-green-800">
				<div className="lg:pl-40 pl-6 mt-4 w-full">
					<h1 className="font-semibold text-3xl text-white">
						Search for recipes
					</h1>
				</div>

				<form
					className="flex flex-wrap lg:flex-nowrap lg:mx-5 mx-2 lg:w-2/3 w-full"
					onSubmit={getSearch}
				>
					<label htmlFor="searchString"></label>
					<input
						id="searchString"
						type="search"
						className="m-5 lg:px-6 px-2 py-2 rounded-md border-none focus:outline-none w-full"
						value={input}
						placeholder="Search recipes..."
						onChange={handleChange}
					/>
					<button
						className="m-5 border-2 border-black text-white bg-black px-6 py-2 rounded-md shadow-sm w-32 hover:border-white"
						type="submit"
					>
						Search
					</button>
				</form>

				{/* <Popup items={loaded ? items : "nothing"} /> */}
				<div className="flex flex-wrap w-full lg:p-14 p-1 justify-center">
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
				</div>

				{loaded && (
					<div className="">
						{pg.from > 0 && (
							<button
								className="m-5 border-2 border-black text-white bg-black px-6 py-2 rounded-md shadow-sm border-none w-32 hover:border-white"
								type="button"
								onClick={handlePrevious}
							>
								Previous
							</button>
						)}

						<button
							className="m-5 border-2 border-black text-white bg-black px-6 py-2 rounded-md shadow-sm w-32 hover:border-white"
							type="button"
							onClick={handleNext}
						>
							Next
						</button>
					</div>
				)}
			</main>
		</div>
	);
}
