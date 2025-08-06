import { FaRobot, FaFileAlt, FaHandsHelping, FaChartBar, FaUsers, FaGraduationCap, FaMoneyBillWave, FaComments, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { RiRobot2Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { IoDocumentTextOutline } from "react-icons/io5";
import { VscRobot } from "react-icons/vsc";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineFeedback } from "react-icons/md";


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
        icon: VscRobot,
        name: 'Virtual Program Assistant',
        points: [
            "Automates beneficiary onboarding and service tracking, analyzes sentiment and engagement, analyzes sentiment and engagement",
            "Sends reminders via WhatsApp, SMS, or email",
            "Tracks service usage and engagement",
        ]
    },
    {
        icon: IoDocumentTextOutline,
        name: 'HR Coordinator Agent',
        points: [
            "Screens applications and schedules interviews",
            "Manages volunteer onboarding and training",
            "Tracks volunteer engagement and performance",
        ]
    },
    {
        icon: LuGraduationCap,
        name: 'Learning & Training Agent',
        points: [
            "Provides AI-guided learning for field teams",
            "Tracks training progress and outcomes",
            "Suggests personalized learning paths",
        ]
    },
    {
        icon: MdOutlineFeedback,
        name: 'Community Feedback Agent',
        points: [
            "Collects feedback through multiple channels, analyzes sentiment and engagement, analyzes sentiment and engagement",
            "Analyzes sentiment and engagement",
            "Provides insights for program improvement",
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