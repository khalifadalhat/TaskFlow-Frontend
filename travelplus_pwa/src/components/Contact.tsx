import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-lg font-medium text-green-600">How Can We Help You</h2>
          <h3 className="mb-4 text-4xl font-bold text-gray-400">Have A Question?</h3>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-lg">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-1 text-gray-600">
                <p>No28, Ali Akilu Road, Opp</p>
                <p>Kaduna Investment House</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-lg">
                <Phone className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">Call Us</p>
                <p>08025734353</p>
                <p>08036400647</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full shadow-lg">
                <Mail className="w-8 h-8 text-gray-400" />
              </div>
              <div className="space-y-1 text-gray-600">
                <p className="font-medium">Mail Us @</p>
                <p>Travelplus@Gmail.Com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
