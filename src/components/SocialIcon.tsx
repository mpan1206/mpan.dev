import React from 'react'
import { Rss } from 'lucide-react'
import {
  SiGithub,
  SiX,
  SiBluesky,
  SiSinaweibo,
  SiZhihu,
  SiBilibili,
  SiDiscord,
} from 'react-icons/si'
import { FaQq } from 'react-icons/fa'
import type { SocialIconProps } from '@/types'

export const SocialIcon: React.FC<SocialIconProps> = ({ name, className }) => {
  switch (name) {
    case 'github':
      return <SiGithub className={className} />
    case 'twitter':
      return <SiX className={className} />
    case 'bluesky':
      return <SiBluesky className={className} />
    case 'rss':
      return <Rss className={className} />
    case 'weibo':
      return <SiSinaweibo className={className} />
    case 'zhihu':
      return <SiZhihu className={className} />
    case 'bilibili':
      return <SiBilibili className={className} />
    case 'qq':
      return <FaQq className={className} />
    case 'discord':
      return <SiDiscord className={className} />
    default:
      return null
  }
}
