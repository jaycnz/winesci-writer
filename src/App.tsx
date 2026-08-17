import { useState } from 'react'
import ProgressGlasses from './components/ProgressGlasses'
import SegmentedControl from './components/SegmentedControl'
import ToggleChips from './components/ToggleChips'
import type { WizardStep } from './types/wine'

interface StepDef {
  key: WizardStep
  label: string
}

const STEPS: StepDef[] = [
  { key: 'identity', label: 'Identity' },
  { key: 'visual', label: 'Appearance' },
  { key: 'aroma', label: 'Nose' },
  { key: 'palate', label: 'Palate' },
  { key: 'review', label: 'Overall' },
]

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  // --- Form State ---
  // Identity
  const [wineNumber, setWineNumber] = useState('1')
  const [wineName, setWineName] = useState('')

  // Appearance
  const [clarity, setClarity] = useState('clear')
  const [colorIntensity, setColorIntensity] = useState('medium')
  const [hue, setHue] = useState('ruby')

  // Nose
  const [noseCondition, setNoseCondition] = useState('clean')
  const [noseIntensity, setNoseIntensity] = useState('medium')
  const [noseAromas, setNoseAromas] = useState('')

  // Palate
  const [sweetness, setSweetness] = useState('dry')
  const [acidity, setAcidity] = useState('medium')
  const [body, setBody] = useState('medium')
  const [otherTastes, setOtherTastes] = useState<string[]>([])
  const [mouthfeel, setMouthfeel] = useState('smooth')
  const [palateFlavours, setPalateFlavours] = useState('')

  // Overall
  const [complexity, setComplexity] = useState('moderately complex')
  const [finishLength, setFinishLength] = useState('medium')
  const [balance, setBalance] = useState('well-balanced')
  const [overallImpression, setOverallImpression] = useState('')

  // --- Handlers ---
  const handleToggleTaste = (option: string) => {
    setOtherTastes((prev) =>
      prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option]
    )
  }

  // Generate formatted note text matching your template
  const generatedNote = `WINE ${wineNumber}: ${wineName || 'Unnamed Wine'}

APPEARANCE
- Clarity: The wine is ${clarity}.
- Colour: This wine is ${colorIntensity} ${hue} in colour.

NOSE
- Condition: The nose is ${noseCondition}.
- Intensity: The aromas are ${noseIntensity} in intensity.
- Descriptors: On the nose, this wine shows aromas of ${noseAromas || '[none specified]'}.

PALATE
- Sweetness: The wine is ${sweetness}.
- Acidity: The acidity is ${acidity}.
- Bitterness/saltiness/umami: ${otherTastes.length > 0 ? otherTastes.join(', ') : 'Not detected.'}
- Mouthfeel: The wine has a ${body}-bodied texture that feels ${mouthfeel}.
- Flavours: On the palate, flavours of ${palateFlavours || '[none specified]'} come through.

OVERALL / QUALITY
- Complexity: ${complexity}
- Length: The finish is ${finishLength}.
- Balance: The wine is ${balance}.
- Overall impression: ${overallImpression || 'N/A'}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-eyebrow">Tasting Journal</span>
        <h1>Wine Science Writer</h1>
        <p>Log and structure your wine evaluation using systematic tasting steps.</p>
      </header>

      {/* Progress glasses component */}
      <ProgressGlasses
        steps={STEPS}
        currentIndex={currentStepIndex}
        onSelect={(index) => setCurrentStepIndex(index)}
      />

      <div className="step-card">
        <h2 className="step-title">{STEPS[currentStepIndex].label}</h2>
        <p className="step-subtitle">
          Step {currentStepIndex + 1} of {STEPS.length}
        </p>

        {/* STEP 1: IDENTITY */}
        {currentStepIndex === 0 && (
          <>
            <div className="field">
              <label className="field-label" htmlFor="wine-num">Wine Number / ID</label>
              <input
                id="wine-num"
                className="text-input"
                type="text"
                value={wineNumber}
                onChange={(e) => setWineNumber(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="wine-name">Wine Name & Vintage</label>
              <input
                id="wine-name"
                className="text-input"
                type="text"
                placeholder="e.g. 2021 Marlborough Sauvignon Blanc"
                value={wineName}
                onChange={(e) => setWineName(e.target.value)}
              />
            </div>
          </>
        )}

        {/* STEP 2: APPEARANCE */}
        {currentStepIndex === 1 && (
          <>
            <div className="field">
              <label className="field-label">Clarity</label>
              <SegmentedControl
                name="clarity"
                value={clarity}
                onChange={setClarity}
                options={[
                  { value: 'clear', label: 'Clear' },
                  { value: 'hazy', label: 'Hazy' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Intensity</label>
              <SegmentedControl
                name="colorIntensity"
                value={colorIntensity}
                onChange={setColorIntensity}
                options={[
                  { value: 'pale', label: 'Pale' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'deep', label: 'Deep' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="hue">Colour / Hue</label>
              <input
                id="hue"
                className="text-input"
                type="text"
                placeholder="e.g. lemon, gold, ruby, garnet, amber"
                value={hue}
                onChange={(e) => setHue(e.target.value)}
              />
            </div>
          </>
        )}

        {/* STEP 3: NOSE */}
        {currentStepIndex === 2 && (
          <>
            <div className="field">
              <label className="field-label">Condition</label>
              <SegmentedControl
                name="noseCondition"
                value={noseCondition}
                onChange={setNoseCondition}
                options={[
                  { value: 'clean', label: 'Clean' },
                  { value: 'showing signs of fault', label: 'Faulty' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Intensity</label>
              <SegmentedControl
                name="noseIntensity"
                value={noseIntensity}
                onChange={setNoseIntensity}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'pronounced', label: 'Pronounced' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="nose-aromas">Aroma Descriptors</label>
              <textarea
                id="nose-aromas"
                className="textarea"
                placeholder="e.g. green apple, elderflower, cut grass..."
                value={noseAromas}
                onChange={(e) => setNoseAromas(e.target.value)}
              />
            </div>
          </>
        )}

        {/* STEP 4: PALATE */}
        {currentStepIndex === 3 && (
          <>
            <div className="field">
              <label className="field-label">Sweetness</label>
              <SegmentedControl
                name="sweetness"
                value={sweetness}
                onChange={setSweetness}
                options={[
                  { value: 'dry', label: 'Dry' },
                  { value: 'off-dry', label: 'Off-Dry' },
                  { value: 'medium-sweet', label: 'Med-Sweet' },
                  { value: 'sweet', label: 'Sweet' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Acidity</label>
              <SegmentedControl
                name="acidity"
                value={acidity}
                onChange={setAcidity}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Body</label>
              <SegmentedControl
                name="body"
                value={body}
                onChange={setBody}
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'full', label: 'Full' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Tastes & Sensations Detected</label>
              <ToggleChips
                options={['Bitterness', 'Saltiness', 'Umami', 'Astringency', 'Alcohol Heat']}
                selected={otherTastes}
                onToggle={handleToggleTaste}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="mouthfeel">Mouthfeel Texture</label>
              <input
                id="mouthfeel"
                className="text-input"
                type="text"
                placeholder="e.g. smooth, grainy, drying, oily, velvety"
                value={mouthfeel}
                onChange={(e) => setMouthfeel(e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="palate-flavours">Flavour Descriptors</label>
              <textarea
                id="palate-flavours"
                className="textarea"
                placeholder="e.g. ripe passionfruit, lime zest, subtle flint..."
                value={palateFlavours}
                onChange={(e) => setPalateFlavours(e.target.value)}
              />
            </div>
          </>
        )}

        {/* STEP 5: OVERALL / QUALITY */}
        {currentStepIndex === 4 && (
          <>
            <div className="field">
              <label className="field-label">Complexity</label>
              <SegmentedControl
                name="complexity"
                value={complexity}
                onChange={setComplexity}
                options={[
                  { value: 'simple and fruit-driven', label: 'Simple' },
                  { value: 'moderately complex', label: 'Med Complex' },
                  { value: 'highly complex', label: 'Highly Complex' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Finish Length</label>
              <SegmentedControl
                name="finishLength"
                value={finishLength}
                onChange={setFinishLength}
                options={[
                  { value: 'short', label: 'Short' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'long', label: 'Long' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label">Balance</label>
              <SegmentedControl
                name="balance"
                value={balance}
                onChange={setBalance}
                options={[
                  { value: 'well-balanced', label: 'Balanced' },
                  { value: 'shows more acidity than fruit', label: 'High Acid' },
                  { value: 'shows alcohol heat', label: 'Hot' },
                ]}
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="overall-impression">Overall Impression</label>
              <textarea
                id="overall-impression"
                className="textarea"
                placeholder="Closing sentences tying it together..."
                value={overallImpression}
                onChange={(e) => setOverallImpression(e.target.value)}
              />
            </div>

            <hr style={{ margin: '24px 0', borderColor: 'var(--border)' }} />

            {/* Generated Template Output Preview */}
            <div className="review-meta">
              <h3>Generated Note</h3>
              <div className="review-actions">
                {copied && <span className="copy-feedback">Copied!</span>}
                <button type="button" className="btn btn-secondary" onClick={copyToClipboard}>
                  Copy Note
                </button>
              </div>
            </div>
            <pre style={{
              background: 'var(--paper)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              whiteSpace: 'pre-wrap',
              fontSize: '13px',
              fontFamily: 'monospace'
            }}>
              {generatedNote}
            </pre>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="nav-row">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCurrentStepIndex((prev) => Math.min(STEPS.length - 1, prev + 1))}
            disabled={currentStepIndex === STEPS.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}