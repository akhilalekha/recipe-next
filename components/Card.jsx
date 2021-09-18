/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

export default function Card({
	image,
	name,
	calories,
	time,
	dietlabels,
	url,
	ingredients
}) {
	return (
		<div className="border-2 border-white flex flex-col w-80 h-96 p-4 bg-white m-2 rounded-md shadow-md overflow-y-auto hover:border-blue-600">
			<Link href={url}>
				<a target="_blank">
					<img
						className="w-full h-60 rounded-md object-cover"
						src={image}
						alt="recipe"
					/>
					<div className="">
						<div className="font-bold text-xl text-left whitespace-pre-wrap">
							{name}

							{dietlabels.map((label) =>
								label ? (
									<span
										className="inline-block text-sm font-normal bg-green-700 px-2 mx-2 rounded-md text-white whitespace-normal"
										key={label}
									>
										{label}
									</span>
								) : null
							)}
						</div>

						<div className="flex">
							<img src="/time.svg" width="15" height="15" alt="time" />
							<span className="mx-2 font-medium text-sm">{time} min</span>
						</div>

						<div className="flex">
							<Image src="/calories.svg" width="15" height="15" alt="" />
							<p className="mx-2 font-medium text-sm">
								{Math.floor(calories)} kcal
							</p>
						</div>
					</div>
				</a>
			</Link>
		</div>
	);
}
