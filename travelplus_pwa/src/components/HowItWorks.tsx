import { getImage } from '@/utils/getImage';
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
            <div className="flex items-center justify-center w-full h-full rounded-3xl">
              <Image
                src={getImage('background')}
                className="object-cover object-center w-full h-full"
                alt="background"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center w-full h-full pl-6 space-y-8 border-l">
            {[
              {
                src: 'download',
                alt: 'download',
                text: 'Download The App From Google Play And App Store',
              },
              {
                src: 'car',
                alt: 'Car',
                text: 'Choose The Route In Which You Are Travelling To',
              },
              {
                src: 'checkCircle',
                alt: 'CheckCircle',
                text: 'Book your ride and start your journey ...',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={getImage(item.src)}
                    alt={item.alt}
                    fill
                    className="object-cover object-center"
                  />
                </div>

                <h4 className="text-base font-semibold text-gray-900">{item.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
