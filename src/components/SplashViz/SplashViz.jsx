// Import External Dependencies
import { Component } from "react";

// Load Images

// Import Components
import Cube from "../Cube/Cube.jsx";
import TextRotator from "../TextRotater/TextRotater.jsx";
import HomeSVG from "./SplashVizSVG.mjs";


export default class SplashViz extends Component {
  render() {
    return (
      <section className="splash-viz relative grid grid-rows-[auto_1fr] overflow-hidden p-4 pb-16 bg-[#2b3a42] dark:bg-gray-900! 
        h-[clamp(35rem,calc(100vh-80px),45rem)] 
        max-lg:h-[clamp(30rem,calc(100vh-80px),35rem)] 
        max-[425px]:min-h-[clamp(40rem,calc(100vh-80px),50rem)]">
        
        <h1 className="splash-viz__heading mt-[80px] row-start-1 row-end-2 text-center font-extralight text-white 
          text-[2rem] lg:text-[2.5rem] lg:mt-[90px]">
          <span> bundle your</span>
          <TextRotator delay={5000} repeatDelay={5000} maxWidth={110}>
            <span> assets </span>
            <span> scripts </span>
            <span> images </span>
            <span> styles </span>
          </TextRotator>
        </h1>

        <div
          className="splash-viz__modules absolute top-1/2 left-1/2 w-[60vw] min-w-[550px] max-w-[1200px] m-auto -translate-x-1/2 -translate-y-1/2 hidden lg:block row-start-2 row-end-3"
          dangerouslySetInnerHTML={{ __html: HomeSVG.body }}
        ></div>

        <Cube
          className="splash-viz__cube absolute inset-0 m-auto z-[1] row-start-2 row-end-3"
          depth={120}
          repeatDelay={5000}
          continuous
        />
      </section>
    );
  }
}
