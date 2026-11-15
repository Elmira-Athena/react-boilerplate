export type AwsCategory = 'Tất cả' | 'Compute' | 'Storage' | 'Database' | 'AI / ML' | 'Networking'

export interface AwsNavLink {
  id: string
  label: string
  href: string
}

export interface AwsHeroStat {
  id: string
  value: string
  label: string
}

export interface AwsFeaturedTopic {
  id: string
  badge: string
  title: string
  href: string
  imageSrc: string
  imageAlt: string
}

export const AWS_HERO_BANNER_IMAGE =
  'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/global-nav/aws-library_illustration_innovation_8_1200.07a6484f8eaa3100138cf8b6dce14f1db024db32.jpg'

export const AWS_FEATURED_TOPICS: AwsFeaturedTopic[] = [
  {
    id: 'reinvent',
    badge: 're:Invent 2026',
    title: 'Các phiên đã được lên lịch và chỗ ngồi của bạn đã sẵn sàng',
    href: '#services',
    imageSrc:
      'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/homepage/global-nav/reinvent-register-2026.73ee1c918de65784347ba0cd636b27da8086c66e.png',
    imageAlt: 'AWS re:Invent 2026'
  },
  {
    id: 'ai-agents',
    badge: 'Xây dựng và triển khai tác tử AI',
    title: 'Khám phá Amazon Bedrock & AI Agents trên quy mô doanh nghiệp',
    href: '#services',
    imageSrc:
      'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/homepage/global-nav/building-30-day-challenge.fbb950fa275e28193955202b94c04d0125135ecc.jpg',
    imageAlt: 'Xây dựng tác tử AI trên AWS'
  },
  {
    id: 'start-here',
    badge: 'Bắt đầu với Free Tier',
    title: 'Đăng ký miễn phí, kết nối dịch vụ và bắt đầu xây dựng ngay',
    href: '#pricing',
    imageSrc:
      'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/homepage/global-nav/start-here.51d7e318c4dec6bc220a696add0abb2d8388f280.png',
    imageAlt: 'Bắt đầu với AWS'
  },
  {
    id: 'whats-new',
    badge: 'Câu chuyện khách hàng',
    title: 'Tìm hiểu cách doanh nghiệp tăng tốc chuyển đổi số cùng AWS',
    href: '#contact',
    imageSrc:
      'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/global-nav/aws-library_illustration_culture_11_1200.29c48d4e742090396f61d0c5d5eec4ea8d714817.jpg',
    imageAlt: 'Câu chuyện thành công khách hàng AWS'
  }
]

export interface AwsService {
  id: string
  name: string
  shortName: string
  category: Exclude<AwsCategory, 'Tất cả'>
  tagline: string
  description: string
  pricingModel: string
  sla: string
  useCases: string[]
  highlights: string[]
}

export interface AwsPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  popular?: boolean
  features: string[]
  ctaLabel: string
}

export interface AwsFaq {
  id: string
  question: string
  answer: string
}

export interface AwsFooterColumn {
  id: string
  title: string
  links: { label: string; href: string }[]
}

export const AWS_NAV_LINKS: AwsNavLink[] = [
  { id: 'services', label: 'Dịch vụ', href: '#services' },
  { id: 'pricing', label: 'Gói giải pháp', href: '#pricing' },
  { id: 'faq', label: 'Hỏi đáp', href: '#faq' },
  { id: 'contact', label: 'Tư vấn', href: '#contact' }
]

export const AWS_HERO_STATS: AwsHeroStat[] = [
  { id: 'services-count', value: '200+', label: 'Dịch vụ đám mây toàn diện' },
  { id: 'regions', value: '33', label: 'Regions & 105 Availability Zones' },
  { id: 'uptime', value: '99.99%', label: 'Cam kết độ sẵn sàng SLA' },
  { id: 'customers', value: 'Hàng triệu', label: 'Khách hàng doanh nghiệp & Startup' }
]

