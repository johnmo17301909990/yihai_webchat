import { Message } from '../types';

const API_KEY = 'app-nBlsfe1xnVFHsS9mHFUnNyQo';

export interface ChatResponse {
  event: string;
  answer?: string;
  message?: string;
  error?: string;
}

export class ApiService {
  private static instance: ApiService;
  private baseUrl = 'http://116.62.185.169:9000/v1';

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    };
  }

  public async streamChat(
    prompt: string,
    onMessage: (content: string) => void,
    onError: (error: string) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/chat-messages`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          query: prompt,
          response_mode: 'streaming',
          user: 'user-' + Math.random().toString(36).substr(2, 9),
          inputs: {}
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6)) as ChatResponse;
                if (data.event === 'message') {
                  assistantMessage += data.answer || '';
                  onMessage(assistantMessage);
                } else if (data.event === 'error') {
                  onError(data.message || '未知错误');
                }
              } catch (e) {
                console.error('Error parsing JSON:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : '请求失败');
    }
  }
}