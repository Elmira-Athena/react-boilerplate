import { useEffect, useState, type FormEvent } from 'react'

import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { toast } from 'react-toastify'

import { AWS_FOOTER_COLUMNS, AWS_PLANS } from '@/_mocks/aws-landing.data'
import {
  type ContactFormErrors,
  type ContactFormValues,
  scrollToSection,
  validateContactForm
} from '@/pages/home/aws-helpers'

interface AwsContactFooterProps {
  selectedPlan: string
}

export function AwsContactFooter({ selectedPlan }: AwsContactFooterProps) {
  const [values, setValues] = useState<ContactFormValues>({
    fullName: '',
    email: '',
    company: '',
    plan: selectedPlan,
    message: ''
  })
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (selectedPlan) {
      setValues((prev) => ({ ...prev, plan: selectedPlan }))
    }
  }, [selectedPlan])

  // Feature 5: Form liên hệ / báo giá (useState validation + loading + toast)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      toast.error('Vui lòng kiểm tra lại các trường thông tin bắt buộc.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success(`Đã gửi yêu cầu tư vấn gói "${values.plan}".`)
      setValues({
        fullName: '',
        email: '',
        company: '',
        plan: AWS_PLANS[1].name,
        message: ''
      })
    }, 900)
  }

  return (
    <>
      <section id='contact' className='scroll-mt-16 md:scroll-mt-24 py-20 bg-white dark:bg-[#0F141A]'>
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 gap-10 lg:grid-cols-12 items-start'>
            <div className='lg:col-span-5'>
              <h2 className='text-3xl font-bold text-[#0F141A] dark:text-white'>Đăng ký tư vấn &amp; báo giá</h2>
              <p className='mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-[45ch]'>
                Gửi thông tin kiến trúc hoặc lưu lượng dự kiến để nhận bản ước tính chi phí hạ tầng AWS phù hợp.
              </p>

              <ul className='mt-8 space-y-3 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-6'>
                <li className='flex items-start gap-2.5'>
                  <CheckCircle2 className='w-4 h-4 mt-0.5 text-[#FF9900] shrink-0' />
                  <span>Gợi ý Region tối ưu độ trễ cho người dùng tại Việt Nam</span>
                </li>
                <li className='flex items-start gap-2.5'>
                  <CheckCircle2 className='w-4 h-4 mt-0.5 text-[#FF9900] shrink-0' />
                  <span>Phác thảo kiến trúc EC2, Serverless hoặc Amazon Bedrock</span>
                </li>
                <li className='flex items-start gap-2.5'>
                  <CheckCircle2 className='w-4 h-4 mt-0.5 text-[#FF9900] shrink-0' />
                  <span>Ước tính chi phí hàng tháng theo gói {values.plan}</span>
                </li>
              </ul>
            </div>

            <div className='lg:col-span-7 p-6 sm:p-8 rounded-lg bg-[#F3F4F6] dark:bg-[#161D26] border border-slate-200 dark:border-slate-800'>
              <form onSubmit={handleSubmit} noValidate className='space-y-5'>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-semibold text-[#0F141A] dark:text-slate-200 mb-1.5'>
                      Họ và tên *
                    </label>
                    <input
                      type='text'
                      value={values.fullName}
                      onChange={(e) => setValues((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder='Nguyễn Văn An'
                      className='w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-[#FF9900]'
                    />
                    {errors.fullName && <p className='mt-1 text-xs text-red-500'>{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-[#0F141A] dark:text-slate-200 mb-1.5'>
                      Email công việc *
                    </label>
                    <input
                      type='email'
                      value={values.email}
                      onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder='an@company.vn'
                      className='w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-[#FF9900]'
                    />
                    {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email}</p>}
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                  <div>
                    <label className='block text-sm font-semibold text-[#0F141A] dark:text-slate-200 mb-1.5'>
                      Doanh nghiệp / Dự án
                    </label>
                    <input
                      type='text'
                      value={values.company}
                      onChange={(e) => setValues((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder='TechViet / Đồ án cá nhân'
                      className='w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-[#FF9900]'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-[#0F141A] dark:text-slate-200 mb-1.5'>
                      Gói quan tâm
                    </label>
                    <select
                      value={values.plan}
                      onChange={(e) => setValues((prev) => ({ ...prev, plan: e.target.value }))}
                      className='w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-[#FF9900]'
                    >
                      {AWS_PLANS.map((plan) => (
                        <option key={plan.id} value={plan.name}>
                          {plan.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-[#0F141A] dark:text-slate-200 mb-1.5'>
                    Mô tả nhu cầu hạ tầng *
                  </label>
                  <textarea
                    rows={4}
                    value={values.message}
                    onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder='Ví dụ: Cần triển khai React + Node.js API, dự kiến 10.000 lượt truy cập/ngày...'
                    className='w-full px-3.5 py-2.5 text-sm rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F141A] text-[#0F141A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0066CC] dark:focus:ring-[#FF9900]'
                  />
                  {errors.message && <p className='mt-1 text-xs text-red-500'>{errors.message}</p>}
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-md bg-[#FF9900] text-[#0F141A] hover:bg-[#e88b00] disabled:opacity-60 transition-colors'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-4 h-4 animate-spin' />
                      Đang gửi yêu cầu...
                    </>
                  ) : (
                    <>
                      <Send className='w-4 h-4' />
                      Gửi yêu cầu tư vấn
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className='py-12 bg-[#0F141A] text-slate-300 border-t border-slate-800'>
        <div className='container px-4 mx-auto max-w-6xl'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            <div>
              <span className='inline-flex flex-col items-start leading-none'>
                <span className='text-xl font-extrabold tracking-tight text-white'>aws</span>
                <svg width='38' height='12' viewBox='0 0 38 12' fill='none' aria-hidden='true' className='-mt-0.5'>
                  <path d='M2 3.5C10.5 9.8 23.5 10.2 33 4.5' stroke='#FF9900' strokeWidth='2.3' strokeLinecap='round' />
                  <path
                    d='M29.5 2.5L34.5 3.8L32.8 8.5'
                    stroke='#FF9900'
                    strokeWidth='2.1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </span>
              <p className='mt-3 text-sm text-slate-400 leading-relaxed'>
                Trang giới thiệu dịch vụ Amazon Web Services (Frontend Only), xây dựng bằng React và Tailwind CSS.
              </p>
            </div>

            {AWS_FOOTER_COLUMNS.map((col) => (
              <div key={col.id}>
                <h3 className='text-sm font-bold text-white'>{col.title}</h3>
                <ul className='mt-3 space-y-2'>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        type='button'
                        onClick={() => scrollToSection(link.href)}
                        className='text-sm text-slate-400 hover:text-[#FF9900] transition-colors'
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className='pt-8 mt-10 text-xs text-slate-500 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-2'>
            <span>© {new Date().getFullYear()} AWS Cloud Demo Landing Page.</span>
            <span>Built with React &amp; Tailwind CSS.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
