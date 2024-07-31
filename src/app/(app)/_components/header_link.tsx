import { cn } from '@/lib/utils'
import Link from 'next/link'

export const HeaderLink = ({
  href,
  children,
  prefetch = true,
  isActive = false,
}: {
  href: string
  children: React.ReactNode
  prefetch?: boolean
  isActive?: boolean
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-card-foreground hover:text-card-foreground/50',
        isActive && 'rounded-lg px-3 py-2 border-2 border-primary',
      )}
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
