import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import Group from '../../public/images/Group.png';
import Frame from '../../public/images/Frame.png';
import Image from 'next/image';

export default function Hero() {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    setFormData({ from: '', to: '', date: '' });
  };

  return (
    <section>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-2xl font-medium leading-tight text-gray-900 lg:text-3xl">
              Are You A Frequent Traveler
            </p>
            <h1 className="text-4xl font-bold leading-tight text-gray-900 lg:text-6xl">
              Discover Affordable And Comfortable Travel Experience.
            </h1>
          </div>

          <div className="justify-center hidden lg:flex">
            <div className="relative">
              <Image src={Group} alt="group" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:flex lg:items-center">
              <div className="relative lg:w-48">
                <label htmlFor="from" className="sr-only">
                  From
                </label>
                <input
                  id="from"
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleInputChange}
                  placeholder="From"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="relative flex items-center justify-center lg:px-2">
                <ArrowLeftRight className="w-6 h-6 text-gray-400" />
              </div>

              <div className="relative lg:w-48">
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  placeholder="To"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div className="relative flex-grow">
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 lg:w-48">
                Schedule Now
              </button>
            </div>
          </form>
        </div>
        <div
          className="px-4 py-8 mx-auto mt-12 h-[314px] text-white bg-cover bg-center bg-no-repeat rounded-xl max-w-7xl sm:px-6 lg:px-8 lg:py-20"
          style={{ backgroundImage: `url(${Frame.src})` }}></div>
      </div>
    </section>
  );
}
