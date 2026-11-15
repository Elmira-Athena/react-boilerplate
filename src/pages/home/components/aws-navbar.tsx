import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import { AWS_NAV_LINKS } from '@/_mocks/aws-landing.data'
import { ThemeToggle } from '@/components/theme/theme-toogle'
import { scrollToSection } from '@/pages/home/aws-helpers'

function AwsSmileLogo() {
  return (
    <span className='inline-flex flex-col items-start leading-none select-none'>
      <span className='text-[22px] font-extrabold tracking-tight text-[#16191f] dark:text-white'>aws</span>
      <svg width='40' height='12' viewBox='0 0 38 12' fill='none' aria-hidden='true' className='-mt-0.5'>
        <path d='M2 3.5C10.5 9.8 23.5 10.2 33 4.5' stroke='#FF6200' strokeWidth='2.4' strokeLinecap='round' />
        <path
          d='M29.5 2.5L34.5 3.8L32.8 8.5'
          stroke='#FF6200'
          strokeWidth='2.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </span>
  )
}

export function AwsNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Feature 1: Navbar đổi nền khi cuộn + cleanup listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Feature 3 (Drawer): Esc để đóng + khóa cuộn body khi mở Mobile Drawer
  useEffect(() => {
    if (!mobileOpen) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    scrollToSection(href)
  }

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0f141a]/95 backdrop-blur-md border-b border-[#d5dbdb] dark:border-slate-700/80 shadow-lg'
          : 'bg-white dark:bg-[#161d26] border-b border-[#eaeded] dark:border-slate-800'
      }`}
    >
      <div
        className={`hidden md:block bg-[#161d26] text-[12px] text-slate-200 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100 border-b border-slate-800'
        }`}
      >
        <div className='container flex items-center justify-end gap-5 px-4 py-1.5 mx-auto max-w-6xl'>
          <span>Tiếng Việt</span>
          <button
            type='button'
            onClick={() => handleNavClick('#contact')}
            className='hover:text-[#0073bb] dark:hover:text-[#ff9900] transition-colors'
          >
            Liên hệ với chúng tôi
          </button>
          <button
            type='button'
            onClick={() => handleNavClick('#services')}
            className='hover:text-[#0073bb] dark:hover:text-[#ff9900] transition-colors'
          >
            AWS Marketplace
          </button>
          <button
            type='button'
            onClick={() => handleNavClick('#faq')}
            className='hover:text-[#0073bb] dark:hover:text-[#ff9900] transition-colors'
          >
            Hỗ trợ
          </button>
        </div>
      </div>

      <nav className='container flex items-center justify-between px-4 py-3 mx-auto max-w-6xl'>
        <div className='flex items-center gap-8'>
          <a
            href='#top'
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className='flex items-center'
          >
            <AwsSmileLogo />
          </a>

          <ul className='hidden items-center gap-6 md:flex'>
            {AWS_NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  type='button'
                  onClick={() => handleNavClick(link.href)}
                  className='text-sm font-medium text-[#16191f] dark:text-slate-200 hover:text-[#0073bb] dark:hover:text-[#ff9900] transition-colors'
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <button
            type='button'
            onClick={() => handleNavClick('#services')}
            className='hidden lg:inline-flex items-center text-xs font-medium text-[#16191f] dark:text-slate-200 hover:text-[#0073bb] dark:hover:text-[#ff9900] transition-colors'
          >
            Đăng nhập vào bảng điều khiển
          </button>
          <button
            type='button'
            onClick={() => handleNavClick('#contact')}
            className='hidden sm:inline-flex items-center px-5 py-2 text-xs sm:text-sm font-semibold rounded-full bg-[#161d26] text-white hover:bg-[#232f3e] dark:bg-[#ff9900] dark:text-[#0f1b2a] dark:hover:bg-[#ec7211] transition-colors'
          >
            Tạo tài khoản
          </button>
          <button
            type='button'
            onClick={() => setMobileOpen(true)}
            aria-label='Mở menu'
            className='p-2 rounded-lg text-[#16191f] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden'
          >
            <Menu className='w-5 h-5' />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className='fixed inset-0 z-50 md:hidden'
          >
            <button
              type='button'
              aria-label='Đóng menu'
              tabIndex={-1}
              onClick={() => setMobileOpen(false)}
              className='absolute inset-0 w-full h-full bg-slate-950/60 backdrop-blur-sm cursor-default'
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className='relative ml-auto flex flex-col w-72 h-full p-6 bg-white dark:bg-[#161d26] text-[#16191f] dark:text-white border-l border-[#d5dbdb] dark:border-slate-700 shadow-2xl'
            >
              <div className='flex items-center justify-between mb-8'>
                <AwsSmileLogo />
                <button
                  type='button'
                  onClick={() => setMobileOpen(false)}
                  aria-label='Đóng menu'
                  className='p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                >
                  <X className='w-5 h-5' />
                </button>
              </div>
              <ul className='flex flex-col gap-2'>
                {AWS_NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      type='button'
                      onClick={() => handleNavClick(link.href)}
                      className='w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#16191f] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#0073bb] dark:hover:text-[#ff9900] transition-colors'
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className='mt-auto flex flex-col gap-2.5'>
                <button
                  type='button'
                  onClick={() => handleNavClick('#services')}
                  className='w-full py-2.5 font-semibold rounded-full border border-[#d5dbdb] dark:border-slate-600 text-[#16191f] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                >
                  Khám phá dịch vụ
                </button>
                <button
                  type='button'
                  onClick={() => handleNavClick('#contact')}
                  className='w-full py-2.5 font-bold rounded-full bg-[#ff9900] text-[#0f1b2a] hover:bg-[#ec7211] transition-colors'
                >
                  Tạo tài khoản AWS
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
