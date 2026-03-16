import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight,
  Briefcase,
  Star,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useDashboardStats } from '../../hooks/useAdminData';

const data = [
  { name: 'Mon', views: 4000, interactions: 2400 },
  { name: 'Tue', views: 3000, interactions: 1398 },
  { name: 'Wed', views: 2000, interactions: 9800 },
  { name: 'Thu', views: 2780, interactions: 3908 },
  { name: 'Fri', views: 1890, interactions: 4800 },
  { name: 'Sat', views: 2390, interactions: 3800 },
  { name: 'Sun', views: 3490, interactions: 4300 },
];

const categoryData = [
  { name: 'Digital', value: 45, color: '#ff4d00' },
  { name: 'Brand', value: 30, color: '#ff7a40' },
  { name: 'App', value: 25, color: '#ff9c73' },
];

const StatCard = ({ title, value, change, icon: Icon, trend, isLoading }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand/20 transition-all group cursor-pointer"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}%
      </div>
    </div>
    <p className="text-zinc-500 text-sm font-medium mb-1">{title}</p>
    {isLoading ? (
      <Loader2 className="animate-spin text-brand" size={24} />
    ) : (
      <h3 className="text-3xl font-display font-bold tracking-tight">{value}</h3>
    )}
  </motion.div>
);

const DashboardHome: React.FC = () => {
  const { stats, recentActivity, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6 sm:space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-2">Overview</h1>
        <p className="text-zinc-500 text-sm sm:text-base">Welcome back, here's what's happening with your agency today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard title="Total Projects" value={stats.projects} change="12.5" icon={Briefcase} trend="up" isLoading={isLoading} />
        <StatCard title="Featured Projects" value={stats.featuredProjects} change="2.4" icon={TrendingUp} trend="up" isLoading={isLoading} />
        <StatCard title="Team Members" value={stats.team} change="0" icon={Users} trend="up" isLoading={isLoading} />
        <StatCard title="Testimonials" value={stats.testimonials} change="0.2" icon={MessageSquare} trend="up" isLoading={isLoading} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white/[0.02] border border-white/5"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">Performance Analytics</h3>
              <p className="text-xs sm:text-sm text-zinc-500">Weekly traffic and engagement metrics</p>
            </div>
            <select className="w-full sm:w-auto bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-brand/50">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          <div className="h-[250px] sm:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4d00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#ff4d00' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#ff4d00" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-1">Project Distribution</h3>
          <p className="text-xs sm:text-sm text-zinc-500 mb-8">By category</p>

          <div className="flex-1 h-[200px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#fff', fontSize: 10, fontWeight: 'bold' }}
                  width={50}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-6 sm:mt-8">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs sm:text-sm text-zinc-400">{item.name}</span>
                </div>
                <span className="text-xs sm:text-sm font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <div className="p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white/[0.02] border border-white/5">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold">Recent Projects</h3>
            <button className="text-brand text-xs sm:text-sm font-bold hover:underline cursor-pointer">View All</button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="animate-spin text-brand" size={32} />
              </div>
            ) : recentActivity.recentProjects.length === 0 ? (
              <p className="text-zinc-500 text-center py-10 text-sm">No projects yet.</p>
            ) : (
              recentActivity.recentProjects.map((project) => (
                <div key={project.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="w-10 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-zinc-800 overflow-hidden shrink-0">
                    <img src={project.image_url || `https://picsum.photos/seed/${project.id}/100/100`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base truncate">{project.title}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest truncate">{project.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs sm:text-sm font-bold">Active</p>
                    <p className="text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
                      {new Date(project.created_at || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-5 sm:p-8 rounded-[32px] sm:rounded-[40px] bg-white/[0.02] border border-white/5">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold">New Testimonials</h3>
            <button className="text-brand text-xs sm:text-sm font-bold hover:underline cursor-pointer">View All</button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="animate-spin text-brand" size={32} />
              </div>
            ) : recentActivity.recentTestimonials.length === 0 ? (
              <p className="text-zinc-500 text-center py-10 text-sm">No testimonials yet.</p>
            ) : (
              recentActivity.recentTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-white/5 transition-all cursor-pointer">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-800 overflow-hidden shrink-0">
                    <img src={testimonial.avatar_url || `https://i.pravatar.cc/150?u=${testimonial.id}`} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm sm:text-base truncate">{testimonial.name}</h4>
                    <p className="text-[10px] sm:text-xs text-zinc-400 line-clamp-1 italic">"{testimonial.content}"</p>
                  </div>
                  <div className="flex gap-0.5 shrink-0">
                    {[...Array(testimonial.rating)].map((_, s) => (
                      <Star key={s} size={8} className="fill-brand text-brand" />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
