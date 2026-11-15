import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Server } from 'lucide-react'

import { AWS_FEATURED_TOPICS, AWS_HERO_BANNER_IMAGE, AWS_HERO_STATS } from '@/_mocks/aws-landing.data'
import { scrollToSection } from '@/pages/home/aws-helpers'

export function AwsHero() {
  return (
    <section id='top' className='relative bg-white dark:bg-[#0F141A]'>
      {/* Architectural AWS Console-inspired Hero */}
      <div className='relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-20 bg-[#0F141A] text-white border-b border-slate-800'>
        {/* Subtle technical grid */}
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.07]'
          style={{
            backgroundImage:
              'linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
        <div
          className='pointer-events-none absolute -top-32 right-0 h-[420px] w-[520px] opacity-25 blur-3xl'
          style={{
            background: 'radial-gradient(circle, rgba(255,153,0,0.45) 0%, rgba(0,102,204,0.2) 55%, transparent 75%)'
          }}
        />

        <div className='container relative px-4 mx-auto max-w-6xl'>
          <div className='grid items-start gap-10 lg:grid-cols-12'>
            {/* Left 7 cols: Direct, unified typographic statement */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className='lg:col-span-7 pt-2'
            >
              <p className='text-sm font-medium text-slate-300 mb-4'>Amazon Web Services tại Việt Nam</p>

              <h1 className='text-4xl font-extrabold tracking-tight text-white sm:text-[52px] leading-[1.08] max-w-2xl'>
                Hạ tầng đám mây cho hệ thống cần độ tin cậy cao
              </h1>

              <p className='mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-[60ch]'>
                Triển khai máy chủ, lưu trữ, cơ sở dữ liệu và mô hình AI trên mạng lưới toàn cầu của AWS. Bắt đầu miễn
                phí với Free Tier và chỉ trả chi phí cho tài nguyên thực tế sử dụng.
              </p>

              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-9'>
                <button
                  type='button'
                  onClick={() => scrollToSection('#contact')}
                  className='inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md bg-[#FF9900] text-[#0F141A] hover:bg-[#e88b00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9900] transition-colors'
                >
                  Bắt đầu dùng AWS miễn phí
                </button>
                <button
                  type='button'
                  onClick={() => scrollToSection('#services')}
                  className='inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-md border border-slate-600 text-white hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors'
                >
                  Xem danh mục dịch vụ
                </button>
              </div>
            </motion.div>

            {/* Right 5 cols: Architectural Free Tier Spec Sheet */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
              className='lg:col-span-5'
            >
              <div className='rounded-lg bg-[#161D26] border border-slate-700/90 overflow-hidden'>
                <div className='relative h-32 w-full bg-[#1d2633] overflow-hidden border-b border-slate-700/80'>
                  <img
                    src={AWS_HERO_BANNER_IMAGE}
                    alt='Hạ tầng đám mây AWS'
                    className='w-full h-full object-cover opacity-75'
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-[#161D26] via-[#161D26]/40 to-transparent' />
                  <div className='absolute bottom-3 left-5 right-5 flex items-center justify-between'>
                    <span className='inline-flex items-center gap-2 text-xs font-mono text-slate-200'>
                      <Server className='w-3.5 h-3.5 text-[#FF9900]' />
                      AWS Free Tier
                    </span>
                    <span className='text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'>
                      12 tháng đầu
                    </span>
                  </div>
                </div>

                <div className='p-6'>
                  <h2 className='text-lg font-bold text-white'>Hạn mức trải nghiệm miễn phí</h2>

                  <ul className='mt-4 divide-y divide-slate-800 text-sm text-slate-300'>
                    <li className='flex items-start gap-2.5 py-2.5'>
                      <Check className='w-4 h-4 mt-0.5 text-[#FF9900] shrink-0' />
                      <span>750 giờ/tháng Amazon EC2 &amp; Amazon RDS</span>
                    </li>
                    <li className='flex items-start gap-2.5 py-2.5'>
                      <Check className='w-4 h-4 mt-0.5 text-[#FF9900] shrink-0' />
                      <span>5 GB lưu trữ Amazon S3 và 1 TB CloudFront</span>
                    </li>
                    <li className='flex items-start gap-2.5 py-2.5'>
                      <Check className='w-4 h-4 mt-0.5 text-[#FF9900] shrink-0' />
                      <span>1 triệu lượt gọi AWS Lambda miễn phí mỗi tháng</span>
                    </li>
                  </ul>

                  <button
                    type='button'
                    onClick={() => scrollToSection('#pricing')}
                    className='mt-5 w-full py-2.5 px-4 text-sm font-semibold rounded-md bg-white/10 hover:bg-white/15 text-white border border-slate-600 transition-colors'
                  >
                    So sánh các gói giải pháp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hairline-divided Infrastructure Metrics Strip */}
          <div className='grid grid-cols-2 md:grid-cols-4 mt-14 pt-8 border-t border-slate-800 gap-y-6'>
            {AWS_HERO_STATS.map((stat, idx) => (
              <div key={stat.id} className={`${idx > 0 ? 'md:border-l md:border-slate-800 md:pl-6' : ''} pr-4`}>
                <div className='font-mono text-2xl font-semibold text-white sm:text-3xl'>{stat.value}</div>
                <div className='mt-1 text-xs sm:text-sm text-slate-400'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Topics Band */}
      <div className='bg-white dark:bg-[#0F141A] py-14 border-b border-slate-200 dark:border-slate-800'>
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8'>
            <div>
              <h2 className='text-2xl sm:text-3xl font-bold text-[#0F141A] dark:text-white'>Chủ đề nổi bật</h2>
              <p className='mt-1.5 text-sm text-slate-600 dark:text-slate-400 max-w-[65ch]'>
                Cập nhật sự kiện, giải pháp AI tạo sinh và hướng dẫn triển khai nhanh cho đội ngũ kỹ thuật.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {AWS_FEATURED_TOPICS.map((topic) => (
              <button
                key={topic.id}
                type='button'
                onClick={() => scrollToSection(topic.href)}
                className='group flex flex-col justify-between text-left rounded-lg overflow-hidden bg-[#F3F4F6] dark:bg-[#161D26] border border-slate-200 dark:border-slate-800 hover:border-[#0F141A] dark:hover:border-[#FF9900] transition-colors'
              >
                <div className='relative h-28 w-full bg-slate-800 overflow-hidden'>
                  <img
                    src={topic.imageSrc}
                    alt={topic.imageAlt}
                    loading='lazy'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className='p-4 flex-1 flex flex-col justify-between'>
                  <div>
                    <span className='inline-block text-xs font-medium text-[#0066CC] dark:text-[#FF9900]'>
                      {topic.badge}
                    </span>
                    <h3 className='mt-1.5 text-sm font-bold text-[#0F141A] dark:text-white leading-snug'>
                      {topic.title}
                    </h3>
                  </div>
                  <span className='mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0F141A] dark:text-slate-300 group-hover:text-[#0066CC] dark:group-hover:text-[#FF9900]'>
                    Xem chi tiết <ArrowUpRight className='w-3.5 h-3.5' />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