export const AWS_CATEGORIES: AwsCategory[] = ['Tất cả', 'Compute', 'Storage', 'Database', 'AI / ML', 'Networking']

export const AWS_SERVICES: AwsService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    shortName: 'EC2',
    category: 'Compute',
    tagline: 'Máy chủ ảo linh hoạt, mở rộng tức thì theo lưu lượng.',
    description:
      'Amazon Elastic Compute Cloud (EC2) cung cấp năng lực tính toán an toàn và có thể thay đổi quy mô trên đám mây, hỗ trợ hơn 750 loại instance tối ưu cho CPU, RAM, GPU và lưu trữ.',
    pricingModel: 'Trả theo giây (On-Demand) hoặc tiết kiệm tới 72% với Savings Plans',
    sla: '99.99% Uptime SLA',
    useCases: ['Triển khai Web App & Microservices', 'Xử lý dữ liệu lớn & Batch Jobs', 'Huấn luyện mô hình AI/ML'],
    highlights: [
      'Auto Scaling tự động tăng/giảm máy chủ',
      'Hỗ trợ chip AWS Graviton tiết kiệm 40% chi phí',
      'Tích hợp sẵn VPC & IAM bảo mật'
    ]
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    shortName: 'Lambda',
    category: 'Compute',
    tagline: 'Chạy code Serverless không cần quản trị máy chủ.',
    description:
      'AWS Lambda tự động thực thi mã nguồn khi có sự kiện kích hoạt và quản lý toàn bộ tài nguyên tính toán bên dưới, giúp đội ngũ tập trung 100% vào logic nghiệp vụ.',
    pricingModel: 'Miễn phí 1 triệu request/tháng, trả tiền theo mili-giây thực thi',
    sla: '99.95% Uptime SLA',
    useCases: ['API Backend với API Gateway', 'Xử lý ảnh/video khi upload lên S3', 'Tác vụ tự động theo lịch (Cron)'],
    highlights: [
      'Không tốn phí khi hệ thống rảnh',
      'Tự động scale từ 0 lên hàng chục nghìn request/giây',
      'Hỗ trợ Node.js, Python, Go, Java, Rust'
    ]
  },
  {
    id: 's3',
    name: 'Amazon S3',
    shortName: 'S3',
    category: 'Storage',
    tagline: 'Lưu trữ đối tượng bền vững 11 số 9 với dung lượng không giới hạn.',
    description:
      'Amazon Simple Storage Service (S3) là kho lưu trữ đám mây tiêu chuẩn ngành cho dữ liệu web, sao lưu, hồ dữ liệu (Data Lake) và phân phối nội dung tĩnh.',
    pricingModel: 'Từ \$0.023 / GB / tháng (S3 Standard) + Free Tier 5GB',
    sla: '99.999999999% (11 số 9) độ bền dữ liệu',
    useCases: [
      'Lưu trữ media, video, tài liệu người dùng',
      'Host Static Website & React SPA',
      'Data Lake cho phân tích dữ liệu'
    ],
    highlights: [
      'S3 Intelligent-Tiering tự động tối ưu chi phí',
      'Mã hóa mặc định AES-256 & KMS',
      'Phân quyền chi tiết theo Bucket Policy'
    ]
  },
  {
    id: 'rds',
    name: 'Amazon RDS',
    shortName: 'RDS',
    category: 'Database',
    tagline: 'Cơ sở dữ liệu quan hệ được quản lý hoàn toàn, tự động backup.',
    description:
      'Amazon RDS giúp thiết lập, vận hành và mở rộng các hệ quản trị CSDL phổ biến như PostgreSQL, MySQL, MariaDB, SQL Server chỉ trong vài phút.',
    pricingModel: 'Trả theo giờ chạy instance + dung lượng lưu trữ thực tế',
    sla: '99.95% Multi-AZ SLA',
    useCases: ['Hệ thống thương mại điện tử & ERP', 'Ứng dụng SaaS đa khách hàng', 'Hệ thống tài chính cần ACID'],
    highlights: [
      'Multi-AZ tự động chuyển đổi dự phòng khi có sự cố',
      'Read Replicas tăng tốc độ đọc',
      'Tự động sao lưu & Point-in-Time Recovery'
    ]
  },
  {
    id: 'dynamodb',
    name: 'Amazon DynamoDB',
    shortName: 'DynamoDB',
    category: 'Database',
    tagline: 'CSDL NoSQL tốc độ dưới 10ms ở mọi quy mô.',
    description:
      'DynamoDB là cơ sở dữ liệu key-value và document phi máy chủ, duy trì độ trễ một chữ số mili-giây ngay cả khi xử lý hàng chục triệu request mỗi giây.',
    pricingModel: 'On-Demand theo lượt đọc/ghi hoặc Provisioned Capacity',
    sla: '99.999% với Global Tables',
    useCases: [
      'Giỏ hàng, phiên đăng nhập, bảng xếp hạng game',
      'Ứng dụng IoT & Streaming thời gian thực',
      'Serverless Backend'
    ],
    highlights: [
      'Tự động scale không downtime',
      'Global Tables đồng bộ đa vùng',
      'Tích hợp DynamoDB Streams cho event-driven'
    ]
  },
  {
    id: 'bedrock',
    name: 'Amazon Bedrock',
    shortName: 'Bedrock',
    category: 'AI / ML',
    tagline: 'Xây dựng ứng dụng Generative AI với các Foundation Models hàng đầu.',
    description:
      'Amazon Bedrock cung cấp API thống nhất để truy cập các mô hình nền tảng từ Anthropic Claude, Meta Llama, Amazon Nova... kèm tính năng RAG (Knowledge Bases) và Guardrails an toàn.',
    pricingModel: 'Trả theo token đầu vào/đầu ra, không phí duy trì GPU',
    sla: '99.9% API Availability',
    useCases: [
      'Chatbot chăm sóc khách hàng thông minh',
      'Tóm tắt tài liệu & tìm kiếm nội bộ (RAG)',
      'Tự động hóa quy trình bằng AI Agents'
    ],
    highlights: [
      'Dữ liệu doanh nghiệp không dùng để train model chung',
      'Knowledge Bases kết nối trực tiếp S3',
      'Guardrails lọc nội dung nhạy cảm'
    ]
  },
  {
    id: 'sagemaker',
    name: 'Amazon SageMaker',
    shortName: 'SageMaker',
    category: 'AI / ML',
    tagline: 'Nền tảng MLOps toàn diện để train và deploy mô hình Machine Learning.',
    description:
      'SageMaker cung cấp đầy đủ công cụ từ gán nhãn dữ liệu, notebook phát triển, huấn luyện phân tán đến triển khai endpoint dự đoán hiệu năng cao.',
    pricingModel: 'Trả theo thời gian sử dụng Studio, Training Job & Endpoint',
    sla: '99.95% Inference Endpoint SLA',
    useCases: [
      'Hệ thống gợi ý sản phẩm (Recommendation)',
      'Phát hiện gian lận giao dịch',
      'Dự báo nhu cầu chuỗi cung ứng'
    ],
    highlights: [
      'Managed Spot Training giảm tới 90% chi phí train',
      'Model Registry quản lý phiên bản mô hình',
      'Tích hợp CI/CD cho MLOps'
    ]
  },
  {
    id: 'cloudfront',
    name: 'Amazon CloudFront',
    shortName: 'CloudFront',
    category: 'Networking',
    tagline: 'Mạng phân phối nội dung (CDN) toàn cầu với độ trễ cực thấp.',
    description:
      'CloudFront tăng tốc phân phối website, API, video và ứng dụng đến người dùng cuối thông qua hơn 600 điểm biên (Edge Locations) trên toàn thế giới.',
    pricingModel: 'Miễn phí 1 TB Data Transfer Out mỗi tháng, trả theo lưu lượng',
    sla: '99.9% Uptime SLA',
    useCases: [
      'Tăng tốc tải React SPA & tài nguyên tĩnh từ S3',
      'Bảo vệ API chống DDoS cùng AWS Shield',
      'Phát trực tuyến video độ trễ thấp'
    ],
    highlights: [
      'Tích hợp miễn phí chứng chỉ SSL/TLS (ACM)',
      'Chống DDoS lớp 3/4 mặc định',
      'Edge Functions xử lý logic ngay tại biên'
    ]
  },
  {
    id: 'vpc',
    name: 'Amazon VPC',
    shortName: 'VPC',
    category: 'Networking',
    tagline: 'Mạng ảo riêng biệt, kiểm soát hoàn toàn bảo mật hạ tầng.',
    description:
      'Amazon Virtual Private Cloud (VPC) cho phép bạn khởi chạy tài nguyên AWS trong một mạng ảo tách biệt logic, tùy biến dải IP, subnet công khai/riêng tư và tường lửa.',
    pricingModel: 'Miễn phí tạo VPC (tính phí NAT Gateway / VPN nếu dùng)',
    sla: '99.99% Network Availability',
    useCases: [
      'Cô lập CSDL trong Private Subnet',
      'Kết nối an toàn từ văn phòng lên Cloud qua VPN',
      'Kiến trúc Multi-tier chuẩn bảo mật'
    ],
    highlights: [
      'Security Groups & Network ACL kiểm soát hai lớp',
      'VPC Flow Logs giám sát lưu lượng mạng',
      'PrivateLink kết nối dịch vụ không qua Internet'
    ]
  }
]

