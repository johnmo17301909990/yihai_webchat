import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, Box, PieChart, Users } from 'lucide-react';

const navigation = [
  { name: 'PEST分析', href: '/pest', icon: BarChart2 },
  { name: '波特五力分析', href: '/porter', icon: Box },
  { name: 'SWOT分析', href: '/swot', icon: PieChart },
  { name: '竞争对手分析', href: '/competitors', icon: Users },
];

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">商业分析助手</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        isActive
                          ? 'border-b-2 border-blue-500 text-gray-900'
                          : 'text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}