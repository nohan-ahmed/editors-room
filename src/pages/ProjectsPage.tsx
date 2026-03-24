import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink, Filter, X, Loader2 } from 'lucide-react';
import { api, Project as SupabaseProject } from '../services/api';
import { MaskedHeading } from '../components/AnimatedHeading';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
}

const ProjectGridCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        {/* Skeleton Loader */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/5 animate-pulse z-10"
            />
          )}
        </AnimatePresence>

        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black scale-50 group-hover:scale-100 transition-transform duration-500">
            <ExternalLink size={20} />
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest text-white font-bold">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-display font-medium text-white tracking-tight group-hover:text-brand transition-colors">
            {project.title}
          </h3>
          <span className="text-zinc-500 font-mono text-xs">{project.year}</span>
        </div>
        
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-6">
          {project.description}
        </p>

        <div className="flex items-center gap-3 text-white font-bold text-xs uppercase tracking-widest group/btn">
          <span>View Project</span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/btn:border-brand group-hover/btn:bg-brand transition-all">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const LIMIT = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInitialData = async () => {
      try {
        const cats = await api.projects.getCategories();
        setCategories(['All', ...cats]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      try {
        const { data, count } = await api.projects.getPaginated(page, LIMIT, selectedCategory);
        
        const formattedProjects: Project[] = data.map(p => ({
          id: p.display_id,
          title: p.title,
          category: p.category,
          image: p.image_url,
          year: p.year,
          description: p.description
        }));

        setProjects(prev => page === 1 ? formattedProjects : [...prev, ...formattedProjects]);
        setHasMore((page * LIMIT) < count);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchProjects();
  }, [page, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    setSelectedCategory(category);
    setPage(1);
    setProjects([]);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-8">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center px-6 py-3 rounded-2xl glass-nav shadow-2xl">
            <Link to="/">
              <Logo />
            </Link>
            <Link 
              to="/" 
              className="text-sm font-medium text-zinc-400 hover:text-white transition-all hover:tracking-widest"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-48 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <span className="text-zinc-400 font-medium tracking-widest uppercase text-[10px]">
                Portfolio
              </span>
            </motion.div>
            
            <MaskedHeading className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tight leading-[0.85] text-white mb-12">
              Our complete <br />
              <span className="italic font-light text-zinc-500">collection</span>.
            </MaskedHeading>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mt-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                    selectedCategory === category 
                      ? 'bg-brand border-brand text-white shadow-[0_0_20px_rgba(255,77,0,0.3)]' 
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] bg-white/5 rounded-3xl animate-pulse" />
                ))
              ) : (
                projects.map((project, index) => (
                  <ProjectGridCard key={project.id} project={project} index={index} />
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-20 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More Projects</span>
                )}
              </motion.button>
            </div>
          )}

          {!isLoading && projects.length === 0 && (
            <div className="text-center py-32">
              <p className="text-zinc-500 text-xl font-display">No projects found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Logo className="justify-center mb-8" />
          <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
            © 2025 Pumpkin Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;