export const AWS_PLANS: AwsPlan[] = [
  {
    id: 'free-tier',
    name: 'AWS Free Tier',
    price: '0₫',
    period: '/ 12 tháng đầu',
    description: 'Lý tưởng cho sinh viên, lập trình viên và dự án thử nghiệm ý tưởng mới.',
    features: [
      '750 giờ/tháng máy chủ EC2 t2.micro / t3.micro',
      '5 GB lưu trữ Amazon S3 Standard',
      '1 triệu lượt gọi AWS Lambda miễn phí mãi mãi',
      '1 TB băng thông Amazon CloudFront mỗi tháng'
    ],
    ctaLabel: 'Bắt đầu miễn phí'
  },
  {
    id: 'growth',
    name: 'Startup & Growth',
    price: 'Từ \$149',
    period: '/ tháng (ước tính)',
    description: 'Gói kiến trúc chuẩn sản xuất cho Startup và doanh nghiệp SME đang tăng trưởng.',
    popular: true,
    features: [
      'Cụm EC2 / ECS Auto Scaling + Load Balancer',
      'Amazon RDS Multi-AZ tự động sao lưu hàng ngày',
      'CloudFront CDN + chứng chỉ SSL & AWS Shield',
      'Hỗ trợ thiết kế kiến trúc & tối ưu chi phí 1-1'
    ],
    ctaLabel: 'Nhận tư vấn gói này'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Cloud',
    price: 'Tùy chỉnh',
    period: 'Theo SLA doanh nghiệp',
    description: 'Dành cho tập đoàn cần hiệu năng cao, tuân thủ bảo mật nghiêm ngặt và AI riêng.',
    features: [
      'Kiến trúc Multi-Region độ sẵn sàng 99.99%',
      'Amazon Bedrock & SageMaker triển khai Private VPC',
      'Enterprise Support 24/7 phản hồi trong 15 phút',
      'Cam kết Savings Plans giảm tới 72% hóa đơn'
    ],
    ctaLabel: 'Liên hệ chuyên gia'
  }
]

