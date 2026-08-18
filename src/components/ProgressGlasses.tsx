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

export default function ProgressGlasses({ steps, currentIndex, onSelect }: ProgressGlassesProps) {
  return (
    <nav className="progress-row" aria-label="Tasting note sections">
      {steps.map((step, index) => {
        // Determine step progress state
        const status = index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming'

        return (
          <button
            key={step.key}
            type="button"
            className={`progress-step ${status}`}
            aria-current={status === 'current' ? 'step' : undefined}
            onClick={() => onSelect(index)}
          >
            <span className="progress-indicator" aria-hidden="true" />
            <span className="progress-label">{step.label}</span>
          </button>
        )
      })}
    </nav>
  )
}