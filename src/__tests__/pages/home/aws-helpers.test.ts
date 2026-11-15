import { AWS_SERVICES } from '@/_mocks/aws-landing.data'
import { filterServices, validateContactForm } from '@/pages/home/aws-helpers'

describe('filterServices', () => {
  it('returns all services when category is Tất cả and query is empty', () => {
    const result = filterServices(AWS_SERVICES, 'Tất cả', '')
    expect(result).toHaveLength(AWS_SERVICES.length)
  })

  it('filters by category and search keyword case-insensitively', () => {
    const result = filterServices(AWS_SERVICES, 'AI / ML', 'bedrock')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('bedrock')
  })

  it('returns empty array when no service matches', () => {
    const result = filterServices(AWS_SERVICES, 'Storage', 'kubernetes-nonexistent')
    expect(result).toHaveLength(0)
  })
})

describe('validateContactForm', () => {
  it('returns errors for empty name and invalid email', () => {
    const errors = validateContactForm({
      fullName: '',
      email: 'not-an-email',
      company: '',
      plan: 'Startup & Growth',
      message: 'Ngắn'
    })
    expect(errors.fullName).toBeDefined()
    expect(errors.email).toBeDefined()
    expect(errors.message).toBeDefined()
  })

  it('returns empty object for valid form values', () => {
    const errors = validateContactForm({
      fullName: 'Nguyễn Văn An',
      email: 'an.nguyen@company.vn',
      company: 'TechViet',
      plan: 'Startup & Growth',
      message: 'Chúng tôi cần tư vấn hạ tầng EC2 và RDS cho 50.000 người dùng.'
    })
    expect(Object.keys(errors)).toHaveLength(0)
  })
})