export const AWS_FAQS: AwsFaq[] = [
  {
    id: 'faq-1',
    question: 'AWS Free Tier có thực sự miễn phí và có tự động trừ tiền không?',
    answer:
      'AWS Free Tier miễn phí trong giới hạn định mức (ví dụ 750 giờ EC2 micro/tháng trong 12 tháng đầu và nhiều dịch vụ Always Free như Lambda, DynamoDB). Bạn nên bật AWS Budgets để nhận cảnh báo email ngay khi chi phí vượt 0.01 USD.'
  },
  {
    id: 'faq-2',
    question: 'Doanh nghiệp tại Việt Nam nên chọn AWS Region nào để độ trễ thấp nhất?',
    answer:
      'Phần lớn hệ thống phục vụ người dùng Việt Nam chọn Region Singapore (ap-southeast-1) hoặc Hong Kong (ap-east-1) vì độ trễ mạng chỉ khoảng 25-40ms, kết hợp Amazon CloudFront Edge Locations đặt ngay tại Hà Nội và TP.HCM.'
  },
  {
    id: 'faq-3',
    question: 'Làm thế nào để tối ưu chi phí khi mới chuyển hạ tầng lên AWS?',
    answer:
      'Bạn có thể áp dụng 3 bước: dùng kiến trúc Serverless (Lambda, S3, CloudFront) cho các tác vụ không chạy 24/7, chọn chip AWS Graviton cho EC2/RDS để giảm ~20-40% chi phí, và đăng ký Savings Plans khi tải đã ổn định.'
  },
  {
    id: 'faq-4',
    question: 'Dữ liệu đưa lên Amazon Bedrock có bị dùng để huấn luyện lại AI công khai không?',
    answer:
      'Không. AWS cam kết dữ liệu prompt và dữ liệu Knowledge Bases của khách hàng không được lưu giữ bởi nhà cung cấp mô hình và không bao giờ dùng để train các mô hình nền tảng chung.'
  },
  {
    id: 'faq-5',
    question: 'Tôi có thể di chuyển ứng dụng React + Node.js/Java hiện tại lên AWS trong bao lâu?',
    answer:
      'Với Frontend (React/Vite), bạn chỉ mất khoảng 15 phút để deploy lên S3 + CloudFront hoặc AWS Amplify. Với Backend và Database, quá trình đóng gói Docker (ECS/App Runner) và kết nối RDS thường hoàn thành trong 1-3 ngày.'
  }
]

