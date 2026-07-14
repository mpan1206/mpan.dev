import config from '@/config'

const START_YEAR = 2026

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const yearRange = currentYear > START_YEAR ? `${START_YEAR}-${currentYear}` : `${START_YEAR}`

  return (
    <footer className="box-border w-full">
      <div className="p-5 sm:p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground opacity-60 transition-opacity hover:opacity-100">
            <a
              target="_blank"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground hover:underline"
            >
              CC BY-NC-SA 4.0
            </a>
            <span>
              <span data-footer-year data-start-year={START_YEAR}>
                {yearRange}
              </span>{' '}
              &copy; {config.site.meta.title}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
