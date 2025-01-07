import { NavLink } from "react-router";
import Navbar from "../components/ui/Navbar";
import Button from "../components/ui/Button";



const Home = () => {

    const features = [
        {
          title: "Centralized Storage",
          description:
            "Save content from various sources like Twitter, YouTube, and Google Docs in one place.",
          icon: "📦",
        },
        {
          title: "AI-Powered Search",
          description:
            "Find anything you’ve saved with lightning-fast, AI-enhanced search capabilities.",
          icon: "🔍",
        },
        {
          title: "Future-Ready Insights",
          description:
            "Leverage embeddings and smart tools to turn your data into actionable insights.",
          icon: "🚀",
        },
      ];

  return (
    <div className="bg-secondary min-w-screen min-h-screen pt-5 ">
        <Navbar />
        <div className="w-full flex flex-col md:flex-row justify-center  items-center  h-full ">
          <img
            className="w-[70%] md:w-[30rem] lg:w-[40rem] lg:ml-[8rem]"
            src={
              "https://cdn.discordapp.com/attachments/1225854231169466539/1325892801967165440/69e82821-1b95-4818-ab11-90234836b1de.png?ex=677d7165&is=677c1fe5&hm=6e4dd8e9653d57bb71a11e0c182bed9b1e3788e0b6da5c6c7c061e9a7fd821e2&"
            }
            alt="Hero Image"
          />
          <div className="flex flex-col p-6 text-center items-center">
            <h1 className="text-primary text-xl font-extrabold md:font-bold md:text-3xl">
              Your Second Brain, Simplified
            </h1>
            <p className="text-md md:text-lg md:py-3 sm:py-2 max-sm:pb-3 text-center text-black lg:pr-8">
              Effortlessly save and organize content from Twitter, YouTube,
              Google Docs, and more—all in one centralized place. Turn your
              information into actionable insights. Future-ready with powerful
              search and AI-driven embeddings to explore your knowledge like
              never before.
            </p>
            <NavLink to={"/dashboard"}>
              <Button variant="primary" size="md" text="Try Now" />
            </NavLink>
          </div>
        </div>

        <div className=" py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">
              Why Choose Second Brain?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-primary bg-opacity-60 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4 text-blue-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className=" text-white py-6">
          {/* Copyright */}
          <div className="text-center mt-6 text-sm text-primary">
            © {new Date().getFullYear()} Brainly. All rights reserved.
          </div>

        </footer>
      </div>
  )
}

export default Home

