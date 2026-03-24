import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  Loader2,
  Target,
  Palette,
  Code,
  Sparkles,
  Globe,
  Zap,
  Smartphone,
  Layers,
  Cpu,
  BarChart,
  Shield,
  Search as SearchIcon,
  Terminal,
  MousePointer2,
  PenTool,
  Video,
  Database,
  Cloud,
  Binary,
  Workflow,
  GitBranch,
  Server,
  Rocket,
  Flame,
  Activity,
  Film,
  Aperture,
  Monitor,
  Play,
  Scissors,
  Wand2,
  Image,
  Clapperboard,
  Camera,
  Lock,
  Key,
  Fingerprint,
  Scan,
  Briefcase,
  TrendingUp,
  PieChart,
  Building2,
  Users,
  Megaphone,
  Share2,
  Mail,
  MessageSquare,
  Hash,
  Wifi,
  Network,
  HardDrive,
  Link,
  Mic,
  Headphones,
  Music,
  Radio,
  Clock,
  Calendar,
  LucideIcon
} from 'lucide-react';
import { api, Service } from '../../services/api';
import { useServices } from '../../hooks/useAdminData';
import { cn } from '../../lib/utils';

const ICON_OPTIONS: { name: string; icon: LucideIcon }[] = [
  { name: 'Target', icon: Target },
  { name: 'Palette', icon: Palette },
  { name: 'Code', icon: Code },
  { name: 'Sparkles', icon: Sparkles },
  { name: 'Globe', icon: Globe },
  { name: 'Zap', icon: Zap },
  { name: 'Smartphone', icon: Smartphone },
  { name: 'BarChart', icon: BarChart },
  { name: 'Shield', icon: Shield },
  { name: 'Layers', icon: Layers },
  { name: 'Cpu', icon: Cpu },
  { name: 'Search', icon: SearchIcon },
  { name: 'PenTool', icon: PenTool },
  { name: 'Video', icon: Video },
  { name: 'Terminal', icon: Terminal },
  { name: 'MousePointer2', icon: MousePointer2 },
  { name: 'Database', icon: Database },
  { name: 'Cloud', icon: Cloud },
  { name: 'Binary', icon: Binary },
  { name: 'Workflow', icon: Workflow },
  { name: 'GitBranch', icon: GitBranch },
  { name: 'Server', icon: Server },
  { name: 'Rocket', icon: Rocket },
  { name: 'Flame', icon: Flame },
  { name: 'Activity', icon: Activity },
  { name: 'Film', icon: Film },
  { name: 'Aperture', icon: Aperture },
  { name: 'Monitor', icon: Monitor },
  { name: 'Play', icon: Play },
  { name: 'Scissors', icon: Scissors },
  { name: 'Wand2', icon: Wand2 },
  { name: 'Image', icon: Image },
  { name: 'Clapperboard', icon: Clapperboard },
  { name: 'Camera', icon: Camera },
  // Cyber & Security
  { name: 'Lock', icon: Lock },
  { name: 'Key', icon: Key },
  { name: 'Fingerprint', icon: Fingerprint },
  { name: 'Scan', icon: Scan },
  // Business & Strategy
  { name: 'Briefcase', icon: Briefcase },
  { name: 'TrendingUp', icon: TrendingUp },
  { name: 'PieChart', icon: PieChart },
  { name: 'Building2', icon: Building2 },
  { name: 'Users', icon: Users },
  // Marketing & Communication
  { name: 'Megaphone', icon: Megaphone },
  { name: 'Share2', icon: Share2 },
  { name: 'Mail', icon: Mail },
  { name: 'MessageSquare', icon: MessageSquare },
  { name: 'Hash', icon: Hash },
  // IT & Networking
  { name: 'Wifi', icon: Wifi },
  { name: 'Network', icon: Network },
  { name: 'HardDrive', icon: HardDrive },
  { name: 'Link', icon: Link },
  // Media & Audio
  { name: 'Mic', icon: Mic },
  { name: 'Headphones', icon: Headphones },
  { name: 'Music', icon: Music },
  { name: 'Radio', icon: Radio },
  // Utility
  { name: 'Clock', icon: Clock },
  { name: 'Calendar', icon: Calendar },
];

const ManageServices: React.FC = () => {
  const { services, isLoading, refresh: fetchServices } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'Target',
    sort_order: 0
  });

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon_name: service.icon_name,
      sort_order: service.sort_order
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.services.delete(id);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingService) {
        await api.services.update(editingService.id, formData);
      } else {
        await api.services.create(formData);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (name: string) => {
    const option = ICON_OPTIONS.find(o => o.name === name);
    return option ? option.icon : Target;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-display font-bold tracking-tight mb-1 sm:mb-2">Services</h1>
          <p className="text-sm sm:text-base text-zinc-500">Manage the core capabilities of your agency.</p>
        </div>
        <button 
          onClick={() => {
            setEditingService(null);
            setFormData({
              title: '',
              description: '',
              icon_name: 'Target',
              sort_order: services.length
            });
            setIsModalOpen(true);
          }}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand text-white rounded-xl sm:rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 text-sm sm:text-base cursor-pointer"
        >
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
        <input 
          type="text" 
          placeholder="Search services..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 pl-12 pr-4 focus:border-brand/50 transition-all outline-none text-sm sm:text-base"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-brand" size={40} />
            <p className="text-zinc-500">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full py-20 text-center text-zinc-500">No services found.</div>
        ) : (
          filteredServices.map((service) => {
            const Icon = getIcon(service.icon_name);
            return (
              <motion.div 
                layout
                key={service.id}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                className="p-5 sm:p-6 rounded-[24px] sm:rounded-[32px] bg-white/[0.02] border border-white/5 hover:border-brand/20 transition-all group relative overflow-hidden cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold truncate">{service.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 line-clamp-3 mb-6">{service.description}</p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(service)}
                    className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-red-400/5 text-red-400 hover:text-white hover:bg-red-400 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-[24px] sm:rounded-[40px] shadow-2xl overflow-hidden">
              <div className="p-5 sm:p-8 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-display font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white cursor-pointer"><X className="w-5 h-5 sm:w-6 sm:h-6" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500">Service Title</label>
                  <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g. Strategic Vision" className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-4 focus:border-brand/50 outline-none transition-all text-sm sm:text-base" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the service..." className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-4 focus:border-brand/50 outline-none transition-all resize-none text-sm sm:text-base" />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500">Select Icon</label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 max-h-48 overflow-y-auto p-4 bg-white/5 rounded-2xl border border-white/10 custom-scrollbar">
                    {ICON_OPTIONS.map((option) => (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon_name: option.name })}
                        className={cn(
                          "aspect-square flex items-center justify-center rounded-xl transition-all hover:bg-white/10 cursor-pointer",
                          formData.icon_name === option.name ? "bg-brand text-white shadow-lg shadow-brand/20" : "text-zinc-500"
                        )}
                        title={option.name}
                      >
                        <option.icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-500">Sort Order</label>
                  <input type="number" value={formData.sort_order} onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-4 focus:border-brand/50 outline-none transition-all text-sm sm:text-base" />
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10 transition-all text-sm sm:text-base order-2 sm:order-1 cursor-pointer">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-brand text-white font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 text-sm sm:text-base order-1 sm:order-2 cursor-pointer disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={20} /> : (editingService ? 'Update Service' : 'Create Service')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageServices;
