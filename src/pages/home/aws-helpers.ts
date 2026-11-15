import { type AwsCategory, type AwsService } from '@/_mocks/aws-landing.data'

export interface ContactFormValues {
  fullName: string
  email: string
  company: string
  plan: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export function filterServices(services: AwsService[], category: AwsCategory, query: string): AwsService[] {
  const normalized = query.trim().toLowerCase()

  return services.filter((service) => {
    const matchesCategory = category === 'Tất cả' || service.category === category
    if (!matchesCategory) return false
    if (!normalized) return true

    return (
      service.name.toLowerCase().includes(normalized) ||
      service.tagline.toLowerCase().includes(normalized) ||
      service.category.toLowerCase().includes(normalized)
    )
  })
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Vui lòng nhập họ và tên.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(values.email.trim())) {
    errors.email = 'Email không hợp lệ.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Vui lòng mô tả nhu cầu tối thiểu 10 ký tự.'
  }

  return errors
}

export function scrollToSection(id: string) {
  const target = document.querySelector(id)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}
