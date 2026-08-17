import type { WizardStep } from '../types/wine'

interface StepDef {
  key: WizardStep
  label: string
}

interface ProgressGlassesProps {
  steps: StepDef[]
  currentIndex: number
  onSelect: (index: number) => void
}

const BOWL_TOP = 3
const BOWL_BOTTOM = 21

function WineGlass({ status }: { status: 'upcoming' | 'current' | 'complete' }) {
  const fillPercent = status === 'complete' ? 1 : status === 'current' ? 0.5 : 0
  const fillTop = BOWL_BOTTOM - fillPercent * (BOWL_BOTTOM - BOWL_TOP)
  const fillColor = status === 'complete' ? 'var(--garnet)' : 'var(--gold)'
  const clipId = `glass-clip-${status}-${fillPercent}`

  return (
    <svg className="progress-glass" viewBox="0 0 30 38" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <path d="M6 3 C6 13 10 20 15 21 C20 20 24 13 24 3 Z" />
        </clipPath>
      </defs>
      {fillPercent > 0 && (
        <rect
          x="4"
          y={fillTop}
          width="22"
          height={BOWL_BOTTOM - fillTop}
          fill={fillColor}
          clipPath={`url(#${clipId})`}
        />
      )}
      <path
        d="M6 3 C6 13 10 20 15 21 C20 20 24 13 24 3 Z"
        fill="none"
        stroke={status === 'upcoming' ? 'var(--border-strong)' : 'var(--ink)'}
        strokeWidth="1.4"
      />
      <line
        x1="15"
        y1="21"
        x2="15"
        y2="31"
        stroke={status === 'upcoming' ? 'var(--border-strong)' : 'var(--ink)'}
        strokeWidth="1.4"
      />
      <line
        x1="9"
        y1="34"
        x2="21"
        y2="34"
        stroke={status === 'upcoming' ? 'var(--border-strong)' : 'var(--ink)'}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function ProgressGlasses({ steps, currentIndex, onSelect }: ProgressGlassesProps) {
  return (
    <nav className="progress-row" aria-label="Tasting note sections">
      {steps.map((step, index) => {
        const status = index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming'
        return (
          <button
            key={step.key}
            type="button"
            className={`progress-step${status === 'current' ? ' current' : ''}`}
            onClick={() => onSelect(index)}
          >
            <WineGlass status={status} />
            <span className="progress-label">{step.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
