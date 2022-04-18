import Fuse from 'fuse.js';
import {useEffect, useState} from 'react';
import ExploreSearch from "../components/ExploreSearch";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates,} from '@dnd-kit/sortable';
import Wrapper from "../components/Wrapper";
import LinkBlock, {Item} from "../components/LinkBlock";
import {MdFamilyRestroom} from "react-icons/md";
import {GiClothes, GiComputing, GiHealthNormal} from "react-icons/gi";
import {BsFillBriefcaseFill} from "react-icons/bs";
import {HiIdentification, HiOutlinePaperClip} from "react-icons/hi";
import {
  FaBook,
  FaChartBar,
  FaFilePdf,
  FaGraduationCap,
  FaHammer,
  FaPlaneDeparture,
  FaRegMoneyBillAlt
} from "react-icons/fa";
import {SiMicrosoftoutlook, SiMicrosoftteams} from "react-icons/si";
import FeedbackButton from "../components/FeedbackButton";
import {IoFitness} from "react-icons/io5";
import {RiComputerLine, RiCustomerService2Fill} from "react-icons/ri";
import {GrCertificate} from "react-icons/gr";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import FeedbackModal from "../components/FeedbackModal";

const exploreData = [
  {
    id: '1',
    title: 'Email 365',
    icon: <SiMicrosoftoutlook className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://webmail.apps.mil/mail',
    description: '',
    tags: ['microsoft', 'outlook'],
  },
  {
    id: '2',
    title: 'Teams 365',
    icon: <SiMicrosoftteams className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://dod.teams.microsoft.us',
    description: '',
    tags: ['microsoft'],
  },
  {
    id: '3',
    title: 'MyPay',
    icon: <FaRegMoneyBillAlt className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://mypay.dfas.mil/#/',
    description: '',
    tags: ['pay', 'les', 'money', 'leave'],
  },
  {
    id: '4',
    title: 'IPPS-A',
    icon: <FaRegMoneyBillAlt className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://hr.ippsa.csd.disa.mil/',
    description: 'Integrated Personnel and Payment System',
    tags: ['pay', 'money'],
  },
  {
    id: '5',
    title: 'TSP',
    icon: <FaRegMoneyBillAlt className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://www.tsp.gov/',
    description: 'Thrift Savings Plan',
    tags: ['401k', 'invest', 'pay', 'money', 'stocks'],
  },
  {
    id: '6',
    title: 'MedPros',
    icon: <GiHealthNormal className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://medpros.mods.army.mil/portal',
    description: '',
    tags: ['medical', 'PHA', 'Dental', 'Vision', 'Hearing', 'Immunization', 'Profile', 'DA-3349', 'IMR', 'DA-7655'],
  },
  {
    id: '7',
    title: 'My Clothing Record',
    icon: <GiClothes className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://ism.army.mil/ism/SelfServiceServlet?nav.nav_id=ssMyClothing',
    description: '',
    tags: ['equipment'],
  },
  {
    id: '8',
    title: 'Cyber Awareness Challenge',
    icon: <GiComputing className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://cs.signal.army.mil/',
    description: '',
  },
  {
    id: '9',
    title: 'milConnect',
    icon: <HiOutlinePaperClip className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://milconnect.dmdc.osd.mil/milconnect/',
    description: '',
    tags: ['DEERS', 'SGLI', 'SGOE', 'Life Insurance', 'education', 'beneficiary'],
  },
  {
    id: '10',
    title: 'milSuite',
    icon: <HiOutlinePaperClip className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://login.milsuite.mil/',
    description: '',
  },
  {
    id: '11',
    title: 'iPERMS',
    icon: <HiOutlinePaperClip className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://iperms.hrc.army.mil/',
    description: '',
  },
  {
    id: '12',
    title: 'RFO',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://aim.hrc.army.mil/',
    description: 'Request for Orders',
    tags: ['PCS', 'HRC'],
  },
  {
    id: '13',
    title: 'ERB',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://myerb.ahrs.army.mil/soldierLogin.do',
    description: 'Soldier Record Brief (Enlisted)',
    tags: ['Record', 'Enlisted', 'Brief'],
  },
  {
    id: '14',
    title: 'ORB',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://myorb.hrc.army.mil/',
    description: 'Officer Record Brief',
    tags: ['Record', 'Officer', 'Brief'],
  },
  {
    id: '15',
    title: 'Army Reserve Record Brief',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://selfservice.rcms.usar.army.mil/',
    description: '',
  },
  {
    id: '16',
    title: 'National Guard Record Brief',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://arngg1.ngb.army.mil/Portal/RibbonMenu.aspx?ProviderName=RecordBriefProvider',
    description: '',
  },
  {
    id: '17',
    title: 'Army Career Tracker (ACT)',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://actnow.army.mil/',
    description: '',
    tags: ['sponsorship', 'career'],
  },
  {
    id: '18',
    title: 'AIM 2.0',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://aim.hrc.army.mil/',
    description: '',
    tags: ['officer', 'orb'],
  },
  {
    id: '19',
    title: 'TRICARE',
    icon: <GiHealthNormal className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://tricare.mil/',
    description: '',
    tags: ['medical', 'health', 'dental', 'vision', 'insurance'],
  },
  {
    id: '20',
    title: 'MWR',
    icon: <MdFamilyRestroom className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://www.armymwr.com/#',
    description: 'Morale, Welfare and Recreation',
    tags: ['family', 'sfrg']
  },
  {
    id: '21',
    title: 'Military OneSource',
    icon: <MdFamilyRestroom className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://www.militaryonesource.mil/',
    description: '',
    tags: ['family', 'sfrg']
  },
  {
    id: '22',
    title: 'VMIS',
    icon: <MdFamilyRestroom className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://vmis.armyfamilywebportal.com/',
    description: 'Volunteer Management Information System',
  },
  {
    id: '23',
    title: 'DTMS',
    icon: <FaChartBar className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://dtms.army.mil/',
    description: '',
    tags: ['qualifications', 'weapon']
  },
  {
    id: '24',
    title: 'CHESS',
    icon: <RiComputerLine className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://chess.army.mil/',
    description: 'Computer Hardware Enterprise Software and Solutions',
  },
  {
    id: '25',
    title: 'Army Maintenance Application (ARMA)',
    icon: <FaHammer className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://www.armymaintenance.com/arma',
    description: '',
  },
  {
    id: '26',
    title: 'Army Fit',
    icon: <IoFitness className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://armyfit.army.mil/',
    description: '',
    tags: ['Health', 'Fitness']
  },
  {
    id: '27',
    title: 'HRC',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://www.hrc.army.mil/',
    description: 'Human Resources Command',
  },
  {
    id: '28',
    title: 'ICAM Portal',
    icon: <HiIdentification className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://icamportal.us.army.mil/',
    description: '',
    tags: ['Identity', 'Credentials', 'Access'],
  },
  {
    id: '29',
    title: 'AESD',
    icon: <RiCustomerService2Fill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://snpro.aesd-w.army.mil/',
    description: 'Army Enterprise Service Desk',
  },
  {
    id: '30',
    title: 'NCOER',
    icon: <BsFillBriefcaseFill className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://evaluations.hrc.army.mil/',
    description: 'HRC Evaluation Entry System',
  },
  {
    id: '31',
    title: 'TAP Online',
    icon: <FaGraduationCap className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://www.sfl-tap.army.mil/',
    description: 'Transition Assistance Program',
    tags: ['SFL-TAP'],
  },
  {
    id: '32',
    title: 'DOD SkillBridge',
    icon: <FaGraduationCap className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://skillbridge.osd.mil/',
    description: '',
    tags: ['Education', 'Training'],
  },
  {
    id: '33',
    title: 'eLearning',
    icon: <FaGraduationCap className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://www.dls.army.mil/Army_e-Learning.html',
    description: '',
    tags: ['Training', 'Certificate', 'Courses'],
  },
  {
    id: '34',
    title: 'JKO',
    icon: <GrCertificate className='dark:svg-yellow-force svg-sky-force' size={112}/>,
    cac: true,
    href: 'https://jko.jten.mil/',
    description: 'Joint Knowledge Online',
    tags: ['Training', 'Certificate', 'Courses'],
  },
  {
    id: '35',
    title: 'ATRRS',
    icon: <GrCertificate className='dark:svg-yellow-force svg-sky-force' size={112}/>,
    nipr: true,
    href: 'https://atrrs.army.mil/',
    description: 'Army Training Requirements and Resource System',
    tags: ['Training', 'Certificate', 'Courses'],
  },
  {
    id: '36',
    title: 'ALMS',
    icon: <GrCertificate className='dark:svg-yellow-force svg-sky-force' size={112}/>,
    cac: true,
    href: 'https://www.lms.army.mil/',
    description: 'Army Learning Management System',
    tags: ['OPSEC', 'Training', 'Certificate', 'Courses'],
  },
  {
    id: '37',
    title: 'DTS',
    icon: <FaPlaneDeparture className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://www.defensetravel.osd.mil/',
    description: 'Defense Travel System',
    tags: ['GTC', 'Receipt', 'PCS', 'TDY', 'Voucher', 'Hotel', 'Moving', 'Transportation', 'Travel', 'Move'],
  },
  {
    id: '38',
    title: 'Move.mil',
    icon: <FaPlaneDeparture className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://move.mil/',
    description: 'Defense Travel System',
    tags: ['PCS', 'TDY', 'Voucher', 'Hotel', 'Moving', 'Transportation', 'Travel'],
  },
  {
    id: '39',
    title: 'TRiPS',
    icon: <FaPlaneDeparture className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: true,
    href: 'https://trips.safety.army.mil/',
    description: 'Travel Risk Planning System',
    tags: ['PCS', 'Move', 'Travel'],
  },
  {
    id: '40',
    title: 'APD (DA Forms)',
    icon: <FaBook className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://armypubs.army.mil/',
    description: 'Army Publication Directorate',
    tags: ['pdf', 'education'],
  },
  {
    id: '41',
    title: 'CAC Reference Center',
    icon: <HiIdentification className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'http://www.cac.mil/',
    description: 'Army Publication Directorate',
    tags: [],
  },
  {
    id: '42',
    title: 'Army Training Network',
    icon: <FaBook className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://atn.army.mil/',
    description: '',
    tags: ['ATN', 'education'],
  },
  {
    id: '43',
    title: 'ATN Digital Job Book',
    icon: <FaChartBar className='dark:text-yellow-300 text-sky-700' size={112}/>,
    cac: false,
    href: 'https://atn.army.mil/mytraining/',
    description: 'View DTMS, Height/Weight, APFT, ACFT, and weapon records',
    tags: [],
  },
  {
    id: '200',
    title: 'Leave Form (DA-31)',
    icon: <FaFilePdf className='dark:text-purple-400 text-rose-700' size={96}/>,
    cac: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN33078-DA_FORM_31-006-EFILE-5.pdf',
    description: 'Request and Authority for Leave (DA-31)',
    tags: ['pdf', 'request', 'authority', 'DA-31'],
  },
  {
    id: '201',
    title: 'Counseling Form',
    icon: <FaFilePdf className='dark:text-purple-400 text-rose-700' size={96}/>,
    cac: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/pdf/A4856.pdf',
    description: 'Developmental Counseling Form (DA-4856)',
    tags: ['pdf', 'DA-4856'],
  },
  {
    id: '202',
    title: 'Personnel Action Form',
    icon: <FaFilePdf className='dark:text-purple-400 text-rose-700' size={96}/>,
    cac: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN31947-DA_FORM_4187-002-EFILE-3.pdf',
    description: 'Personnel Action Form (DA-4187)',
    tags: ['pdf', 'DA-4187'],
  },
  {
    id: '203',
    title: 'Hand Receipt',
    icon: <FaFilePdf className='dark:text-purple-400 text-rose-700' size={96}/>,
    cac: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/pdf/ARN18064_A2062_FINAL.pdf',
    description: 'Hand Receipt (DA-2062)',
    tags: ['pdf', 'DA-2062'],
  },
  {
    id: '204',
    title: 'Recommendation for Award Form',
    icon: <FaFilePdf className='dark:text-purple-400 text-rose-700' size={96}/>,
    cac: false,
    href: 'https://armypubs.army.mil/pub/eforms/DR_a/ARN32485-DA_FORM_638-003-EFILE-4.pdf',
    description: 'Recommendation for Award (DA-638)',
    tags: ['pdf', 'DA-638'],
  },
];

