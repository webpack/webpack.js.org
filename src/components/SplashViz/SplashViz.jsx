// Import External Dependencies
import { Component } from "react";

// Load Images

// Import Components
import Cube from "../Cube/Cube.jsx";
import TextRotator from "../TextRotater/TextRotater.jsx";
import HomeSVG from "./SplashVizSVG.mjs";

// Load Styling
// Tailwind CSS is now used for styling. Custom SCSS removed.

export default class SplashViz extends Component {
  render() {
    return (
      <section className="relative grid grid-rows-[auto_1fr] overflow-hidden pt-32 pb-16 px-4 min-h-[40rem] h-[clamp(35rem,100vh-80px,45rem)] bg-[#2b3a42] dark:bg-gray-900 md:h-[clamp(30rem,100vh-80px,35rem)] sm:min-h-[clamp(40rem,100vh-80px,50rem)]">
        <h1
          className="text-white text-center font-light text-4xl md:text-5xl"
          style={{ gridRow: "1/2" }}
        >
          <span> bundle your</span>
          <TextRotator delay={5000} repeatDelay={5000} maxWidth={110}>
            <span> assets </span>
            <span> scripts </span>
            <span> images </span>
            <span> styles </span>
          </TextRotator>
        </h1>

        <div
          className="absolute top-1/2 left-1/2 w-[60vw] min-w-[550px] max-w-[768px] -translate-x-1/2 -translate-y-1/2 hidden md:block"
          style={{ gridRow: "2/3" }}
          dangerouslySetInnerHTML={{ __html: HomeSVG.body }}
        ></div>

        <Cube
          className="absolute left-0 right-0 top-0 bottom-0 m-auto z-10"
          depth={120}
          repeatDelay={5000}
          continuous
        />
      </section>
    );
  }
}
