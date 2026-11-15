import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'

import { AWS_FAQS, AWS_PLANS } from '@/_mocks/aws-landing.data'
import { scrollToSection } from '@/pages/home/aws-helpers'

interface AwsPricingFaqProps {
  onSelectPlan: (planName: string) => void
}

export function AwsPricingFaq({ onSelectPlan }: AwsPricingFaqProps) {
  // Feature 4: Accordion FAQ (useState)
  const [openFaqId, setOpenFaqId] = useState<string | null>(AWS_FAQS[0]?.id ?? null)

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id))
  }

  return (
    <>
      <section id='pricing' className='scroll-mt-16 md:scroll-mt-24 py-20 bg-white dark:bg-[#0F141A]'>
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold text-[#0F141A] dark:text-white sm:text-4xl'>
              Gói giải pháp &amp; chi phí tham khảo
            </h2>
            <p className='mt-3 text-slate-600 dark:text-slate-400 max-w-[60ch]'>
              Trả tiền theo mức sử dụng thực tế, không yêu cầu cam kết dài hạn khi bắt đầu.
            </p>
          </div>

          <div className='grid grid-cols-1 gap-6 mt-12 lg:grid-cols-3'>
            {AWS_PLANS.map((plan) => {
              const isPopular = Boolean(plan.popular)
              return (
                <div
                  key={plan.id}
                  className={`flex flex-col justify-between p-7 rounded-lg border ${
                    isPopular
                      ? 'bg-[#0F141A] text-white border-[#0F141A] dark:bg-[#161D26] dark:border-[#FF9900]'
                      : 'bg-[#F3F4F6] dark:bg-[#161D26] text-[#0F141A] dark:text-white border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div>
                    <div className='flex items-center justify-between gap-2'>
                      <h3 className='text-lg font-bold'>{plan.name}</h3>
                      {isPopular && (
                        <span className='px-2.5 py-0.5 text-xs font-semibold rounded bg-[#FF9900] text-[#0F141A]'>
                          Khuyên dùng
                        </span>
                      )}
                    </div>

                    <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mt-5'>
                      <span className='font-mono text-3xl font-bold whitespace-nowrap'>{plan.price}</span>
                      <span
                        className={`text-sm ${isPopular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isPopular ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {plan.description}
                    </p>

                    <ul
                      className={`mt-6 pt-5 border-t space-y-3 ${
                        isPopular ? 'border-slate-700' : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {plan.features.map((feat) => (
                        <li key={feat} className='flex items-start gap-2.5 text-sm'>
                          <Check
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              isPopular ? 'text-[#FF9900]' : 'text-[#0066CC] dark:text-[#FF9900]'
                            }`}
                          />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type='button'
                    onClick={() => {
                      onSelectPlan(plan.name)
                      scrollToSection('#contact')
                    }}
                    className={`mt-8 w-full py-2.5 px-4 text-sm font-semibold rounded-md transition-colors ${
                      isPopular
                        ? 'bg-[#FF9900] text-[#0F141A] hover:bg-[#e88b00]'
                        : 'bg-[#0F141A] text-white hover:bg-[#232f3e] dark:bg-slate-800 dark:hover:bg-slate-700'
                    }`}
                  >
                    {plan.ctaLabel}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id='faq'
        className='scroll-mt-16 md:scroll-mt-24 py-20 bg-[#F3F4F6] dark:bg-[#161D26] border-y border-slate-200 dark:border-slate-800'
      >
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-12'>
            <div className='lg:col-span-4'>
              <h2 className='text-3xl font-bold text-[#0F141A] dark:text-white'>Câu hỏi thường gặp</h2>
              <p className='mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[45ch]'>
                Giải đáp nhanh về chi phí Free Tier, lựa chọn Region gần Việt Nam và bảo mật dữ liệu doanh nghiệp trên
                AWS.
              </p>
            </div>

            <div className='lg:col-span-8 divide-y divide-slate-300 dark:divide-slate-700 border-y border-slate-300 dark:border-slate-700'>
              {AWS_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id
                return (
                  <div key={faq.id}>
                    <button
                      type='button'
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      className='flex items-center justify-between w-full py-4 text-left font-semibold text-[#0F141A] dark:text-white hover:text-[#0066CC] dark:hover:text-[#FF9900] transition-colors'
                    >
                      <span className='pr-4 text-sm sm:text-base'>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#FF9900]' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className='overflow-hidden'
                        >
                          <div className='pb-5 pr-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-[70ch]'>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
