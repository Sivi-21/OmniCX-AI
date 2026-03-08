
export enum Channel {
  EMAIL = 'Email',
  CHAT = 'Chat',
  WEB_FORM = 'Web Form',
  TWITTER = 'Twitter'
}

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent'
}

export enum Status {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved'
}

export enum Category {
  BILLING = 'Billing',
  TECHNICAL = 'Technical Support',
  ACCOUNT = 'Account Access',
  FEEDBACK = 'General Feedback',
  SALES = 'Sales Inquiry'
}

export enum Language {
  ENGLISH = 'en',
  SPANISH = 'es',
  FRENCH = 'fr',
  GERMAN = 'de',
  JAPANESE = 'ja'
}

export type Sentiment = 'Positive' | 'Neutral' | 'Frustrated' | 'Critical';

export interface TicketHistory {
  id: string;
  action: string;
  timestamp: string;
  user: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  totalTickets: number;
  healthScore: number; // 0-100
  lifetimeValue: string;
  lastInteraction: string;
  tags: string[];
}

export interface Activity {
  id: string;
  type: 'ticket_created' | 'ticket_updated' | 'reply_sent' | 'sla_breach';
  message: string;
  timestamp: string;
  user?: string;
  ticketId?: string;
}

export interface Ticket {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  channel: Channel;
  category: Category;
  priority: Priority;
  status: Status;
  subject: string;
  message: string;
  originalLanguage?: Language;
  translatedMessage?: string;
  tags: string[];
  suggestedResponse?: string;
  sentiment?: Sentiment;
  slaDeadline: string;
  history: TicketHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsData {
  totalTickets: number;
  statusDistribution: { name: string; value: number }[];
  channelDistribution: { name: string; value: number }[];
  priorityDistribution: { name: string; value: number }[];
  sentimentDistribution: { name: string; value: number }[];
}
