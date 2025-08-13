import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { SiAirtel } from 'react-icons/si'
import { RiMastercardFill } from 'react-icons/ri'

interface SocialIcon {
  name: string
  icon: IconType
}

export const icons: SocialIcon[] = [
  {
    name: 'visa',
    icon: FaXTwitter,
  },
  {
    name: 'airtel',
    icon: SiAirtel,
  },
  {
    name: 'master-card',
    icon: RiMastercardFill,
  },
]
