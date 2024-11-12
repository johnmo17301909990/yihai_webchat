import { Factors } from '../types';

export const factors: Factors = {
  political: {
    title: '政治因素',
    description: '政府政策、法规和政治稳定性',
    prompt: '请分析该行业的政治因素，包括政府政策、法规、政治稳定性和法律框架。请详细说明当前趋势、潜在影响和未来发展。',
    color: 'bg-blue-500'
  },
  economic: {
    title: '经济因素',
    description: '经济增长、利率、通货膨胀和汇率',
    prompt: '请分析该行业的经济因素，包括经济增长、利率、通货膨胀、汇率和经济政策。请详细说明当前趋势、潜在影响和未来发展。',
    color: 'bg-green-500'
  },
  social: {
    title: '社会因素',
    description: '人口统计、文化趋势和社会态度',
    prompt: '请分析该行业的社会因素，包括人口统计、文化趋势、生活方式变化和消费者行为。请详细说明当前趋势、潜在影响和未来发展。',
    color: 'bg-yellow-500'
  },
  technological: {
    title: '技术因素',
    description: '创新、自动化和技术变革',
    prompt: '请分析该行业的技术因素，包括创新、研发、自动化和技术颠覆。请详细说明当前趋势、潜在影响和未来发展。',
    color: 'bg-purple-500'
  }
};