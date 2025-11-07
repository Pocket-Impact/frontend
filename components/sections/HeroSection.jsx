import SecondaryButton from '@/components/ui/SecondaryButton'
import img from '@/lib/images';

const HeroSection = () => {
    return (
      <div className="h-screen max-lg:h-max max-md:pt-16 max-lg:pt-32 mt-[65px] relative bg-cblack overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,transparent_40%,#386641_100%)]"></div>
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-4">
          <div className="max-w-3xl fade-down text-center">
            <h1 className="x5l font-bold flex text-white bricolage flex-col gap-5 mb-7">
              <span> AI-Powered Tools to</span>
              <span>
                Supercharge Your Social{" "}
                <span className="text-secondary underline decoration-wavy">
                  Impact
                </span>
              </span>
            </h1>
            <p className="base inter mb-12 max-md:mb-8 text-white/80">
              Automate operations, engage donors, and measure impact — all from
              your pocket.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SecondaryButton
                text="Start Free Trial"
                styles="rounded-xl effect font-semibold py-4 max-md:py-2 px-8 max-md:px-4"
              />
              <button className="rounded-xl bg-white/10 text-white cursor-pointer hover:bg-white/15 shadow-2xl transition duration-300 inter font-semibold py-4 max-md:py-2 px-8 max-md:px-4">
                See How It Works
              </button>
            </div>
          </div>
          <div className="w-full max-w-7xl fade-up mt-8 px-3 pt-3 border-x border-t bg-white/20 backdrop-blur-2xl border-white h-64 rounded-t-3xl">
            <div
              className="w-full h-full rounded-t-2xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${img.bg2.src})` }}
            ></div>
          </div>
        </div>
      </div>
    );
}

export default HeroSection

import PropTypes from 'prop-types';
HeroSection.propTypes = {};