export const AWS_FOOTER_COLUMNS: AwsFooterColumn[] = [
  {
    id: 'col-services',
    title: 'Dịch vụ nổi bật',
    links: [
      { label: 'Amazon EC2 & Lambda', href: '#services' },
      { label: 'Amazon S3 & CloudFront', href: '#services' },
      { label: 'Amazon RDS & DynamoDB', href: '#services' },
      { label: 'Amazon Bedrock AI', href: '#services' }
    ]
  },
  {
    id: 'col-solutions',
    title: 'Giải pháp & Chi phí',
    links: [
      { label: 'AWS Free Tier', href: '#pricing' },
      { label: 'Kiến trúc Startup', href: '#pricing' },
      { label: 'Câu hỏi thường gặp', href: '#faq' },
      { label: 'Đăng ký tư vấn', href: '#contact' }
    ]
  },
  {
    id: 'col-resources',
    title: 'Tài nguyên & Hỗ trợ',
    links: [
      { label: 'Trung tâm kiến thức', href: '#faq' },
      { label: 'AWS Free Tier 12 tháng', href: '#top' },
      { label: 'Ước tính chi phí', href: '#contact' },
      { label: 'Region Singapore (AP-SE-1)', href: '#infrastructure' }
    ]
  }
]

export interface AwsCustomerStory {
  id: string
  industry: string
  company: string
  title: string
  summary: string
  impact: string
  imageSrc: string
  imageAlt: string
}

