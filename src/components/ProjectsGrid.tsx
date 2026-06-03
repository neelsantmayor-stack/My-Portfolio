import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, AlertTriangle, RefreshCw, Folder, Code2, Search, X } from 'lucide-react';
import { Project, PortfolioData } from '../types';
import { ACCENT_COLORS, FALLBACK_PROJECTS } from '../data';

interface ProjectsGridProps {
  data: PortfolioData;
}

export default function ProjectsGrid({ data }: ProjectsGridProps) {
  const [repos, setRepos] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const baseAccent = ACCENT_COLORS[data.accentColor];

  const fetchRepositories = async (username: string) => {
    setIsLoading(true);
    setUsingFallback(false);
    setErrorInfo(null);

    try {
      // Fetch up to 100 repositories to make sure we fetch ALL projects!
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Displaying curated offline showcase instead.");
        }
        if (response.status === 404) {
          throw new Error(`GitHub user "${username}" not found. Displaying curated offline showcase instead.`);
        }
        throw new Error(`Error ${response.status}: Failed to fetch repos.`);
      }

      const rawRepos = await response.json();
      
      if (!Array.isArray(rawRepos)) {
        throw new Error("Received invalid payload from GitHub.");
      }

      // Filter out forks
      const originalRepos = rawRepos.filter((repo: any) => !repo.fork);
      
      // Map to consistent Project structure
      const mappedRepos: Project[] = originalRepos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        topics: repo.topics || []
      }));

      const AUTHORIZED_NAMES = ["geminisuite", "primeclone", "groovegarden", "digitalflow", "aigallery"];
      const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]/g, '');

      // Merge live fetched repositories and curated showcase items, avoiding duplicate items by normalizing names
      const merged: Project[] = [...mappedRepos];
      FALLBACK_PROJECTS.forEach(fallbackProj => {
        const alreadyExists = merged.some(m => normalize(m.name) === normalize(fallbackProj.name));
        if (!alreadyExists) {
          merged.push(fallbackProj);
        } else {
          // Enrich or override live repository details with custom specified attributes
          const existingIndex = merged.findIndex(m => normalize(m.name) === normalize(fallbackProj.name));
          if (existingIndex !== -1) {
            if (fallbackProj.homepage) {
              merged[existingIndex].homepage = fallbackProj.homepage;
            }
            if (fallbackProj.html_url) {
              merged[existingIndex].html_url = fallbackProj.html_url;
            }
            if (!merged[existingIndex].description && fallbackProj.description) {
              merged[existingIndex].description = fallbackProj.description;
            }
            if ((!merged[existingIndex].topics || merged[existingIndex].topics.length === 0) && fallbackProj.topics) {
              merged[existingIndex].topics = fallbackProj.topics;
            }
          }
        }
      });

      // Filter to keep ONLY authorized projects and sort them
      const finalProjects = merged
        .filter(proj => AUTHORIZED_NAMES.includes(normalize(proj.name)))
        .sort((a, b) => {
          const indexA = AUTHORIZED_NAMES.indexOf(normalize(a.name));
          const indexB = AUTHORIZED_NAMES.indexOf(normalize(b.name));
          return indexA - indexB;
        });

      setRepos(finalProjects);
    } catch (err: any) {
      console.warn("GitHub API Fetch Error:", err.message);
      
      const AUTHORIZED_NAMES = ["geminisuite", "primeclone", "groovegarden", "digitalflow", "aigallery"];
      const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]/g, '');
      const sortedFallback = [...FALLBACK_PROJECTS]
        .filter(proj => AUTHORIZED_NAMES.includes(normalize(proj.name)))
        .sort((a, b) => {
          const indexA = AUTHORIZED_NAMES.indexOf(normalize(a.name));
          const indexB = AUTHORIZED_NAMES.indexOf(normalize(b.name));
          return indexA - indexB;
        });

      setRepos(sortedFallback);
      setUsingFallback(true);
      setErrorInfo(err.message || "Could not reach GitHub servers. Showing curated offline showcase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories(data.githubUsername);
  }, [data.githubUsername]);

  const cleanTitle = (rawName: string) => {
    return rawName
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  };

  const getGradientHeader = (name: string, index: number) => {
    const gradients = [
      'from-slate-900 via-slate-950 to-emerald-950/40',
      'from-slate-905 via-slate-950 to-blue-950/40',
      'from-slate-900 via-slate-950 to-indigo-950/40',
      'from-slate-900 via-slate-950 to-violet-950/40',
      'from-slate-900 via-slate-950 to-pink-950/40',
      'from-slate-910 via-slate-950 to-amber-950/40',
    ];
    const pickedGradient = gradients[index % gradients.length];
    return pickedGradient;
  };

  const languagesList = Array.from(
    new Set(
      repos
        .map((r) => r.language)
        .filter((lang): lang is string => typeof lang === 'string' && lang.trim() !== '')
    )
  ).slice(0, 8);

  const filteredRepos = repos.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.topics && project.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())));
      
    const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  const displayedRepos = filteredRepos.slice(0, visibleCount);

  return (
    <section id="projects" className="py-24 relative bg-slate-900/40 border-y border-slate-900">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${baseAccent.badge} border`}>
            <Folder className="h-3.5 w-3.5" />
            Portfolio Showcase
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Selected Work
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-lg">
            Active GitHub-sync client pulling live dynamic statistics from <span className={`font-mono font-medium ${baseAccent.primary}`}>@{data.githubUsername}</span>
          </p>
          <div className={`mt-3 h-1 w-12 rounded-full ${baseAccent.bg}`} />
        </div>

        {/* Dynamic State Info / API Rate Limit Warning */}
        {usingFallback && (
          <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3 text-amber-400 text-xs backdrop-blur-sm flex items-center justify-between gap-3 shadow-md animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorInfo}</span>
            </div>
            <button
              onClick={() => fetchRepositories(data.githubUsername)}
              className="rounded-lg bg-amber-500/10 hover:bg-amber-500/20 px-2 py-1 flex items-center gap-1 transition-colors hover:cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Retry
            </button>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="mt-12 max-w-4xl mx-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search projects by name, description, or topic..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(6);
              }}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-800 bg-slate-950/45 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-800 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-350 rounded-full hover:bg-slate-905 transition-colors cursor-pointer"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Languages Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setSelectedLanguage(null);
                setVisibleCount(6);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                !selectedLanguage
                  ? `${baseAccent.bg} border-transparent text-slate-950 font-semibold shadow-sm`
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700/60'
              }`}
            >
              All
            </button>
            {languagesList.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setVisibleCount(6);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  selectedLanguage === lang
                    ? `${baseAccent.bg} border-transparent text-slate-950 font-semibold shadow-sm`
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700/60'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {!isLoading && filteredRepos.length === 0 && (
          <div className="mt-16 text-center py-12 px-6 rounded-2xl border border-dashed border-slate-800 bg-slate-950/10">
            <Folder className="mx-auto h-10 w-10 text-slate-605 mb-4" />
            <p className="text-slate-400 text-sm font-medium">No projects match the selected search & filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLanguage(null);
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs border border-slate-800 text-slate-303 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div className="mt-10">
          <AnimatePresence mode="popLayout">
            <div key="repos-grid" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                // Skeleton Loader Grid
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="group relative flex flex-col h-[380px] rounded-2xl border border-slate-800/80 bg-slate-950/30 overflow-hidden"
                  >
                    <div className="h-40 w-full bg-slate-900/60 relative animate-pulse flex items-center justify-center border-b border-slate-900">
                      <Code2 className="h-8 w-8 text-slate-800" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col space-y-4">
                      <div className="h-6 w-2/3 bg-slate-900 rounded-lg animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 w-full bg-slate-900 rounded-md animate-pulse" />
                        <div className="h-4 w-5/6 bg-slate-900 rounded-md animate-pulse" />
                      </div>
                      <div className="flex gap-2">
                        <div className="h-5 w-12 bg-slate-900 rounded animate-pulse" />
                        <div className="h-5 w-16 bg-slate-900 rounded animate-pulse" />
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                        <div className="h-4 w-16 bg-slate-900 rounded animate-pulse" />
                        <div className="h-4 w-16 bg-slate-900 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                displayedRepos.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group relative flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-950/20 overflow-hidden hover:border-slate-700 shadow-xl hover:shadow-2xl hover:shadow-slate-950/40 transition-all duration-300"
                  >
                    {/* Geometric Placeholder Image Header */}
                    <div className={`h-40 w-full bg-gradient-to-br ${getGradientHeader(project.name, i)} relative flex items-center justify-center overflow-hidden border-b border-slate-900`}>
                      <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
                      
                      <Code2 className={`h-12 w-12 opacity-30 group-hover:opacity-45 transition-all duration-300 group-hover:scale-110 ${baseAccent.accentText}`} />
                      
                      {project.language && (
                        <span className="absolute bottom-3 right-3 rounded-full bg-slate-900 border border-slate-800 bg-slate-900/90 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400">
                          {project.language}
                        </span>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-slate-100 font-display transition-colors">
                        {cleanTitle(project.name)}
                      </h3>
                      
                      <p className="mt-3 text-slate-400 text-sm leading-relaxed flex-grow">
                        {project.description || "Minimalist fully functional software development client architecture, integrating secure modular dependencies and responsive client assets."}
                      </p>

                      {/* Tech Stack Topics */}
                      {project.topics && project.topics.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1">
                          {project.topics.slice(0, 4).map((topic, ti) => (
                            <span
                              key={ti}
                              className={`rounded bg-slate-900/65 border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-400 hover:text-slate-350 transition-colors`}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Project Metrics + Meta Actions */}
                      <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-end">
                        {/* External Links */}
                        <div className="flex items-center gap-3">
                          <a
                            href={project.html_url}
                            target="_blank"
                            rel="noreferrer referrer"
                            className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer"
                            title="View Project Code"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                          
                          {project.homepage && (
                            <a
                              href={project.homepage}
                              target="_blank"
                              rel="noreferrer referrer"
                              className={`p-1.5 rounded-lg border border-slate-800 hover:bg-slate-900 hover:border-slate-700 transition-all cursor-pointer ${baseAccent.accentText}`}
                              title="Live Application"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Load More Pagination */}
        <div className="mt-16 flex justify-center">
          {!isLoading && filteredRepos.length > 6 && (
            visibleCount < filteredRepos.length ? (
              <button
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 px-6 py-3 text-sm font-medium text-slate-300 hover:text-white transition-all hover:bg-slate-950/20 hover:border-slate-700 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                Show More Repositories ({filteredRepos.length - visibleCount} remaining)
              </button>
            ) : (
              <button
                onClick={() => setVisibleCount(6)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-850 px-6 py-3 text-sm font-medium text-slate-400 hover:text-white transition-all hover:bg-slate-950/20 hover:border-slate-705 cursor-pointer shadow-lg hover:scale-[1.02]"
              >
                Show Less
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
