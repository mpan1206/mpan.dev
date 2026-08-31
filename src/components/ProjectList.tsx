import { useState, useMemo } from 'react'
import type { ProjectCardProps, ProjectCategoryKey } from '@/types'
import { CATEGORY_LABELS } from '@/types'
import ProjectCard from './ProjectCard'
import { FolderGit2 } from 'lucide-react'

export type FilterCategoryKey = 'all' | ProjectCategoryKey

interface CategoryTab {
  key: FilterCategoryKey
  label: string
  count: number
}

interface ProjectListProps {
  projects: ProjectCardProps[]
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategoryKey>('all')

  // Extract unique categories and their counts in a typed manner
  const categories = useMemo<CategoryTab[]>(() => {
    const categoryCounts: Partial<Record<ProjectCategoryKey, number>> = {}

    projects.forEach((project) => {
      const cat = project.category || 'other'
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
    })

    const tabs: CategoryTab[] = [
      {
        key: 'all',
        label: '全部',
        count: projects.length,
      },
    ]

    Object.entries(categoryCounts).forEach(([catKey, count]) => {
      const key = catKey as ProjectCategoryKey
      tabs.push({
        key,
        label: CATEGORY_LABELS[key] || key,
        count: count || 0,
      })
    })

    return tabs
  }, [projects])

  // Filter projects by typed category key
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects
    }
    return projects.filter((project) => (project.category || 'other') === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(({ key, label, count }) => {
            const isActive = selectedCategory === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'border border-border/40 bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`py-0.2 rounded-full px-1.5 text-[10px] ${
                    isActive
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-background/80 text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.title} className="h-full w-full">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <FolderGit2 className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm font-medium text-foreground">暂无该分类下的项目</p>
          <p className="mt-1 text-xs text-muted-foreground">可切换到其他分类查看全部开源作品</p>
        </div>
      )}
    </div>
  )
}
