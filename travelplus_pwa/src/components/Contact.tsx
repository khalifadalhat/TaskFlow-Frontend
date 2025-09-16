import { getImage } from '@/utils/getImage';
import { MapPin, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="flex flex-col items-center justify-center px-4 mx-auto space-y-12 max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-lg font-medium text-green-600">How Can We Help You</h2>
          <h3 className="mb-4 text-4xl font-bold text-gray-400">Have A Question?</h3>
        </div>
        <div className="grid w-full max-w-3xl grid-cols-1 gap-6 p-4 mx-auto sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              icon: 'pin',
              text: ['No28, Ali Akilu Road, Opp', 'Kaduna Investment House'],
            },
            {
              icon: 'phone',
              text: ['Call Us', '08025734353', '08036400647'],
            },
            {
              icon: 'message',
              text: ['Mail Us @', 'Travelplus@Gmail.Com'],
            },
          ].map((item, idx) => (
            <div key={idx} className="flex justify-center text-center">
              <div className="w-[193px] h-[212px] p-4 shadow-lg bg-gray-50 rounded-2xl overflow-hidden flex flex-col items-center">
                <div className="flex justify-center w-24 h-24 mb-3">
                  <Image
                    src={getImage(item.icon)}
                    alt={item.icon}
                    className="object-contain w-12 h-12"
                  />
                </div>

                <div className="space-y-1 text-center text-gray-600 break-words">
                  {item.text.map((line, i) => (
                    <p key={i} className={i === 0 ? 'font-medium' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
