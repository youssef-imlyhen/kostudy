import { Lesson } from '../types/lesson';

export const lessons: Lesson[] = [
  {
    id: 'packaging-is-the-gate', title: 'Packaging Is the Gate', subtitle: 'Idea → promise → click', emoji: '🎯', durationMinutes: 9, difficulty: 'foundation', relatedCategory: 'Title & Packaging',
    description: 'See why a strong video can lose before anyone watches it, then manipulate the funnel that turns impressions into clicks.',
    coreQuestion: 'How can an excellent video lose before the viewer sees a single second?',
    firstPrinciple: 'A viewer cannot experience the video until the packaging earns the click. Packaging is a promise, not decoration.',
    tutorBrief: 'Teach packaging as an honest promise. Do not imply CTR alone determines success. Separate the idea, packaging, audience fit, and what happens after the click.',
    concepts: [
      { id: 'packaging-promise', label: 'Packaging promise', description: 'The expectation created by the idea, title, and thumbnail.' },
      { id: 'ctr', label: 'Click-through rate', description: 'The share of eligible impressions that become views.' },
      { id: 'audience-match', label: 'Audience match', description: 'Whether the promise is relevant to the people receiving the impression.' },
    ],
    blocks: [
      { id: 'gate', type: 'explain', eyebrow: 'First principle', title: 'The video begins before playback', body: 'Production quality matters only after someone decides the video is worth entering. Before playback, the viewer mainly has the topic, title, thumbnail, channel context, and their own needs.', bullets: ['The idea determines whether a promise is interesting at all.', 'The title and thumbnail make the promise legible and compelling.', 'The opening must quickly prove that the promise was honest.'] },
      { id: 'funnel', type: 'interactive', eyebrow: 'Manipulate it', title: 'Turn impressions into clicks', body: 'Move the numbers and watch the entry funnel change. This isolates one relationship for intuition; real CTR varies by traffic source, audience, topic, device, and context.', visual: 'click-funnel', challenge: 'Keep impressions fixed. How much does a small CTR improvement change how many people get a chance to watch?' },
      { id: 'promise-check', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'What actually matters?', prompt: 'A thumbnail gets many clicks but the opening immediately delivers something different. Which diagnosis is strongest?', options: ['The thumbnail needs more contrast', 'The packaging promise and video delivery are misaligned', 'The video needs more tags', 'The upload should be longer'], correctAnswer: 'The packaging promise and video delivery are misaligned', explanation: 'A click is only the handoff. Strong packaging creates an expectation; the video has to honor it quickly.', conceptIds: ['packaging-promise', 'audience-match'] },
      { id: 'reflection', type: 'reflection', eyebrow: 'Apply it', title: 'Audit one promise', prompt: 'Pick a video idea you know. In one sentence, write what the viewer believes they will get after seeing its title and thumbnail.', placeholder: 'The viewer expects to…' },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'Three ideas to keep', items: ['Packaging is the entrance to the experience.', 'CTR is useful evidence, not a universal quality score.', 'The opening should cash the promise made by the title and thumbnail.'] },
    ],
  },
  {
    id: 'retention-is-a-promise-kept', title: 'Retention Is a Promise Kept', subtitle: 'Attention across time', emoji: '📉', durationMinutes: 8, difficulty: 'intermediate', relatedCategory: 'Analytics & Algorithm',
    description: 'Read a retention curve as evidence about viewer experience instead of treating it as a single score to maximize.',
    coreQuestion: 'What does a falling retention curve actually tell you?',
    firstPrinciple: 'Retention is a time series of continued choices. Every moment asks whether the next moment still feels worth attention.',
    tutorBrief: 'Treat retention as diagnostic evidence. Avoid universal benchmarks. Ask what the viewer expected at a specific moment and what changed.',
    concepts: [
      { id: 'retention-curve', label: 'Retention curve', description: 'A time-based view of how much of the starting audience remains.' },
      { id: 'viewer-expectation', label: 'Viewer expectation', description: 'The reason the viewer believes continuing will be valuable.' },
      { id: 'diagnostic-thinking', label: 'Diagnostic thinking', description: 'Using the shape and context of data to form hypotheses rather than chase a benchmark.' },
    ],
    blocks: [
      { id: 'curve-story', type: 'explain', eyebrow: 'Read the shape', title: 'A curve is a story, not a grade', body: 'A retention graph compresses many continue-or-leave decisions into a line. A drop can mean confusion, a fulfilled need, a broken promise, a slow section, or simply that a segment was relevant to only part of the audience.', bullets: ['Ask where the curve changes shape.', 'Rewatch the exact moment around the change.', 'Form a hypothesis before changing the edit or script.'] },
      { id: 'shape-lab', type: 'interactive', eyebrow: 'Manipulate it', title: 'Build a retention shape', body: 'Adjust early and late audience levels. Two videos can finish at a similar point while telling very different stories about their openings.', visual: 'retention-curve', challenge: 'Create a steep early loss but stable later viewing. What would you inspect first?' },
      { id: 'retention-check', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Choose the best response', prompt: 'You see a sharp drop exactly when a long branded intro begins. What should you do first?', options: ['Delete every intro forever', 'Inspect that moment and test whether the intro breaks the viewer’s expectation', 'Add more background music', 'Ignore the graph because retention is random'], correctAnswer: 'Inspect that moment and test whether the intro breaks the viewer’s expectation', explanation: 'The graph gives you a location for investigation. It does not prove a universal rule by itself.', conceptIds: ['retention-curve', 'diagnostic-thinking'] },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'Use analytics like a scientist', items: ['Find the change.', 'Inspect the experience at that moment.', 'Form and test a hypothesis instead of worshipping a benchmark.'] },
    ],
  },
  {
    id: 'sound-is-motion', title: 'Sound Is Motion', subtitle: 'Hear the physics before memorizing music theory', emoji: '〰️', durationMinutes: 10, difficulty: 'foundation',
    description: 'See a waveform, change frequency and amplitude, then hear those variables through the browser audio engine.',
    coreQuestion: 'What is changing in the world when you hear a sound?',
    firstPrinciple: 'Sound begins as changing pressure through time. Pitch and loudness are perceptual summaries of patterns in that motion.',
    tutorBrief: 'Begin with physical change over time. Distinguish waveform amplitude from perceived loudness and frequency from perceived pitch.',
    concepts: [
      { id: 'frequency', label: 'Frequency', description: 'How rapidly a repeating pattern cycles through time.' },
      { id: 'amplitude', label: 'Amplitude', description: 'The magnitude of variation around equilibrium in a wave representation.' },
      { id: 'waveform', label: 'Waveform', description: 'A representation of how a signal changes through time.' },
    ],
    blocks: [
      { id: 'motion', type: 'explain', eyebrow: 'First principle', title: 'Start with change through time', body: 'A microphone converts pressure variation into an electrical signal. A waveform is one way to represent that changing signal. Music theory comes later; first build intuition for the motion itself.' },
      { id: 'wave-lab', type: 'interactive', eyebrow: 'See + hear', title: 'Touch frequency and amplitude', body: 'Move the controls. The drawn wave is deliberately normalized for learning, while the tone uses the selected frequency in the Web Audio API.', visual: 'sound-wave', challenge: 'Double the frequency while leaving amplitude alone. What changes visually? What changes perceptually?' },
      { id: 'fourier-video', type: 'youtube', eyebrow: 'Optional guide', title: 'A visual bridge to frequency space', url: 'https://www.youtube.com/watch?v=spUNpyF58BY', channel: '3Blue1Brown', why: 'Use this after the wave lab. It builds geometric intuition for decomposing complicated motion into frequency components.' },
      { id: 'sound-check', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Separate the variables', prompt: 'In the simplified lab, which control changes how many cycles occur per second?', options: ['Amplitude', 'Frequency', 'Canvas width', 'Volume label'], correctAnswer: 'Frequency', explanation: 'Frequency is cycles per second. Pitch is strongly related to frequency, but the two words are not exact synonyms.', conceptIds: ['frequency', 'waveform'] },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'What the lab gave you', items: ['Waveforms describe change through time.', 'Frequency describes repetition rate.', 'Amplitude and perceived loudness are related but not identical concepts.'] },
    ],
  },
  {
    id: 'forgetting-is-part-of-learning', title: 'Forgetting Is Part of Learning', subtitle: 'Why review should arrive after effort', emoji: '🧠', durationMinutes: 7, difficulty: 'foundation',
    description: 'Use a simple memory model to see why KoStudy separates immediate mistake repair from later scheduled retrieval.',
    coreQuestion: 'Why not review everything immediately and repeatedly?',
    firstPrinciple: 'Memory strengthens when retrieval succeeds after some forgetting. Review timing should create useful effort without waiting until the idea is completely gone.',
    tutorBrief: 'Explain spacing and retrieval without claiming the toy decay curve is a biological measurement. Distinguish immediate mistake repair from later recall practice.',
    concepts: [
      { id: 'retrieval-practice', label: 'Retrieval practice', description: 'Trying to recall information instead of only rereading it.' },
      { id: 'spacing', label: 'Spacing', description: 'Separating retrieval attempts across time.' },
      { id: 'memory-strength', label: 'Memory strength', description: 'A simplified representation of resistance to forgetting.' },
    ],
    blocks: [
      { id: 'two-loops', type: 'explain', eyebrow: 'Two jobs', title: 'Repair now, retrieve later', body: 'When an answer is wrong, first repair the misunderstanding while the reasoning is still available. Once the idea is understood, the next job is different: wait long enough that recall requires effort, then retrieve again.' },
      { id: 'memory-lab', type: 'interactive', eyebrow: 'Toy model', title: 'Explore a forgetting curve', body: 'This curve is intentionally illustrative, not a measurement of your brain. Change memory strength and elapsed days to see why stronger memories can tolerate wider spacing.', visual: 'memory-curve', challenge: 'Increase memory strength. How does that change the useful review window in this toy model?' },
      { id: 'spacing-check', type: 'checkpoint', eyebrow: 'Retrieval check', title: 'Which loop is this?', prompt: 'You miss a question because you confused two concepts. What should happen first?', options: ['Wait 30 days', 'Repair the distinction now, then schedule later retrieval', 'Repeat the same answer ten times', 'Hide the explanation'], correctAnswer: 'Repair the distinction now, then schedule later retrieval', explanation: 'Immediate feedback fixes the model. Spaced retrieval becomes useful after the concept is understood well enough to be recalled later.', conceptIds: ['retrieval-practice', 'spacing'] },
      { id: 'carry', type: 'takeaways', eyebrow: 'Carry forward', title: 'The learning loop', items: ['Mistakes need repair, not punishment.', 'Correct recall should create a future review, not end the story.', 'Spacing is a scheduling strategy, not a magic fixed interval.'] },
    ],
  },
];

export const getLessonById = (lessonId: string) => lessons.find((lesson) => lesson.id === lessonId);
export const getLessonsForCategory = (category: string) => lessons.filter((lesson) => lesson.relatedCategory === category);
