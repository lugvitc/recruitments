import { Link } from "react-router-dom";
import Background from "../components/background";
import Card from "../components/Card";

import "./index.scss";

export const rec_open = true;
export const booking = !rec_open && false;
export const results = !rec_open && !booking && false;

export default function Root() {
	// const txtsh = "0px 0px 2px rgb(250 204 21)";
	//   style={{textShadow: `${txtsh}` }}

	return (
		<>
			<section className="main">
				<main>
					<div className="flex flex-col">
						<div className="text-7xl decoration-4 uppercase font-mono">
							Join
							<br /> The
							<br />
							<span className=" italic text-yellow-400 font-semibold">
								Elite
							</span>
						</div>
						{/* <br />Join the <a href="https://chat.whatsapp.com/KdZQ7vmM4JSFjTJSx7togp" className=" underline text-blue-500">whatsapp group</a> if you have applied */}
						{!rec_open ? (<div className=" w-52 font-semibold">{results ? ("Results are released!") : ("Recruitments are closed")}</div>) : null}
						<Link
							aria-disabled="true"
							to="/apply"
							className={
								"rounded-md mt-4 text-xl text-center p-2 text-black font-semibold transition-all border" +
								(!rec_open
									? " bg-yellow-700 border-yellow-700 pointer-events-none"
									: " bg-yellow-400 hover:bg-black hover:text-white border-yellow-400")
							}
						>
							Apply
						</Link>
					</div>
				</main>
			</section>
			<section className="h-fit pt-0 relative">
				<div className="h-screen sticky top-0 -z-10">
					<div className=" absolute top-0 h-screen w-full bg-transparent">
						<Background />
					</div>
				</div>

				<section className="absolute top-0 w-full">
					<div className="flex flex-col justify-center items-center h-full">
						<div className="bg-[#0000008e] rounded-md p-4">
							<h1 className="text-5xl uppercase font-mono">
								What is <br />
								<span className=" italic text-yellow-400 font-semibold">
									LUG?
								</span>
							</h1>
							<p className=" w-80 font-mono">
								A consortium of exceptional talent, united in the pursuit of mastery. <br/>
								A space where learning, growth, and reaching your full potential come together.
							</p>
						</div>
					</div>
				</section>
				<section className=" min-h-screen h-fit flex flex-col justify-center items-center px-4">
					<h1 className="text-5xl uppercase font-mono my-10">
						Why join <br/>
						<span className=" italic text-yellow-400 font-semibold">
							LUG
						</span>?
					</h1>
					<div className="cardscont max-w-[730px] w-4/5 font-mono">
						<Card className="">
							<h2>Learn & Grow</h2>
							<p>
								Want to learn a new skill? Our club offers guidance from experienced members. Join workshops, learn from resources, or even teach your own.
							</p>
						</Card>
						<Card className="">
							<h2>Join the Elite</h2>
							<p>
								Where the sharpest minds come together to redefine excellence. Push beyond your limits with us.
							</p>
						</Card>
						<Card className="">
							<h2>Find your team</h2>
							<p>
								Team up with seniors, form hackathon or CTF teams, and compete together. Mix and match to find your perfect teammates!
							</p>
						</Card>
					</div>
				</section>
				<section>
					<div className="flex flex-col justify-center items-center h-full">
						<div className="bg-[#0000008e] rounded-md p-4">
							<h1 className="text-5xl uppercase font-mono">
								Empower <br />
								<span className=" italic text-yellow-400 font-semibold">
									FOSS
								</span>
							</h1>
							<p className=" w-80 font-mono">
								LUG empowers FOSS among the student body by fostering
								innovation and collaboration through workshops and events.
							</p>
						</div>
					</div>
				</section>
				<section>
					<div className="flex flex-col justify-center items-center h-full">
						<div className="bg-[#0000008e] rounded-md p-4">
							<h1 className="text-5xl uppercase font-mono">
								Be <br />
								<span className=" italic text-yellow-400 font-semibold">
									Valued
								</span>
							</h1>
							<p className=" w-80 font-mono">
								At LUG, we deeply value each member and their
								contributions, fostering a collaborative environment where every
								voice is heard and every idea matters.
							</p>
						</div>
					</div>
				</section>
				<section className=" min-h-screen h-fit flex flex-col justify-center items-center px-4">
					<h1 className="text-5xl uppercase font-mono my-10">
						Our <br />
						<span className=" italic text-yellow-400 font-semibold">
							Departments
						</span>
					</h1>
					<div className="cardscont max-w-[730px] w-4/5 font-mono">
						<Card className="">
							<h2>Technical</h2>
							<p>
								Empower the club with technology, build solutions, automate
								tasks, ensure cybersecurity and develop applications.
							</p>
						</Card>
						<Card className="">
							<h2>Management</h2>
							<p>
								Streamline club activities, manage paperwork, secure event
								resources, and ensure flawless event planning and execution.
							</p>
						</Card>
						<Card className="">
							<h2>Media</h2>
							<p>
								Design compelling branding for our events and club, managing
								social media handles and creating an impactful visual identity.
							</p>
						</Card>
						<Card className="">
							<h2>Marketing and Sponsorhips</h2>
							<p>
								Attract industry sponsors and captivate public interest, drive
								event visibilty and bolster the brand image.
							</p>
						</Card>
						<Card className="">
							<h2>Content</h2>
							<p>
								Craft compelling written content that embodies our club's image.
							</p>
						</Card>
					</div>
				</section>
				<section>
					<div className="flex flex-col justify-center items-center h-full">
						<div className="bg-[#0000008e] rounded-md p-4 w-80">
							<h1 className="text-5xl uppercase font-mono">
								Is <span className=" italic text-yellow-400 font-semibold">LUG</span> only for Linux users?
							</h1>
							<p>
							Though Linux is in the name, LUG represents more than just Linux. It embodies:
							<ul className="list-disc">
								<li>The principles of free and open-source software</li>
								<li>Comprehensive tech education</li>
								<li>The freedom to reinvent the wheel (sometimes with good reason, sometimes not 😅)</li>
							</ul>
							</p>
						</div>
					</div>
				</section>
				<section className=" min-h-screen h-fit flex flex-col justify-center items-center px-4">
					<h1 className="text-5xl uppercase font-mono my-10">
						<span className=" italic text-yellow-400 font-semibold">
							FAQ
						</span>
					</h1>
					<div className="cardscont max-w-[350px] w-4/5 font-mono" style={{gridTemplateColumns: "1fr"}}>
						<Card className="">
							<h2>Full form of LUG?</h2>
							<p>
								Linux Users Group
							</p>
						</Card>
						<Card className="">
							<h2>Can I join if I'm not from VIT Chennai?</h2>
							<p>
								Unfortunately we cannot accept members outside of VIT Chennai.
								You can still participate in our events and workshops though 😄
							</p>
						</Card>
						<Card className="">
							<h2>What if I'm not a Linux user?</h2>
							<p>
								No issues! As long as you're keen to learn, grow,
								and contribute, it doesn't matter what operating system you use.
							</p>
						</Card>
						<Card className="">
							<h2>Want to know more?</h2>
							<p>
								You can read more about Linux Users Group <a href="https://cloud.lugvitc.net/s/74pTQ4XrWSqr4in" className="underline text-yellow-400">here</a>.
							</p>
						</Card>
					</div>
				</section>
				<section>
					<div className="flex flex-col justify-center items-center h-full">
						<div className="bg-[#0000008e] rounded-md p-4 flex flex-col">
							<h1 className="text-5xl uppercase font-mono">
								What are <br />
								you waiting <br />
								for? <br />
								<span className="italic text-yellow-400 font-semibold">
									Join us now.
								</span>
							</h1>
							<Link
								to="/apply"
								className={
									"rounded-md mt-4 text-xl text-center p-2 text-black font-semibold transition-all border" +
									(!rec_open
										? " bg-yellow-700 border-yellow-700 pointer-events-none"
										: " bg-yellow-400 hover:bg-black hover:text-white border-yellow-400")
								}
							>
								Apply
							</Link>
						</div>
					</div>
					<footer className=" h-14 w-full bg-neutral-950 absolute bottom-0 flex justify-center items-center font-mono text-yellow-400">
						Copyright 2024, LUGVITC. Made with &lt;3
					</footer>
				</section>
			</section>
		</>
	);
}