export const AWS_CUSTOMER_STORIES: AwsCustomerStory[] = [
  {
    id: 'nissan',
    industry: 'Công nghiệp ô tô',
    company: 'Nissan',
    title: 'AWS giúp Nissan tăng tốc đổi mới phần mềm xe kết nối',
    summary:
      'Nissan hợp nhất nền tảng dữ liệu xe điện trên Amazon EKS và S3, rút ngắn chu kỳ phát hành tính năng mới từ nhiều tháng xuống còn vài tuần.',
    impact: 'Giảm 40% thời gian đưa phần mềm mới lên xe kết nối toàn cầu',
    imageSrc: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Xe điện thông minh Nissan kết nối đám mây AWS'
  },
  {
    id: 'united',
    industry: 'Hàng không',
    company: 'United Airlines',
    title: 'Cách United sử dụng AI để vận hành hơn 5.000 chuyến bay mỗi ngày',
    summary:
      'Ứng dụng Amazon Bedrock và SageMaker để dự báo thời tiết, tối ưu điều phối phi hành đoàn và hỗ trợ hành khách theo thời gian thực.',
    impact: 'Xử lý hàng triệu sự kiện vận hành mỗi giờ với độ trễ dưới 50ms',
    imageSrc: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Máy bay thương mại United Airlines vận hành dữ liệu trên AWS'
  },
  {
    id: 'bayer',
    industry: 'Khoa học đời sống',
    company: 'Bayer',
    title: 'Giải quyết bài toán nghiên cứu nông nghiệp bằng dữ liệu lớn',
    summary:
      'Bayer xây dựng hồ dữ liệu phân tích gen và khí hậu trên AWS, giúp các nhà khoa học mô phỏng hàng triệu kịch bản giống cây trồng.',
    impact: 'Tăng tốc 10x quy trình phân tích dữ liệu nghiên cứu R&D',
    imageSrc: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Phòng thí nghiệm nghiên cứu khoa học đời sống Bayer'
  },
  {
    id: 'tui',
    industry: 'Du lịch & Dịch vụ',
    company: 'TUI Group',
    title: 'Hợp nhất hơn 85 ứng dụng chăm sóc khách hàng trên AWS',
    summary:
      'Chuyển đổi toàn bộ tổng đài và hệ thống đặt chỗ sang kiến trúc Serverless (Lambda + DynamoDB), sẵn sàng mở rộng mùa cao điểm.',
    impact: '99.99% độ sẵn sàng trong các đợt cao điểm đặt vé toàn châu Âu',
    imageSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Điểm đến du lịch và hệ thống đặt chỗ TUI Group'
  },
  {
    id: 'vn-fintech',
    industry: 'Tài chính số Việt Nam',
    company: 'Fintech & Thương mại điện tử',
    title: 'Mở rộng hạ tầng thanh toán tại Việt Nam qua Region Singapore',
    summary:
      'Kết hợp Amazon EKS Multi-AZ, RDS PostgreSQL và CloudFront Edge tại Hà Nội & TP.HCM để đạt độ trễ thấp và tuân thủ bảo mật.',
    impact: 'Độ trễ ~28ms từ Việt Nam và tiết kiệm 35% chi phí với Graviton',
    imageSrc: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Thành phố Hồ Chí Minh trung tâm công nghệ tài chính Việt Nam'
  }
]

export interface AwsRegionItem {
  code: string
  name: string
  azCount: number
  latencyNote: string
}

export interface AwsContinentGroup {
  id: string
  name: string
  lat: number
  lon: number
  regions: AwsRegionItem[]
}

