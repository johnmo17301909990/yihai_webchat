export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Factor {
  title: string;
  description: string;
  prompt: string;
  color: string;
}

export type Factors = {
  [key: string]: Factor;
}