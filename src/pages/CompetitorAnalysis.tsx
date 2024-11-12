import React, { useState, FormEvent } from 'react';
import { Plus, Trash2, Info } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  website: string;
}

export default function CompetitorAnalysis() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [newCompetitor, setNewCompetitor] = useState({ name: '', website: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (competitors.length >= 5) {
      setError('最多只能添加5个竞争对手');
      return;
    }

    if (!newCompetitor.name.trim()) {
      setError('请输入竞争对手名称');
      return;
    }

    // Validate URL format if provided
    if (newCompetitor.website && !isValidUrl(newCompetitor.website)) {
      setError('请输入有效的网址，格式如: https://www.example.com');
      return;
    }

    setCompetitors([
      ...competitors,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: newCompetitor.name.trim(),
        website: newCompetitor.website.trim(),
      },
    ]);
    setNewCompetitor({ name: '', website: '' });
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter((c) => c.id !== id));
  };

  const isValidUrl = (url: string) => {
    if (!url) return true; // Allow empty website
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">竞争对手分析</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="竞争对手名称"
              value={newCompetitor.name}
              onChange={(e) => setNewCompetitor({ ...newCompetitor, name: e.target.value })}
              className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                type="url"
                placeholder="官网地址 (选填)"
                value={newCompetitor.website}
                onChange={(e) => setNewCompetitor({ ...newCompetitor, website: e.target.value })}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full pr-8"
              />
              <div className="absolute inset-y-0 right-2 flex items-center">
                <div className="group relative">
                  <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg">
                    请输入完整的网址，包含 http:// 或 https://
                    <br />
                    例如: https://www.example.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={competitors.length >= 5}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-5 w-5 mr-2" />
            添加竞争对手 ({competitors.length}/5)
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {competitors.map((competitor) => (
            <div
              key={competitor.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="space-y-1">
                <h3 className="font-medium">{competitor.name}</h3>
                {competitor.website && (
                  <a
                    href={competitor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    {competitor.website}
                  </a>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeCompetitor(competitor.id)}
                className="text-red-500 hover:text-red-600 focus:outline-none"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}

          {competitors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              暂无竞争对手信息，请添加竞争对手
            </div>
          )}
        </div>
      </div>
    </div>
  );
}