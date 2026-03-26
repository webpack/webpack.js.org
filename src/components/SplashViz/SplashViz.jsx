// Import External Dependencies
import { Component } from "react";

// Load Images

// Import Components
import Cube from "../Cube/Cube.jsx";
import TextRotater from "../TextRotater/TextRotater.jsx";
import HomeSVG from "./SplashVizSVG.mjs";

// Load Styling
// Tailwind CSS is now used for styling. Custom SCSS removed.

export default class SplashViz extends Component {
  render() {
    return (
      <section className="relative overflow-hidden px-4 pb-16 pt-0 bg-[#2b3a42] dark:bg-gray-900 h-[clamp(33rem,calc(100vh-80px),43rem)] md:h-[clamp(29rem,calc(100vh-80px),33rem)] sm:min-h-[clamp(37rem,calc(100vh-80px),45rem)]">
        {/* TOP TEXT */}
        <h1 className="text-white text-center font-normal font-[Source_Sans_Pro] text-[30px] md:text-[40px] pt-[100px] md:pt-[110px] mb-8 md:mb-10 leading-[36px] md:leading-[48px]">
          <span> bundle your </span>
          <span className="inline-block w-[120px] text-left">
            <TextRotater delay={2000}>
              <span>assets</span>
              <span>scripts</span>
              <span>images</span>
              <span>styles</span>
            </TextRotater>
          </span>
        </h1>

        {/* CENTER GRAPHIC */}
        <div className="absolute top-[60%] left-1/2 w-[60vw] min-w-[550px] max-w-[768px] -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <div dangerouslySetInnerHTML={{ __html: HomeSVG.body }} />

          <Cube
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            depth={120}
            repeatDelay={5000}
            continuous
          />
        </div>
      </section>
    );
  }
}
