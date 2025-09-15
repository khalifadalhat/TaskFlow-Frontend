import { Download } from 'lucide-react';
import Image from 'next/image';
import Frame from '../../public/images/Frame.png';

export default function AppDownload() {
  return (
    <section
      className="px-4 py-8 mx-auto text-white bg-center bg-cover rounded-xl max-w-7xl sm:px-6 lg:px-8 lg:py-20"
      style={{ backgroundImage: `url(${Frame.src})` }}></section>
  );
}
