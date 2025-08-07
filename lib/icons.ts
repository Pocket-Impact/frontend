import { FaXTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa6'
import type { IconType } from 'react-icons'

interface SocialIcon {
  name: 'twitter' | 'linkedin' | 'instagram'
  icon: IconType
  url: string
}

export const socialIcons: SocialIcon[] = [
  {
    name: 'twitter',
    icon: FaXTwitter,
    url: 'https://twitter.com/no_ig_account',
  },
  {
    name: 'linkedin',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/no_ig_account',
  },
  {
    name: 'instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/no_ig_account',
  },
]
