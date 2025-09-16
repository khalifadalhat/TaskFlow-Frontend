import { getImage } from '@/utils/getImage';
import Image from 'next/image';

export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-lg font-medium text-green-600">What We Offer</h2>
          <h3 className="mb-4 text-4xl font-bold text-gray-400">Our Featured Services</h3>
          <p className="max-w-4xl mx-auto text-gray-600">
            We Created Our Services To Help You To Find The Most Dependable And Highest Quality
            Along Services, Anytime And Anywhere. All Our Drivers Are Tested And Fully Licensed.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="p-6 ">
              <div className="flex items-center justify-center w-[156px] h-[156px] mx-auto mb-4 rounded-full">
                <Image src={getImage('map')} className="object-cover object-center" alt="map" />
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">Inter-State Services</h4>
              <p className="text-gray-600">We Pick And Deliver Packages To Your Door Step</p>
            </div>
          </div>
          <div className="text-center">
            <div className="p-6">
              <div className="flex items-center justify-center w-[156px] h-[156px] mx-auto mb-4 rounded-full">
                <Image
                  src={getImage('package')}
                  className="object-cover object-center"
                  alt="package"
                />
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">Package Delivery</h4>
              <p className="text-gray-600">We Pick And Deliver Packages To Your Door Step</p>
            </div>
          </div>
          <div className="text-center">
            <div className="p-6">
              <div className="flex items-center justify-center w-[156px] h-[156px] mx-auto mb-4 rounded-full">
                <Image
                  src={getImage('location')}
                  className="object-cover object-center"
                  alt="location"
                />
              </div>
              <h4 className="mb-3 text-xl font-semibold text-gray-900">Address Pick Up</h4>
              <p className="text-gray-600">
                We Always Pick Up Our Clients On Time, 24/7 Availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
