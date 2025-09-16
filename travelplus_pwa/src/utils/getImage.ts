import Background from '@/assets/images/Background.png';
import CheckCircle from '@/assets/images/material-symbols-light_mobile-friendly-sharp.png';
import Car from '@/assets/images/mdi_car-select.png';
import Download from '@/assets/images/ri_mobile-download-line.png';
import Logo from '@/assets/images/Logo.png';
import Group from '@/assets/images/Group.png';
import Frame from '@/assets/images/Frame.png';
import Map from '@/assets/images/et_map.png';
import Location from '@/assets/images/gis_location-man.png';
import Package from '@/assets/images/ph_package-thin.png';
import Phone from '@/assets/images/iconamoon_phone-thin.png';
import Message from '@/assets/images/material-symbols-light_mail-outline.png';
import Pin from '@/assets/images/et_map_gray.png';

const images: Record<string, any> = {
  background: Background,
  checkCircle: CheckCircle,
  car: Car,
  download: Download,
  logo: Logo,
  group: Group,
  frame: Frame,
  map: Map,
  location: Location,
  package: Package,
  phone: Phone,
  message: Message,
  pin: Pin,
};

export function getImage(name: keyof typeof images) {
  const img = images[name];
  if (!img) {
    console.warn(`Image "${name}" not found.`);
  }
  return img ?? images.background;
}
