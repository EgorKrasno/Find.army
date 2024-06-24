import { BsFillBriefcaseFill } from 'react-icons/bs';
import {
  FaBook,
  FaChartBar,
  FaFilePdf,
  FaGraduationCap,
  FaHammer,
  FaPlaneDeparture,
  FaRegMoneyBillAlt,
} from 'react-icons/fa';
import { GiClothes, GiComputing, GiHealthNormal } from 'react-icons/gi';
import { GrCertificate } from 'react-icons/gr';
import { HiIdentification, HiOutlinePaperClip } from 'react-icons/hi';
import { IoFitness } from 'react-icons/io5';
import { MdFamilyRestroom } from 'react-icons/md';
import { RiComputerLine, RiCustomerService2Fill } from 'react-icons/ri';
import { SiMicrosoftoutlook, SiMicrosoftteams } from 'react-icons/si';

export enum CardType {
  LINK = 'link',
  FORM = 'form',
}

export type LinkCardData = {
  id: string;
  title: string;
  icon: JSX.Element;
  href: string;
  description: string;
  type: CardType;
  tags: string[];
} & (
  | {
      cac: true;
      avd: true;
    }
  | {
      cac: boolean;
      avd: false;
    }
);

export const cards: LinkCardData[] = [
  {
    id: '1',
    title: 'Email 365',
    icon: (
      <SiMicrosoftoutlook
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: true,
    href: 'https://webmail.apps.mil/mail',
    description: '',
    type: CardType.LINK,
    tags: ['microsoft', 'outlook'],
  },
  {
    id: '2',
    title: 'Teams 365',
    icon: (
      <SiMicrosoftteams
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: true,
    href: 'https://dod.teams.microsoft.us',
    description: '',
    type: CardType.LINK,
    tags: ['microsoft'],
  },
  {
    id: '3',
    title: 'MyPay',
    icon: (
      <FaRegMoneyBillAlt
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://mypay.dfas.mil/#/',
    description: '',
    type: CardType.LINK,
    tags: ['pay', 'les', 'money', 'leave'],
  },
  {
    id: '4',
    title: 'iPERMS',
    icon: (
      <HiOutlinePaperClip
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://iperms.hrc.army.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['records', 'documents', 'pdf', 'paperwork'],
  },
  {
    id: '5',
    title: 'Cyber Awareness Challenge',
    icon: (
      <GiComputing className="text-sky-700 dark:text-yellow-300" size={112} />
    ),
    cac: true,
    avd: false,
    href: 'https://cs.signal.army.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['cyber', 'security', 'training', 'certificate'],
  },
  {
    id: '6',
    title: 'MedPros',
    icon: (
      <GiHealthNormal
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://medpros.mods.army.mil/portal',
    description: '',
    type: CardType.LINK,
    tags: [
      'medical',
      'PHA',
      'Dental',
      'Vision',
      'Hearing',
      'Immunization',
      'Profile',
      'DA-3349',
      'IMR',
      'DA-7655',
    ],
  },
  {
    id: '7',
    title: 'My Clothing Record',
    icon: (
      <GiClothes className="text-sky-700 dark:text-yellow-300" size={112} />
    ),
    cac: true,
    avd: false,
    href: 'https://ism.army.mil/ism/SelfServiceServlet?nav.nav_id=ssMyClothing',
    description: '',
    type: CardType.LINK,
    tags: ['equipment'],
  },
  {
    id: '8',
    title: 'RFO',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://aim.hrc.army.mil/',
    description: 'Request for Orders',
    type: CardType.LINK,
    tags: ['PCS', 'HRC'],
  },
  {
    id: '9',
    title: 'milConnect',
    icon: (
      <HiOutlinePaperClip
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://milconnect.dmdc.osd.mil/milconnect/',
    description: '',
    type: CardType.LINK,
    tags: [
      'DEERS',
      'SGLI',
      'SGOE',
      'Life Insurance',
      'education',
      'beneficiary',
    ],
  },
  {
    id: '10',
    title: 'milSuite',
    icon: (
      <HiOutlinePaperClip
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://login.milsuite.mil/',
    description: '',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '11',
    title: 'TRICARE',
    icon: (
      <GiHealthNormal
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://tricare.mil/',
    description: '',
    type: CardType.LINK,
    tags: [
      'medical',
      'health',
      'dental',
      'vision',
      'insurance',
      'doctor',
      'profile',
    ],
  },
  {
    id: '12',
    title: 'TSP',
    icon: (
      <FaRegMoneyBillAlt
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: false,
    avd: false,
    href: 'https://www.tsp.gov/',
    description: 'Thrift Savings Plan',
    type: CardType.LINK,
    tags: ['401k', 'invest', 'pay', 'money', 'stocks', 'bank'],
  },
  {
    id: '13',
    title: 'ERB',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://myerb.ahrs.army.mil/soldierLogin.do',
    description: 'Soldier Record Brief (Enlisted)',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '14',
    title: 'ORB',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://myorb.hrc.army.mil/',
    description: 'Officer Record Brief',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '15',
    title: 'Army Reserve Record Brief',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://selfservice.rcms.usar.army.mil/',
    description: '',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '16',
    title: 'National Guard Record Brief',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://arngg1.ngb.army.mil/Portal/RibbonMenu.aspx?ProviderName=RecordBriefProvider',
    description: '',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '17',
    title: 'Army Career Tracker (ACT)',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://actnow.army.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['sponsorship', 'career', 'job'],
  },
  {
    id: '18',
    title: 'AIM 2.0',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://aim.hrc.army.mil/',
    description:
      'Active Duty Officer Assignment Interactive Module Version 2.0',
    type: CardType.LINK,
    tags: ['ymav'],
  },
  {
    id: '19',
    title: 'IPPS-A',
    icon: (
      <HiIdentification
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://hr.ippsa.army.mil/',
    description: 'Integrated Personnel and Payment System',
    type: CardType.LINK,
    tags: ['orb', 'erb', 'stp', 'refrad', 'record brief', 'leave', 'da31'],
  },
  {
    id: '20',
    title: 'MWR',
    icon: (
      <MdFamilyRestroom
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.armymwr.com/#',
    description: 'Morale, Welfare and Recreation',
    type: CardType.LINK,
    tags: ['family', 'sfrg'],
  },
  {
    id: '21',
    title: 'Military OneSource',
    icon: (
      <MdFamilyRestroom
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.militaryonesource.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['family', 'sfrg'],
  },
  {
    id: '22',
    title: 'VMIS',
    icon: (
      <MdFamilyRestroom
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: false,
    avd: false,
    href: 'https://vmis.armyfamilywebportal.com/',
    description: 'Volunteer Management Information System',
    type: CardType.LINK,
    tags: ['family', 'sfrg'],
  },
  {
    id: '23',
    title: 'DTMS',
    icon: (
      <FaChartBar className="text-sky-700 dark:text-yellow-300" size={112} />
    ),
    cac: true,
    avd: false,
    href: 'https://dtms.army.mil/',
    description: 'Digital Training Management System',
    type: CardType.LINK,
    tags: ['qualifications', 'weapon'],
  },
  {
    id: '24',
    title: 'CHESS',
    icon: (
      <RiComputerLine
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://chess.army.mil/',
    description: 'Computer Hardware Enterprise Software and Solutions',
    type: CardType.LINK,
    tags: ['computer', 'hardware', 'software'],
  },
  {
    id: '25',
    title: 'Army Maintenance Application (ARMA)',
    icon: <FaHammer className="text-sky-700 dark:text-yellow-300" size={112} />,
    cac: true,
    avd: false,
    href: 'https://www.armymaintenance.com/arma',
    description: '',
    type: CardType.LINK,
    tags: ['maintenance', 'vehicle', 'repair'],
  },
  {
    id: '26',
    title: 'Army Fit',
    icon: (
      <IoFitness className="text-sky-700 dark:text-yellow-300" size={112} />
    ),
    cac: true,
    avd: false,
    href: 'https://armyfit.army.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['Health', 'Fitness', 'PT'],
  },
  {
    id: '27',
    title: 'HRC',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.hrc.army.mil/',
    description: 'Human Resources Command',
    type: CardType.LINK,
    tags: ['records', 'documents', 'pdf', 'paperwork'],
  },
  {
    id: '28',
    title: 'ICAM Portal',
    icon: (
      <HiIdentification
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://icamportal.us.army.mil/',
    description: 'Identity, Credentialing and Access Management',
    type: CardType.LINK,
    tags: ['CAC', 'PIV', 'certificate'],
  },
  {
    id: '29',
    title: 'AESD',
    icon: (
      <RiCustomerService2Fill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://snpro.aesd-w.army.mil/',
    description: 'Army Enterprise Service Desk',
    type: CardType.LINK,
    tags: ['help', 'support', 'ticket'],
  },
  {
    id: '30',
    title: 'NCOER',
    icon: (
      <BsFillBriefcaseFill
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://evaluations.hrc.army.mil/',
    description: 'HRC Evaluation Entry System',
    type: CardType.LINK,
    tags: ['evaluation', 'NCO', 'OER'],
  },
  {
    id: '31',
    title: 'TAP Online',
    icon: (
      <FaGraduationCap
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: false,
    avd: false,
    href: 'https://www.sfl-tap.army.mil/',
    description: 'Transition Assistance Program',
    type: CardType.LINK,
    tags: ['SFL-TAP'],
  },
  {
    id: '32',
    title: 'DOD SkillBridge',
    icon: (
      <FaGraduationCap
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: false,
    avd: false,
    href: 'https://skillbridge.osd.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['Education', 'Training'],
  },
  {
    id: '33',
    title: 'eLearning',
    icon: (
      <FaGraduationCap
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.dls.army.mil/Army_e-Learning.html',
    description: '',
    type: CardType.LINK,
    tags: ['Training', 'Certificate', 'Courses', 'Education', 'School'],
  },
  {
    id: '34',
    title: 'JKO',
    icon: (
      <GrCertificate
        className="dark:svg-yellow-force svg-sky-force"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://jko.jten.mil/',
    description: 'Joint Knowledge Online',
    type: CardType.LINK,
    tags: ['Training', 'Certificate', 'Courses'],
  },
  {
    id: '35',
    title: 'ATRRS',
    icon: (
      <GrCertificate
        className="dark:svg-yellow-force svg-sky-force"
        size={112}
      />
    ),
    cac: true,
    avd: true,
    href: 'https://atrrs.army.mil/',
    description: 'Army Training Requirements and Resource System',
    type: CardType.LINK,
    tags: ['Training', 'Certificate', 'Courses'],
  },
  {
    id: '36',
    title: 'ALMS',
    icon: (
      <GrCertificate
        className="dark:svg-yellow-force svg-sky-force"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.lms.army.mil/',
    description: 'Army Learning Management System',
    type: CardType.LINK,
    tags: ['OPSEC', 'Training', 'Certificate', 'Courses'],
  },
  {
    id: '37',
    title: 'DTS',
    icon: (
      <FaPlaneDeparture
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.defensetravel.osd.mil/',
    description: 'Defense Travel System',
    type: CardType.LINK,
    tags: [
      'GTC',
      'Receipt',
      'PCS',
      'TDY',
      'Voucher',
      'Hotel',
      'Moving',
      'Transportation',
      'Move',
    ],
  },
  {
    id: '38',
    title: 'Move.mil',
    icon: (
      <FaPlaneDeparture
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://move.mil/',
    description: 'Defense Travel System',
    type: CardType.LINK,
    tags: [
      'Receipt',
      'PCS',
      'TDY',
      'Voucher',
      'Hotel',
      'Moving',
      'Transportation',
      'Move',
    ],
  },
  {
    id: '39',
    title: 'TRiPS',
    icon: (
      <FaPlaneDeparture
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://trips.safety.army.mil/',
    description: 'Travel Risk Planning System',
    type: CardType.LINK,
    tags: ['PCS', 'Move', 'Travel', 'TDY'],
  },
  {
    id: '40',
    title: 'APD (DA Forms)',
    icon: <FaBook className="text-sky-700 dark:text-yellow-300" size={112} />,
    cac: true,
    avd: true,
    href: 'https://armypubs.army.mil/',
    description: 'Army Publication Directorate',
    type: CardType.LINK,
    tags: ['pdf', 'education'],
  },
  {
    id: '41',
    title: 'CAC Reference Center',
    icon: (
      <HiIdentification
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: false,
    avd: false,
    href: 'http://www.cac.mil/',
    description: '',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '42',
    title: 'Army Training Network',
    icon: <FaBook className="text-sky-700 dark:text-yellow-300" size={112} />,
    cac: false,
    avd: false,
    href: 'https://atn.army.mil/',
    description: '',
    type: CardType.LINK,
    tags: ['ATN', 'education'],
  },
  {
    id: '43',
    title: 'ATN Digital Job Book',
    icon: (
      <FaChartBar className="text-sky-700 dark:text-yellow-300" size={112} />
    ),
    cac: false,
    avd: false,
    href: 'https://atn.army.mil/mytraining/',
    description: 'DTMS, Height/Weight, APFT, ACFT, and weapon records',
    type: CardType.LINK,
    tags: [],
  },
  {
    id: '44',
    title: 'ASK',
    icon: <FaBook className="text-sky-700 dark:text-yellow-300" size={112} />,
    cac: true,
    avd: false,
    href: 'https://www.ask.army.mil/ASK/',
    description: 'Assignment Satisfaction Key (ASK)',
    type: CardType.LINK,
    tags: ['ymav', 'assignment'],
  },
  {
    id: '45',
    title: 'ArmyIgniteED',
    icon: (
      <FaGraduationCap
        className="text-sky-700 dark:text-yellow-300"
        size={112}
      />
    ),
    cac: true,
    avd: false,
    href: 'https://www.armyignited.army.mil/',
    type: CardType.LINK,
    description: '',
    tags: [
      'education',
      'school',
      'college',
      'degree',
      'GI Bill',
      'Tuition Assistance',
      'TA',
    ],
  },
  {
    id: '201',
    title: 'Counseling Form',
    icon: <FaFilePdf className="text-rose-700 dark:text-blue-400" size={96} />,
    cac: true,
    avd: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN39139-DA_FORM_4856-001-EFILE-2.pdf',
    description: 'Developmental Counseling Form (DA-4856)',
    type: CardType.FORM,
    tags: ['pdf'],
  },
  {
    id: '202',
    title: 'Personnel Action Form',
    icon: <FaFilePdf className="text-rose-700 dark:text-blue-400" size={96} />,
    cac: true,
    avd: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN37028-DA_FORM_4187-000-EFILE-1.pdf',
    description: 'Personnel Action Form (DA-4187)',
    type: CardType.FORM,
    tags: ['pdf'],
  },
  {
    id: '203',
    title: 'Hand Receipt',
    icon: <FaFilePdf className="text-rose-700 dark:text-blue-400" size={96} />,
    cac: true,
    avd: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN39613-DA_FORM_2062-000-EFILE-1.pdf',
    description: 'Hand Receipt (DA-2062)',
    type: CardType.FORM,
    tags: ['pdf'],
  },
  {
    id: '204',
    title: 'Recommendation for Award Form',
    icon: <FaFilePdf className="text-rose-700 dark:text-blue-400" size={96} />,
    cac: true,
    avd: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN32485-DA_FORM_638-003-EFILE-4.pdf',
    description: 'Recommendation for Award (DA-638)',
    type: CardType.FORM,
    tags: ['pdf'],
  },
];
