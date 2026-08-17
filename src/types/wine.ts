// 1. Wizard Steps used by ProgressGlasses.tsx
export type WizardStep = 
  | 'identity'
  | 'visual'
  | 'aroma'
  | 'palate'
  | 'review'

// 2. Control Option interface used by SegmentedControl.tsx
export interface SegmentedOption<T extends string = string> {
  value: T
  label: string
}

// 3. Generic Descriptor interface for aroma/flavor descriptors
export interface Descriptor {
  id: string
  name: string
  category: string
  imageUri?: string
}

// 4. Wine Note model structure based on App.css selectors
export interface WineNote {
  id: string
  wineName: string
  vintage?: string
  producer?: string
  region?: string
  
  // Visuals & Structure
  clarity?: string
  colorIntensity?: string
  hue?: string
  sweetness?: string
  acidity?: string
  tannin?: string
  alcohol?: string
  body?: string
  
  // Tastes / Toggles
  toggles: string[] // e.g., bitterness, saltiness, umami
  
  // Descriptors selected
  descriptors: string[]
  
  // Additional notes
  notes?: string
}

// 5. Structure for step configuration
export interface StepConfig {
  key: WizardStep
  label: string
}