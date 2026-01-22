/**
 * WeatherChart 컴포넌트
 * 24시간 영역 차트
 * 참고: docs/architecture.md 939-1009줄
 */

'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import type { PriceHistory, WeatherTrend } from '@/types';

interface WeatherChartProps {
  history: PriceHistory[];
  trend: WeatherTrend;
}

export function WeatherChart({ history, trend }: WeatherChartProps) {
  // 상태별 색상
  const colors = {
    rising: { stroke: '#FF6B6B', fill: '#FFE9E9', gradient1: '#FF6B6B', gradient2: '#FFE9E9' },
    falling: { stroke: '#74C0FC', fill: '#E7F5FF', gradient1: '#74C0FC', gradient2: '#E7F5FF' },
    stable: { stroke: '#ADB5BD', fill: '#F1F3F5', gradient1: '#ADB5BD', gradient2: '#F1F3F5' },
  };

  const color = colors[trend];

  // 데이터 포맷 (최근 24개 포인트)
  const data = history.slice(-24).map(h => ({
    time: format(new Date(h.timestamp), 'HH:mm'),
    price: h.price,
  }));

  return (
    <div className="w-full h-64 bg-white rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`color-${trend}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color.gradient1} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color.gradient1} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 12, fill: '#6C757D' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6C757D' }}
            domain={['dataMin - 100', 'dataMax + 100']}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#2C3E50', fontWeight: 'bold' }}
            itemStyle={{ color: color.stroke }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color.stroke}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#color-${trend})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
