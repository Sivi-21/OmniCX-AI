
import { Category, Priority, Channel, Status, Customer, Language } from './types';

export const RULE_TAGS: Record<string, string[]> = {
  'refund': ['Billing', 'High Priority'],
  'invoice': ['Billing'],
  'payment': ['Billing'],
  'broken': ['Technical', 'Urgent'],
  'password': ['Security', 'Account'],
  'login': ['Account'],
  'help': ['Support'],
  'error': ['Technical'],
  'buy': ['Sales'],
  'pricing': ['Sales'],
  'slow': ['Performance']
};

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'C-001',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://picsum.photos/seed/john/100/100',
    totalTickets: 12,
    healthScore: 85,
    lifetimeValue: '$1,200',
    lastInteraction: new Date(Date.now() - 86400000).toISOString(),
    tags: ['VIP', 'Early Adopter']
  },
  {
    id: 'C-002',
    name: 'Jane Smith',
    email: 'jane@acme.co',
    avatar: 'https://picsum.photos/seed/jane/100/100',
    totalTickets: 4,
    healthScore: 42,
    lifetimeValue: '$450',
    lastInteraction: new Date(Date.now() - 3600000).toISOString(),
    tags: ['At Risk', 'Enterprise']
  }
];

export const KNOWLEDGE_BASE = [
  {
    id: 'KB-001',
    title: 'How to process a refund',
    content: 'To process a refund, navigate to the billing dashboard, find the transaction, and click "Issue Refund". Refunds typically take 3-5 business days to appear on the customer statement.',
    keywords: ['refund', 'billing', 'money']
  },
  {
    id: 'KB-002',
    title: 'Troubleshooting login issues',
    content: 'If a customer cannot login, first verify their email is correct. Then, suggest clearing browser cache or resetting their password via the "Forgot Password" link.',
    keywords: ['login', 'password', 'access', '500 error']
  },
  {
    id: 'KB-003',
    title: 'Enterprise API rate limits',
    content: 'Enterprise customers have a rate limit of 10,000 requests per minute. If they exceed this, they will receive a 429 status code.',
    keywords: ['api', 'rate limit', 'performance', 'enterprise']
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'T-1001',
    customerId: 'C-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    channel: Channel.EMAIL,
    category: Category.BILLING,
    priority: Priority.HIGH,
    status: Status.OPEN,
    subject: 'Refund request for duplicate charge',
    message: 'Hi, I was charged twice for my subscription this month. Can you please refund the extra payment?',
    originalLanguage: Language.ENGLISH,
    tags: ['Billing', 'Refund'],
    slaDeadline: new Date(Date.now() + 14400000).toISOString(), // 4 hours from now
    history: [
      { id: 'H-1', action: 'Ticket created', timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'System' }
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'T-1002',
    customerId: 'C-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@acme.co',
    channel: Channel.CHAT,
    category: Category.TECHNICAL,
    priority: Priority.URGENT,
    status: Status.IN_PROGRESS,
    subject: 'Cannot login to dashboard',
    message: 'I am getting a 500 error every time I try to access my project dashboard. This is critical for our team.',
    originalLanguage: Language.ENGLISH,
    tags: ['Technical', 'Urgent'],
    slaDeadline: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    history: [
      { id: 'H-2', action: 'Ticket created', timestamp: new Date(Date.now() - 7200000).toISOString(), user: 'System' },
      { id: 'H-3', action: 'Assigned to SIVAGAMI R', timestamp: new Date(Date.now() - 1200000).toISOString(), user: 'System' }
    ],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 1200000).toISOString(),
  }
];
