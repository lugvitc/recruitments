import { Link } from "react-router-dom";
import Background from "../components/background";
import Card from "../components/Card";

import "./index.scss";

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
              <br />
              Team
            </div>
            <Link
              to="/apply"
              className=" rounded-md text-xl mt-4 text-center p-2 bg-yellow-400 text-black uppercase font-semibold hover:bg-black hover:text-white transition-all border border-yellow-400"
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
                Be a <br /> part of the <br />
                <span className=" italic text-yellow-400 font-semibold">
                  Best
                </span>
              </h1>
              <p className=" w-80 font-mono">
                Linux User's Group VITC is a place where people passionate about
                tech come together, to make something greater.
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
            <div className="bg-[#0000008e] rounded-md p-4">
              <h1 className="text-5xl uppercase font-mono">
                Empower <br />
                <span className=" italic text-yellow-400 font-semibold">
                  FOSS
                </span>
              </h1>
              <p className=" w-80 font-mono">
                The Linux club empowers FOSS among the student body by fostering
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
                At the Linux Club, we deeply value each member and their
                contributions, fostering a collaborative environment where every
                voice is heard and every idea matters.
              </p>
            </div>
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
                className=" rounded-md text-xl mt-4 text-center p-2 bg-yellow-400 text-black uppercase font-semibold hover:bg-black hover:text-white transition-all border border-yellow-400"
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

