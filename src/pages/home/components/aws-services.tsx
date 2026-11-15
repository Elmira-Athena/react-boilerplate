import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Bookmark, Check, Cpu, Database, Globe, HardDrive, Search, Sparkles, X } from 'lucide-react'

import { AWS_CATEGORIES, AWS_SERVICES, type AwsCategory, type AwsService } from '@/_mocks/aws-landing.data'
import { filterServices, scrollToSection } from '@/pages/home/aws-helpers'

const SAVED_SERVICES_KEY = 'aws-saved-services'

const CATEGORY_STYLES: Record<Exclude<AwsCategory, 'Tất cả'>, { icon: typeof Cpu; badge: string }> = {
  Compute: {
    icon: Cpu,
    badge: 'bg-amber-500/10 text-amber-800 dark:bg-[#FF9900]/15 dark:text-[#FF9900]'
  },
  Storage: {
    icon: HardDrive,
    badge: 'bg-emerald-600/10 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400'
  },
  Database: {
    icon: Database,
    badge: 'bg-sky-600/10 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300'
  },
  'AI / ML': {
    icon: Sparkles,
    badge: 'bg-teal-600/10 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300'
  },
  Networking: {
    icon: Globe,
    badge: 'bg-indigo-600/10 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300'
  }
}

export function AwsServices() {
  const [selectedCategory, setSelectedCategory] = useState<AwsCategory>('Tất cả')
  const [onlySaved, setOnlySaved] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [activeService, setActiveService] = useState<AwsService | null>(null)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(SAVED_SERVICES_KEY)
      return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
      return []
    }
  })

  // Feature 6 (Bookmark): Đồng bộ danh sách dịch vụ đã lưu vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_SERVICES_KEY, JSON.stringify(savedIds))
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds])

  const toggleSaveService = (id: string) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  // Feature 2: Debounce tìm kiếm 250ms + cleanup timer
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchInput), 250)
    return () => clearTimeout(timer)
  }, [searchInput])

  // Feature 3 (Modal): Esc để đóng + khóa cuộn trang
  useEffect(() => {
    if (!activeService) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveService(null)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeService])

  const filteredServices = filterServices(AWS_SERVICES, selectedCategory, debouncedQuery).filter((service) =>
    onlySaved ? savedIds.includes(service.id) : true
  )

  return (
    <section
      id='services'
      className='scroll-mt-16 md:scroll-mt-24 py-20 bg-[#F3F4F6] dark:bg-[#161D26] border-b border-slate-200 dark:border-slate-800'
    >
      <div className='container px-4 mx-auto max-w-6xl'>
        <div className='max-w-2xl'>
          <h2 className='text-3xl font-bold text-[#0F141A] dark:text-white sm:text-4xl'>
            Danh mục dịch vụ đám mây AWS
          </h2>
          <p className='mt-3 text-slate-600 dark:text-slate-400 max-w-[60ch]'>
            Lọc theo nhóm giải pháp, lưu lại dịch vụ quan tâm hoặc tìm nhanh theo tên công nghệ.
          </p>
        </div>

        <div className='flex flex-col gap-4 mt-8 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-wrap gap-2'>
            {AWS_CATEGORIES.map((category) => {
              const active = selectedCategory === category
              return (
                <button
                  key={category}
                  type='button'
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                    active
                      ? 'bg-[#0F141A] text-white dark:bg-[#FF9900] dark:text-[#0F141A]'
                      : 'bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-[#0F141A] dark:hover:border-slate-500'
                  }`}
                >
                  {category}
                </button>
              )
            })}
            <button
              type='button'
              onClick={() => setOnlySaved((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                onlySaved
                  ? 'bg-[#FF9900] text-[#0F141A]'
                  : 'bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-[#FF9900]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${onlySaved ? 'fill-current' : ''}`} />
              Đã lưu ({savedIds.length})
            </button>
          </div>

          <div className='relative w-full md:w-72'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
            <input
              type='text'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder='Tìm EC2, S3, Bedrock...'
              aria-label='Tìm kiếm dịch vụ AWS'
              className='w-full pl-9 pr-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-[#FF9900]'
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className='py-14 mt-8 text-center rounded-lg bg-white dark:bg-[#0F141A] border border-dashed border-slate-300 dark:border-slate-700'>
            <p className='text-slate-600 dark:text-slate-400'>
              {onlySaved && savedIds.length === 0
                ? 'Bạn chưa lưu dịch vụ nào. Nhấn biểu tượng đánh dấu trên thẻ dịch vụ để lưu.'
                : `Không tìm thấy dịch vụ nào khớp với "${debouncedQuery}".`}
            </p>
            <button
              type='button'
              onClick={() => {
                setSelectedCategory('Tất cả')
                setOnlySaved(false)
                setSearchInput('')
              }}
              className='mt-3 text-sm font-semibold text-[#0066CC] dark:text-[#FF9900] hover:underline'
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-5 mt-8 sm:grid-cols-2 lg:grid-cols-3'>
            {filteredServices.map((service) => {
              const style = CATEGORY_STYLES[service.category]
              const Icon = style.icon
              const isSaved = savedIds.includes(service.id)
              return (
                <article
                  key={service.id}
                  className='flex flex-col justify-between p-6 rounded-lg bg-white dark:bg-[#0F141A] border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 transition-colors'
                >
                  <div>
                    <div className='flex items-center justify-between gap-2'>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded ${style.badge}`}
                      >
                        <Icon className='w-3.5 h-3.5' />
                        {service.category}
                      </span>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs font-mono text-slate-500 dark:text-slate-400'>
                          {service.shortName}
                        </span>
                        <button
                          type='button'
                          onClick={() => toggleSaveService(service.id)}
                          aria-label={isSaved ? `Bỏ lưu ${service.name}` : `Lưu ${service.name}`}
                          className={`p-1.5 rounded transition-colors ${
                            isSaved
                              ? 'text-[#FF9900] bg-[#FF9900]/10'
                              : 'text-slate-400 hover:text-[#0F141A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 className='mt-4 text-lg font-bold text-[#0F141A] dark:text-white'>{service.name}</h3>
                    <p className='mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed'>{service.tagline}</p>
                  </div>

                  <div className='flex items-center justify-between gap-3 pt-4 mt-6 border-t border-slate-200 dark:border-slate-800'>
                    <span
                      className='min-w-0 truncate font-mono text-xs text-slate-500 dark:text-slate-400'
                      title={service.sla}
                    >
                      {service.sla}
                    </span>
                    <button
                      type='button'
                      onClick={() => setActiveService(service)}
                      className='shrink-0 whitespace-nowrap inline-flex items-center gap-1 text-sm font-semibold text-[#0066CC] dark:text-[#FF9900] hover:underline'
                    >
                      Xem chi tiết
                      <ArrowUpRight className='w-3.5 h-3.5' />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            role='dialog'
            aria-modal='true'
            aria-labelledby='service-modal-title'
          >
            <button
              type='button'
              aria-label='Đóng chi tiết dịch vụ'
              tabIndex={-1}
              onClick={() => setActiveService(null)}
              className='absolute inset-0 w-full h-full bg-[#0F141A]/75 backdrop-blur-sm cursor-default'
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className='relative z-10 w-full max-w-xl p-6 sm:p-8 rounded-lg bg-white dark:bg-[#161D26] border border-slate-200 dark:border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto'
            >
              <button
                type='button'
                onClick={() => setActiveService(null)}
                aria-label='Đóng chi tiết dịch vụ'
                className='absolute top-4 right-4 p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              >
                <X className='w-5 h-5' />
              </button>

              <div className='flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400'>
                <span className='px-2 py-0.5 rounded bg-[#0F141A] text-[#FF9900] font-semibold'>
                  {activeService.category}
                </span>
                <span>{activeService.sla}</span>
              </div>

              <h3 id='service-modal-title' className='mt-3 text-2xl font-bold text-[#0F141A] dark:text-white'>
                {activeService.name}
              </h3>
              <p className='mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed'>
                {activeService.description}
              </p>

              <div className='p-3.5 mt-5 rounded-md bg-[#F3F4F6] dark:bg-[#0F141A] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-[#0F141A] dark:text-slate-200'>
                <span className='font-semibold'>Mô hình chi phí:</span> {activeService.pricingModel}
              </div>

              <div className='mt-5'>
                <h4 className='text-sm font-bold text-[#0F141A] dark:text-white'>Tính năng chính</h4>
                <ul className='mt-2 space-y-2'>
                  {activeService.highlights.map((item) => (
                    <li key={item} className='flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300'>
                      <Check className='w-4 h-4 mt-0.5 shrink-0 text-[#FF9900]' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-5'>
                <h4 className='text-sm font-bold text-[#0F141A] dark:text-white'>Trường hợp sử dụng</h4>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {activeService.useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className='px-3 py-1 text-xs rounded-md bg-[#F3F4F6] dark:bg-[#0F141A] text-[#0F141A] dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3 pt-5 mt-6 border-t border-slate-200 dark:border-slate-800'>
                <button
                  type='button'
                  onClick={() => setActiveService(null)}
                  className='px-4 py-2 text-sm font-semibold rounded-md border border-slate-300 dark:border-slate-700 text-[#0F141A] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                >
                  Đóng
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setActiveService(null)
                    scrollToSection('#contact')
                  }}
                  className='inline-flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-md bg-[#FF9900] text-[#0F141A] hover:bg-[#e88b00] transition-colors'
                >
                  Tư vấn dịch vụ này
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
