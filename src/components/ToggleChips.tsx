interface ToggleChipsProps {
  options: string[]
  selected: string[]
  onToggle: (option: string) => void
}

export default function ToggleChips({ options, selected, onToggle }: ToggleChipsProps) {
  return (
    <div className="toggle-row">
      {options.map((option) => {
        const active = selected.includes(option)
        return (
          <button
            key={option}
            type="button"
            className={`toggle-chip${active ? ' active' : ''}`}
            aria-pressed={active}
            onClick={() => onToggle(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