const fuse = new Fuse(exploreData, {
  keys: ['title', 'tags', 'description'],
  threshold: 0.3,
});

const Home = () => {
    const [text, setText] = useState('');
    const [blocks, setBlocks] = useState<Item[]>([]);
    const [activeBlock, setActiveBlock] = useState<any>();
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const openModal = () => setIsFeedbackModalOpen(true);

    const sensors = useSensors(
      useSensor(MouseSensor),
      useSensor(TouchSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    useEffect(() => {
      if (!localStorage.getItem('blocks')) {
        setBlocks(exploreData)
      } else {
        const order = JSON.parse(localStorage.getItem('blocks')!);

        let oldBlocks = [];
        for (const id of order) {
          const block = exploreData.find(item => item.id === id);
          if (block) oldBlocks.push(block);
        }

        // Detect if explore data has new blocks
        let newBlocks: Item[] = [];
        if (order.length !== exploreData.length) {
          for (const block of exploreData) {
            if (!order.includes(block.id)) {
              newBlocks.push(block);
            }
          }
        }
        setBlocks([...oldBlocks, ...newBlocks]);
      }
    }, []);

    const results = fuse.search(text);
    const searchFilteredData = (text.length > 0)
      ? results.map((result) => result.item)
      : blocks;

    const handleDragStart = (event: any) => {
      setActiveBlock(blocks.find(item => item.id === event.active.id)!);
    };

    const handleDragEnd = (event: any) => {
      const {active, over} = event;

      if (active.id !== over.id) {
        setBlocks((items) => {
          const oldIndex = items.indexOf(items.find(item => item.id === active.id)!);
          const newIndex = items.indexOf(items.find(item => item.id === over.id)!);

          const reorderedItems = arrayMove(items, oldIndex, newIndex);
          const order = reorderedItems.map(item => item.id);
          localStorage.setItem('blocks', JSON.stringify(order));
          return reorderedItems;
        });
      }
    }

    return (
      <div
        className="relative flex flex-col dark:background-dark background-light min-h-screen antialiased font-purista transition ease-in-out">
        <div className="absolute pointer-events-none top-0 right-0 w-[1260px] h-[1000px] wide:w-[1700px] wide:h-[1200px]">
          <Image alt='background glow' src='/glow.png' layout='fill'/>
        </div>
        <Nav openModal={openModal}/>
        <div className="mx-6 sm:mx-12 mt-16">
          <ExploreSearch
            text={text}
            setText={setText}
          />
          <div className="grid grid-cols-4 gap-x-10 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-16 mx-auto max-w-7xl">
            {blocks.length > 0 && <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
            >
                <SortableContext
                    items={blocks}
                    strategy={rectSortingStrategy}
                >
                  {searchFilteredData.length > 0 ? searchFilteredData.map((item) => (
                      <Wrapper key={item.id}
                               id={item.id}
                               item={item}
                               text={text}/>
                    )) :
                    <div className="flex flex-col items-center justify-center w-full col-span-full">
                      <div className="flex flex-col text-center items-center justify-center space-y-12">
                        <h1 className="text-6xl font-bold">
                          No results found
                        </h1>
                        <div className="relative">
                          <div className="absolute -inset-1 blur dark:bg-yellow-400 bg-sky-700"/>
                          <FeedbackButton text='Make a suggestion' style="relative w-64 py-2 text-2xl" openModal={openModal}/>
                        </div>
                      </div>
                    </div>
                  }
                </SortableContext>
                <DragOverlay>
                  {activeBlock ? (
                    <LinkBlock
                      isDragging={true}
                      isOverlay={true}
                      item={activeBlock}
                      text={text}/>
                  ) : null}
                </DragOverlay>
            </DndContext>}
          </div>
        </div>
        <Footer/>
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          closeModal={() => setIsFeedbackModalOpen(false)}/>
      </div>
    );
  }
;

export default Home;
