import { FaHandsHelping, FaChartBar, FaUsers, FaGraduationCap, FaMoneyBillWave, FaComments, FaMapMarkedAlt, FaShieldAlt } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { RiRobot2Line } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { FaRegHandshake } from 'react-icons/fa6';
import { BiDonateHeart } from 'react-icons/bi';
import { TbReportSearch } from 'react-icons/tb';


export interface Tool {
  icon: IconType;
  name: string;
  description: string;
  points: string[];
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
    description: 'Automates beneficiary onboarding, sends reminders, and tracks service usage via WhatsApp, SMS, or email.',
    points: [
      "Automate onboarding",
      "Attendance tracking",
      "Follow-ups via WhatsApp"
    ]
  },
  {
    icon: CgFileDocument,
    name: 'AI Grant Proposal Writer',
    description: 'Helps write and customize grant applications based on donor guidelines and success metrics.',
    points: [
      "Drafts proposals using AI",
      "Customizes content for donors",
      "Highlights success metrics"
    ]
  },
  {
    icon: FaHandsHelping,
    name: 'Donor Engagement Agent',
    description: 'Manages personalized campaigns, donor segmentation, and impact storytelling with Theory of Change framework.',
    points: [
      "Creates targeted campaigns",
      "Segments donor lists",
      "Builds impact stories"
    ]
  },
  {
    icon: FaChartBar,
    name: 'M&E Reporting Assistant',
    description: 'Gathers data, suggests impact narratives, and provides automated visualizations.',
    points: [
      "Collects monitoring data",
      "Generates visual reports",
      "Suggests impact narratives"
    ]
  },
  {
    icon: FaUsers,
    name: 'Volunteer/HR Coordinator',
    description: 'Screens applications, schedules interviews, and manages volunteer onboarding.',
    points: [
      "Screens volunteer applications",
      "Schedules interviews",
      "Manages onboarding process"
    ]
  },
  {
    icon: FaGraduationCap,
    name: 'Learning & Training Agent',
    description: 'Provides AI-guided learning for field teams and community trainers.',
    points: [
      "Suggests learning paths",
      "Tracks training progress",
      "Recommends resources"
    ]
  },
  {
    icon: FaMoneyBillWave,
    name: 'Finance & Budget Planner',
    description: 'Tracks spending, flags anomalies, and generates financial reports.',
    points: [
      "Monitors expenses",
      "Flags budget anomalies",
      "Generates financial summaries"
    ]
  },
  {
    icon: FaComments,
    name: 'Community Feedback Agent',
    description: 'Collects feedback through multiple channels and analyzes sentiment.',
    points: [
      "Collects multi-channel feedback",
      "Analyzes sentiment",
      "Summarizes community input"
    ]
  },
  {
    icon: FaMapMarkedAlt,
    name: 'Impact Mapping & Strategy',
    description: 'Maps outcomes and suggests strategic initiatives based on data and trends.',
    points: [
      "Maps project outcomes",
      "Analyzes data trends",
      "Suggests strategic actions"
    ]
  },
  {
    icon: FaShieldAlt,
    name: 'Compliance & Policy Bot',
    description: 'Monitors compliance, answers policy questions, and flags risks.',
    points: [
      "Monitors policy compliance",
      "Answers compliance queries",
      "Flags potential risks"
    ]
  }
];