export const AWS_GLOBAL_REGIONS: AwsContinentGroup[] = [
  {
    id: 'apac',
    name: 'Châu Á Thái Bình Dương',
    lat: 12,
    lon: 105,
    regions: [
      {
        code: 'ap-southeast-1',
        name: 'Châu Á Thái Bình Dương (Singapore)',
        azCount: 3,
        latencyNote: '~28ms từ Việt Nam'
      },
      { code: 'ap-east-1', name: 'Châu Á Thái Bình Dương (Hồng Kông)', azCount: 3, latencyNote: '~32ms từ Việt Nam' },
      {
        code: 'ap-southeast-5',
        name: 'Châu Á Thái Bình Dương (Malaysia)',
        azCount: 3,
        latencyNote: '~35ms từ Việt Nam'
      },
      { code: 'ap-northeast-1', name: 'Châu Á Thái Bình Dương (Tokyo)', azCount: 4, latencyNote: '~68ms từ Việt Nam' },
      { code: 'ap-northeast-2', name: 'Châu Á Thái Bình Dương (Seoul)', azCount: 4, latencyNote: '~65ms từ Việt Nam' },
      { code: 'ap-south-1', name: 'Châu Á Thái Bình Dương (Mumbai)', azCount: 3, latencyNote: '~82ms từ Việt Nam' }
    ]
  },
  {
    id: 'na',
    name: 'Bắc Mỹ',
    lat: 39,
    lon: -95,
    regions: [
      {
        code: 'us-east-1',
        name: 'Miền Đông Hoa Kỳ (Bắc Virginia)',
        azCount: 6,
        latencyNote: 'Region lớn nhất thế giới'
      },
      { code: 'us-east-2', name: 'Miền Đông Hoa Kỳ (Ohio)', azCount: 3, latencyNote: 'Tối ưu chi phí US' },
      { code: 'us-west-2', name: 'Miền Tây Hoa Kỳ (Oregon)', azCount: 4, latencyNote: 'Trung tâm AI & Bedrock' },
      { code: 'ca-central-1', name: 'Canada (Miền Trung)', azCount: 3, latencyNote: 'Tuân thủ dữ liệu Canada' },
      { code: 'mx-central-1', name: 'Mexico (Miền Trung)', azCount: 3, latencyNote: 'Phục vụ Trung Mỹ' }
    ]
  },
  {
    id: 'eu',
    name: 'Châu Âu',
    lat: 50,
    lon: 10,
    regions: [
      { code: 'eu-west-1', name: 'Châu Âu (Ireland)', azCount: 3, latencyNote: 'Tuân thủ GDPR' },
      { code: 'eu-central-1', name: 'Châu Âu (Frankfurt)', azCount: 3, latencyNote: 'Tài chính & Công nghiệp EU' },
      { code: 'eu-west-2', name: 'Châu Âu (London)', azCount: 3, latencyNote: 'Thị trường Anh Quốc' },
      { code: 'eu-north-1', name: 'Châu Âu (Stockholm)', azCount: 3, latencyNote: '100% năng lượng tái tạo' }
    ]
  },
  {
    id: 'sa',
    name: 'Nam Mỹ',
    lat: -18,
    lon: -55,
    regions: [{ code: 'sa-east-1', name: 'Nam Mỹ (São Paulo)', azCount: 3, latencyNote: 'Trục kết nối Mỹ Latinh' }]
  },
  {
    id: 'me',
    name: 'Trung Đông',
    lat: 25,
    lon: 51,
    regions: [
      { code: 'me-south-1', name: 'Trung Đông (Bahrain)', azCount: 3, latencyNote: 'Phục vụ vùng Vịnh' },
      { code: 'me-central-1', name: 'Trung Đông (UAE)', azCount: 3, latencyNote: 'Độ trễ thấp khu vực GCC' }
    ]
  },
  {
    id: 'af',
    name: 'Châu Phi',
    lat: -25,
    lon: 24,
    regions: [{ code: 'af-south-1', name: 'Châu Phi (Cape Town)', azCount: 3, latencyNote: 'Hạ tầng Nam Phi' }]
  },
  {
    id: 'oceania',
    name: 'Úc & New Zealand',
    lat: -28,
    lon: 145,
    regions: [
      { code: 'ap-southeast-2', name: 'Châu Á Thái Bình Dương (Sydney)', azCount: 3, latencyNote: 'Thị trường Úc' },
      { code: 'ap-southeast-4', name: 'Châu Á Thái Bình Dương (Melbourne)', azCount: 3, latencyNote: 'Multi-Region Úc' }
    ]
  }
]
