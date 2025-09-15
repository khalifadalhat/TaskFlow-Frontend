import Background from '../../public/images/Background.png';
import CheckCircle from '../../public/images/material-symbols-light_mobile-friendly-sharp.png';
import Car from '../../public/images/mdi_car-select.png';
import Download from '../../public/images/ri_mobile-download-line.png';
import Image from 'next/image';

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-medium text-green-600">How It Works</h2>
          <h3 className="mb-4 text-4xl font-bold text-gray-400">Our Online Along Services</h3>
          <p className="max-w-2xl mx-auto text-gray-600">
            Enjoy A Comfortable And Safe Trip With Our Services
          </p>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-80 h-96 rounded-3xl">
              <Image src={Background} className="w-full h-full rounded-2xl" alt="background" />
            </div>
          </div>
          <div className="w-full mt-12 space-y-8 border-l">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 rounded-full w-[100px] h-[100px]">
                <Image src={Download} alt="download" />
              </div>
              <div>
                <h4 className="mb-2 text-base font-semibold text-gray-900">
                  Download The App From Google Play And App Store
                </h4>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 rounded-full w-[100px] h-[100px]">
                <Image src={Car} alt="Car" />
              </div>
              <div>
                <h4 className="mb-2 text-base font-semibold text-gray-900">
                  Choose The Route In Which You Are Travelling To
                </h4>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="p-3 rounded-full w-[100px] h-[100px]">
                <Image src={CheckCircle} alt="CheckCircle" />
              </div>
              <div>
                <h4 className="mb-2 text-base font-semibold text-gray-900">
                  book your ride and start your your journey ...
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
