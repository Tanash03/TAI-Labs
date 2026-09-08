'use client'

import { FormEvent, useMemo, useState } from 'react'

type Results = {
  hoursSaved: number
  monthlyHours: number
  monthlyValue: number
  annualValue: number
  qualityChange: number
  efficiency: number
}

const roles = ['Marketing', 'Sales', 'Customer Support', 'Operations', 'HR', 'Finance', 'Other']

export default function Home() {
  const [role, setRole] = useState('Marketing')
  const [task, setTask] = useState('Creating a monthly marketing report')
  const [beforeTime, setBeforeTime] = useState('90')
  const [frequency, setFrequency] = useState('8')
  const [beforeQuality, setBeforeQuality] = useState('72')
  const [workflow, setWorkflow] = useState('Use AI to summarise campaign data, identify trends, draft insights, then review and edit the final report.')
  const [afterTime, setAfterTime] = useState('30')
  const [afterQuality, setAfterQuality] = useState('88')
  const [hourlyValue, setHourlyValue] = useState('35')
  const [results, setResults] = useState<Results | null>(null)
  const [showEvidence, setShowEvidence] = useState(false)

  const preview = useMemo(() => {
    const before = Number(beforeTime) || 0
    const after = Number(afterTime) || 0
    return Math.max(0, before - after)
  }, [beforeTime, afterTime])

  function calculate(e: FormEvent) {
    e.preventDefault()
    const before = Number(beforeTime) || 0
    const after = Number(afterTime) || 0
    const times = Number(frequency) || 0
    const qualityBefore = Number(beforeQuality) || 0
    const qualityAfter = Number(afterQuality) || 0
    const value = Number(hourlyValue) || 0
    const hoursSaved = Math.max(0, (before - after) / 60)
    const monthlyHours = hoursSaved * times
    const monthlyValue = monthlyHours * value
    setResults({
      hoursSaved,
      monthlyHours,
      monthlyValue,
      annualValue: monthlyValue * 12,
      qualityChange: qualityAfter - qualityBefore,
      efficiency: before > 0 ? Math.max(0, Math.round((1 - after / before) * 100)) : 0
    })
    setShowEvidence(true)
  }

  return (
    <main>
      <nav className="nav">
        <div className="brand"><span className="brandMark">T</span><span>TAI Labs</span></div>
        <div className="navPill">WORKFLOW REPLAY <span>●</span></div>
      </nav>

      <section className="hero">
        <div className="eyebrow">AI UPSKILLING × BUSINESS IMPACT</div>
        <h1>Prove what AI<br /><em>changed.</em></h1>
        <p className="heroText">Replay a real workflow before and after AI. Turn minutes saved and quality gained into a business outcome you can actually see.</p>
        <div className="heroLine" />
      </section>

      <form className="workspace" onSubmit={calculate}>
        <section className="panel">
          <div className="step"><span>01</span><div><b>THE WORK</b><small>Capture the workflow as it exists today.</small></div></div>
          <label>YOUR ROLE</label>
          <div className="roleGrid">
            {roles.map(r => <button type="button" key={r} className={role === r ? 'role active' : 'role'} onClick={() => setRole(r)}>{r}</button>)}
          </div>
          <label>TASK NAME</label>
          <input value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. Weekly sales reporting" />
          <div className="twoCol">
            <div><label>TIME BEFORE AI <span>(MINUTES)</span></label><input type="number" min="0" value={beforeTime} onChange={e => setBeforeTime(e.target.value)} /></div>
            <div><label>TIMES PER MONTH</label><input type="number" min="0" value={frequency} onChange={e => setFrequency(e.target.value)} /></div>
          </div>
          <label>QUALITY BEFORE AI <span>(0–100)</span></label>
          <div className="rangeRow"><input type="range" min="0" max="100" value={beforeQuality} onChange={e => setBeforeQuality(e.target.value)} /><strong>{beforeQuality}</strong></div>
        </section>

        <div className="arrow">→</div>

        <section className="panel afterPanel">
          <div className="step"><span>02</span><div><b>THE REPLAY</b><small>Describe what changed when AI entered the workflow.</small></div></div>
          <label>AI-ASSISTED WORKFLOW</label>
          <textarea value={workflow} onChange={e => setWorkflow(e.target.value)} rows={5} />
          <div className="twoCol">
            <div><label>TIME AFTER AI <span>(MINUTES)</span></label><input type="number" min="0" value={afterTime} onChange={e => setAfterTime(e.target.value)} /></div>
            <div><label>VALUE OF AN HOUR <span>($)</span></label><input type="number" min="0" value={hourlyValue} onChange={e => setHourlyValue(e.target.value)} /></div>
          </div>
          <label>QUALITY AFTER AI <span>(0–100)</span></label>
          <div className="rangeRow"><input type="range" min="0" max="100" value={afterQuality} onChange={e => setAfterQuality(e.target.value)} /><strong>{afterQuality}</strong></div>
          <button className="calculate" type="submit">CALCULATE IMPACT <span>↗</span></button>
        </section>
      </form>

      <section className="impact">
        <div className="impactHeader"><div><div className="eyebrow">03 — THE OUTCOME</div><h2>The work changed.<br />Now <em>measure it.</em></h2></div><div className="live"><span /> LIVE REPLAY</div></div>
        {!results ? <div className="emptyOutcome"><span>—</span><p>Run the replay to turn your workflow into measurable impact.</p><div className="miniStat">{preview} min saved per run</div></div> : <div className="metrics">
          <div className="metric featured"><span>TIME SAVED / RUN</span><strong>{results.hoursSaved.toFixed(1)}<small> hrs</small></strong><p>{results.efficiency}% faster workflow</p></div>
          <div className="metric"><span>MONTHLY HOURS RECOVERED</span><strong>{results.monthlyHours.toFixed(1)}</strong><p>{frequency} runs / month</p></div>
          <div className="metric"><span>MONTHLY VALUE</span><strong>${Math.round(results.monthlyValue).toLocaleString()}</strong><p>estimated recovered capacity</p></div>
          <div className="metric"><span>QUALITY CHANGE</span><strong>+{results.qualityChange}</strong><p>{beforeQuality} → {afterQuality} quality score</p></div>
        </div>}
      </section>

      {results && showEvidence && <section className="evidence">
        <div className="evidenceTitle"><span>PROOF OF CHANGE</span><small>Generated from this replay</small></div>
        <div className="evidenceCard">
          <div><span className="check">✓</span><div><b>{task || 'Workflow'}</b><p>{role} · AI-assisted workflow</p></div></div>
          <div className="proofGrid"><div><span>BEFORE</span><b>{beforeTime} min</b></div><div><span>AFTER</span><b>{afterTime} min</b></div><div><span>QUALITY</span><b>{beforeQuality} → {afterQuality}</b></div><div><span>ANNUAL VALUE</span><b>${Math.round(results.annualValue).toLocaleString()}</b></div></div>
        </div>
        <p className="quote">“This workflow is now <strong>{results.efficiency}% faster</strong>, recovering approximately <strong>{results.monthlyHours.toFixed(1)} hours each month</strong> while quality moved {results.qualityChange >= 0 ? 'up' : 'down'} {Math.abs(results.qualityChange)} points.”</p>
      </section>}

      <footer><span>TAI LABS · WORKFLOW REPLAY</span><span>ASSESS → LEARN → BUILD → PROVE → MEASURE</span></footer>
    </main>
  )
}
