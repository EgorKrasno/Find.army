import {AiOutlineMail} from "react-icons/ai";
import {MdAttachMoney} from "react-icons/md";
import {GiClothes, GiComputing, GiHealthNormal} from "react-icons/gi";
import {BsFillBriefcaseFill} from "react-icons/bs";

const iconProps = {
  className: 'dark:text-yellow-300 text-blue-400',
  size: 128,
};

export const exploreData = [
  {
    id: '1',
    title: 'Army Email',
    icon: <AiOutlineMail {...iconProps} />,
    cac: true,
    href: 'https://webmail.apps.mil/mail',
    description: 'Test 5 description',
  },
  {
    id: '2',
    title: 'MyPay',
    icon: <MdAttachMoney {...iconProps} />,
    cac: false,
    href: 'https://mypay.dfas.mil/#/',
    description: 'Test 6 description',
    tags: ['pay', 'les', 'money'],
  },
  {
    id: '3',
    title: 'MedPros',
    icon: <GiHealthNormal {...iconProps} />,
    cac: true,
    href: 'https://medpros.mods.army.mil/portal',
    description: 'Test 6 description',
    tags: ['medical'],
  },
  {
    id: '4',
    title: 'My Clothing Record',
    icon: <GiClothes {...iconProps} />,
    cac: true,
    href: 'https://ism.army.mil/ism/SelfServiceServlet?nav.nav_id=ssMyClothing',
    description: 'Test 6 description',
    tags: ['clothing'],
  },
  {
    id: '5',
    title: 'TRICARE',
    icon: <GiHealthNormal {...iconProps} />,
    cac: false,
    href: 'https://tricare.mil/',
    description: 'Test 6 description',
    tags: ['medical', 'health', 'dental', 'vision', 'insurance'],
  },
  {
    id: '6',
    title: 'Army Career Tracker (ACT)',
    icon: <BsFillBriefcaseFill {...iconProps} />,
    cac: true,
    href: 'https://actnow.army.mil/',
    description: 'Test 6 description',
    tags: ['sponsorship', 'career'],
  },
  {
    id: '7',
    title: 'AIM 2.0',
    icon: <BsFillBriefcaseFill {...iconProps} />,
    cac: true,
    href: 'https://aim.hrc.army.mil/',
    description: 'Test 6 description',
    tags: ['officer', 'orb'],
  },
  {
    id: '8',
    title: 'Cyber Awareness Challenge',
    icon: <GiComputing {...iconProps} />,
    cac: true,
    href: 'https://cs.signal.army.mil/',
    description: 'Test 6 description',
  },
];