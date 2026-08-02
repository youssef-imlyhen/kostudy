import { Lesson } from '../types/lesson';

export const worldLessons: Lesson[] = [
  {
    id: 'orbits-are-falling-sideways', title: 'Orbits Are Falling Sideways', subtitle: 'Gravity inward, motion across', emoji: '🪐', durationMinutes: 15, difficulty: 'intermediate', field: 'Astronomy', relatedCategory: 'Astronomy',
    description: 'Change mass, distance, and sideways speed to see why falling can become an orbit—or an escape.',
    coreQuestion: 'Why does an orbiting object keep falling without reaching the body below?',
    firstPrinciple: 'Gravity continually bends velocity inward. With enough sideways speed, the object falls around the central body instead of directly into it.',
    prerequisiteConceptIds: ['horizontal-motion', 'vertical-acceleration'], recommendedLessonIds: ['a-throw-is-two-motions', 'climate-starts-with-an-energy-budget'],
    learningObjectives: ['Explain orbit as continuous gravitational acceleration rather than absence of gravity.', 'Predict how circular speed changes with central mass and orbital radius.', 'Distinguish bound orbit, inward fall, and escape qualitatively.'],
    concepts: [
      { id: 'orbital-fall', label: 'Orbital fall', description: 'Continuous inward acceleration combined with sideways motion.' },
      { id: 'circular-speed', label: 'Circular speed', description: 'The sideways speed needed for a circular orbit at a given mass and radius.' },
      { id: 'escape-threshold', label: 'Escape threshold', description: 'Enough kinetic energy to avoid remaining gravitationally bound in the toy model.' },
    ],
    tutorBrief: 'Build from projectile decomposition. Never imply gravity disappears in orbit. Treat the visual as qualitative and distinguish speed from full velocity direction.',
    blocks: [
      { id: 'story', type: 'explain', eyebrow: 'First principle', title: 'The ground curves away too', body: 'Throwing faster carries an object farther before it falls. On a spherical world, enough sideways motion means the surface curves away while gravity keeps bending the path inward.' },
      { id: 'lab', type: 'interactive', eyebrow: 'Predict → manipulate', title: 'Tune inward pull against sideways motion', body: 'Change central mass, starting radius, and speed relative to the circular value. Animate the result and compare velocity and gravity arrows.', visual: 'orbit-motion', challenge: 'Keep radius fixed and increase central mass. What happens to circular speed? Then hold mass fixed and increase radius.' },
      { id: 'compare', type: 'compare', eyebrow: 'Three regimes', title: 'Slow, bound, or escaping', left: { label: 'Too little sideways speed', body: 'The path bends inward faster than it can miss the central body.' }, right: { label: 'Enough sideways energy', body: 'The object can remain in a bound orbit or exceed the escape threshold.' } },
      { id: 'c1', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Where is gravity?', prompt: 'What provides the inward acceleration of an orbiting satellite?', options: ['Gravity', 'No force at all', 'The satellite engine continuously', 'Air resistance'], correctAnswer: 'Gravity', explanation: 'Orbit is free fall under gravity. The object feels weightless because it and its surroundings accelerate together.', conceptIds: ['orbital-fall'] },
      { id: 'c2', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Move farther out', prompt: 'For the same central mass, what happens to circular speed at a larger radius?', options: ['It decreases', 'It increases without limit', 'It is unchanged', 'It becomes zero immediately'], correctAnswer: 'It decreases', explanation: 'Gravity is weaker farther away, so lower sideways speed can match a circular path.', conceptIds: ['circular-speed'] },
      { id: 'reflection', type: 'reflection', eyebrow: 'Explain precisely', title: 'Replace “floating”', prompt: 'Explain why astronauts in orbit appear weightless without saying there is no gravity.', placeholder: 'They appear weightless because…' },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What should survive the lesson', items: ['Orbit is continuous free fall.', 'Velocity points sideways while gravity bends it inward.', 'Circular speed depends on mass and distance.', 'Escape is an energy threshold, not where gravity ends.'] },
    ],
  },
  {
    id: 'predators-and-prey-create-cycles', title: 'Predators and Prey Create Cycles', subtitle: 'Coupled populations and delayed feedback', emoji: '🐇', durationMinutes: 16, difficulty: 'intermediate', field: 'Ecology', relatedCategory: 'Ecology',
    description: 'Manipulate a predator–prey model and watch abundance, scarcity, and delayed response generate oscillations.',
    coreQuestion: 'Why can predator and prey populations rise and fall in repeating waves instead of settling immediately?',
    firstPrinciple: 'Each population changes conditions for the other. More prey can support more predators; more predators can reduce prey; reduced prey then weakens predator growth.',
    prerequisiteConceptIds: ['generational-change'], recommendedLessonIds: ['selection-changes-populations', 'climate-starts-with-an-energy-budget'],
    learningObjectives: ['Identify the two directional feedback links in a predator–prey pair.', 'Explain why predator peaks can lag behind prey peaks.', 'Critique a two-species model using ecological factors it omits.'],
    concepts: [
      { id: 'coupled-populations', label: 'Coupled populations', description: 'Two populations whose rates of change depend on each other.' },
      { id: 'feedback-lag', label: 'Feedback lag', description: 'A delayed response that lets one population peak after the other.' },
      { id: 'ecological-model-limits', label: 'Ecological model limits', description: 'Missing factors such as carrying capacity, seasons, migration, and additional species.' },
    ],
    tutorBrief: 'Teach the causal loop before equations. Avoid implying all predator–prey systems cycle cleanly. Ask what omitted mechanisms could damp, amplify, or disrupt oscillation.',
    blocks: [
      { id: 'story', type: 'explain', eyebrow: 'First principle', title: 'Success changes the next conditions', body: 'When prey are abundant, predators have more food and can increase. That raises pressure on prey. When prey decline, predators later face scarcity. Each outcome alters the next rate of change.' },
      { id: 'lab', type: 'interactive', eyebrow: 'Predict → manipulate', title: 'Build a delayed feedback loop', body: 'Change prey reproduction, predation pressure, predator decline, conversion efficiency, and starting populations. Watch which curve peaks first.', visual: 'predator-prey', challenge: 'Increase predation pressure without changing predator decline. Does the predator peak move earlier, grow higher, or collapse after exhausting prey?' },
      { id: 'compare', type: 'compare', eyebrow: 'Direction matters', title: 'Two links, opposite signs', left: { label: 'Prey → predators', body: 'More prey can increase predator growth by providing more food.' }, right: { label: 'Predators → prey', body: 'More predators can decrease prey growth through predation.' } },
      { id: 'c1', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Why the lag?', prompt: 'Why does a predator peak often occur after a prey peak?', options: ['Predator growth responds to earlier prey abundance', 'Predators always reproduce first', 'Prey never affect predators', 'The graph shifts randomly'], correctAnswer: 'Predator growth responds to earlier prey abundance', explanation: 'Food abundance first supports predator growth; population response takes time.', conceptIds: ['coupled-populations', 'feedback-lag'] },
      { id: 'c2', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Critique the model', prompt: 'Which addition would make the ecology model more realistic?', options: ['A prey carrying capacity', 'Removing all time dependence', 'Forcing both populations equal', 'Assuming no environment'], correctAnswer: 'A prey carrying capacity', explanation: 'Resource limits can prevent prey growing indefinitely even when predators are scarce.', conceptIds: ['ecological-model-limits'] },
      { id: 'reflection', type: 'reflection', eyebrow: 'Model criticism', title: 'Add a third influence', prompt: 'Choose one omitted factor—season, disease, migration, habitat, or another species—and predict how it could alter the curves.', placeholder: 'Adding… could change the cycle because…' },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What should survive the lesson', items: ['Coupled systems can oscillate without an external clock.', 'Predator responses can lag behind prey changes.', 'Stronger interaction does not always mean a healthier system.', 'Two-species equations are a lens, not an ecosystem.'] },
    ],
  },
];
