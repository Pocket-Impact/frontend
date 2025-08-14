import { FaRobot, FaFileAlt, FaHandsHelping, FaChartBar, FaUsers, FaGraduationCap, FaMoneyBillWave, FaComments, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { RiRobot2Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscRobot } from "react-icons/vsc";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";
import { FaRegHandshake } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
import { TbReportSearch } from 'react-icons/tb';


export interface Tool {
  icon: IconType;
  name: string;
  description: string;
}

export interface Feature {
  icon: IconType;
  name: string;
  points: string[];
}


export const features: Feature[] = [
  {
    icon: FaRegHandshake,
    name: 'Service Delivery',
    points: [
      "Virtual Program Assistant (WhatsApp/SMS onboarding, tracking, reports)",
      "HR Coordinator Agent (Volunteer screening, onboarding kits)",
      "Community Feedback Agent (Surveys, sentiment analysis)",
    ]
  },
  {
    icon: TbReportSearch,
    name: 'Impact & Reporting',
    points: [
      "M&E Reporting Assistant (Automated donor-ready reports)",
      "Impact Mapping & Strategy Planner (SDG alignment & data-driven strategy)",
    ]
  },
  {
    icon: BiDonateHeart,
    name: 'Fundraising & Donor Engagement',
    points: [
      "Provides AI-guided learning for field teams",
      "Tracks training progress and outcomes",
      "Suggests personalized learning paths",
    ]
  }  
]

export const tools: Tool[] = [
  {
    icon: RiRobot2Line,
    name: 'Virtual Program Assistant',
    description: 'Automates beneficiary onboarding, sends reminders, and tracks service usage via WhatsApp, SMS, or email.'
  },
  {
    icon: CgFileDocument,
    name: 'AI Grant Proposal Writer',
    description: 'Helps write and customize grant applications based on donor guidelines and success metrics.'
  },
  {
    icon: FaHandsHelping,
    name: 'Donor Engagement Agent',
    description: 'Manages personalized campaigns, donor segmentation, and impact storytelling with Theory of Change framework.'
  },
  {
    icon: FaChartBar,
    name: 'M&E Reporting Assistant',
    description: 'Gathers data, suggests impact narratives, and provides automated visualizations.'
  },
  {
    icon: FaUsers,
    name: 'Volunteer/HR Coordinator',
    description: 'Screens applications, schedules interviews, and manages volunteer onboarding.'
  },
  {
    icon: FaGraduationCap,
    name: 'Learning & Training Agent',
    description: 'Provides AI-guided learning for field teams and community trainers.'
  },
  {
    icon: FaMoneyBillWave,
    name: 'Finance & Budget Planner',
    description: 'Tracks spending, flags anomalies, and generates financial reports.'
  },
  {
    icon: FaComments,
    name: 'Community Feedback Agent',
    description: 'Collects feedback through multiple channels and analyzes sentiment.'
  },
  {
    icon: FaMapMarkedAlt,
    name: 'Impact Mapping & Strategy',
    description: 'Maps outcomes and suggests strategic initiatives based on data and trends.'
  },
  {
    icon: FaShieldAlt,
    name: 'Compliance & Policy Bot',
    description: 'Monitors compliance, answers policy questions, and flags risks.'
  }
];