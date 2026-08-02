import { Question } from '../types/question';

export const crossDomainQuestions: Question[] = [
  {
    "id": "physics_pm_1",
    "type": "multiple-choice",
    "category": "Physics",
    "question": "At the highest point in the no-drag model, which velocity component is zero?",
    "options": [
      "Horizontal",
      "Vertical",
      "Both",
      "Neither"
    ],
    "correctAnswer": "Vertical",
    "explanation": "The object stops rising for an instant but keeps moving horizontally.",
    "difficulty": "easy"
  },
  {
    "id": "physics_pm_2",
    "type": "multiple-choice",
    "category": "Physics",
    "question": "At fixed speed and gravity on level ground, which launch angle gives maximum range?",
    "options": [
      "15°",
      "30°",
      "45°",
      "75°"
    ],
    "correctAnswer": "45°",
    "explanation": "Range is proportional to sin(2θ), maximized at 45° under the assumptions.",
    "difficulty": "medium"
  },
  {
    "id": "physics_pm_3",
    "type": "multiple-choice",
    "category": "Physics",
    "question": "Projectiles launch at the same speed at 30° and 60°. What is true?",
    "options": [
      "Equal range, different heights",
      "Equal height, different range",
      "60° has double range",
      "Equal air time"
    ],
    "correctAnswer": "Equal range, different heights",
    "explanation": "Complementary angles share range but not vertical component.",
    "difficulty": "hard"
  },
  {
    "id": "chem_eq_1",
    "type": "multiple-choice",
    "category": "Chemistry",
    "question": "What is equal at dynamic equilibrium?",
    "options": [
      "Reactant and product amounts",
      "Forward and reverse rates",
      "All molecular speeds",
      "Rate constants"
    ],
    "correctAnswer": "Forward and reverse rates",
    "explanation": "Equal opposing rates create zero net change.",
    "difficulty": "easy"
  },
  {
    "id": "chem_eq_2",
    "type": "multiple-choice",
    "category": "Chemistry",
    "question": "Why can equilibrium contain much more B than A?",
    "options": [
      "Equilibrium favors products",
      "Equal rates do not require equal concentrations",
      "Reverse reaction stopped",
      "Mass is not conserved"
    ],
    "correctAnswer": "Equal rates do not require equal concentrations",
    "explanation": "Different rates can balance at unequal amounts.",
    "difficulty": "medium"
  },
  {
    "id": "chem_eq_3",
    "type": "multiple-choice",
    "category": "Chemistry",
    "question": "Increasing only A → B in the toy system produces which equilibrium change?",
    "options": [
      "More A",
      "Less A",
      "Exactly 50/50",
      "Only the start matters"
    ],
    "correctAnswer": "Less A",
    "explanation": "A is converted away more strongly.",
    "difficulty": "hard"
  },
  {
    "id": "bio_sel_1",
    "type": "multiple-choice",
    "category": "Biology",
    "question": "Which level evolves by natural selection?",
    "options": [
      "An individual during life",
      "A population across generations",
      "One organ while used",
      "The environment"
    ],
    "correctAnswer": "A population across generations",
    "explanation": "Inherited frequencies change in populations.",
    "difficulty": "easy"
  },
  {
    "id": "bio_sel_2",
    "type": "multiple-choice",
    "category": "Biology",
    "question": "What must exist before selection can change a trait distribution?",
    "options": [
      "Heritable variation",
      "A conscious goal",
      "Identical reproductive success",
      "A stable environment"
    ],
    "correctAnswer": "Heritable variation",
    "explanation": "Selection filters existing inherited differences.",
    "difficulty": "medium"
  },
  {
    "id": "bio_sel_3",
    "type": "multiple-choice",
    "category": "Biology",
    "question": "A trait grows common because carriers leave more offspring. What mechanism is this?",
    "options": [
      "Differential reproduction",
      "Use and disuse",
      "Individual intention",
      "No inheritance"
    ],
    "correctAnswer": "Differential reproduction",
    "explanation": "Relative reproductive success shifts frequencies.",
    "difficulty": "hard"
  },
  {
    "id": "stats_bayes_1",
    "type": "multiple-choice",
    "category": "Statistics",
    "question": "What supplies the prior probability in a test example?",
    "options": [
      "Positive predictive value",
      "Prevalence in a relevant population",
      "Number of choices",
      "Sensitivity alone"
    ],
    "correctAnswer": "Prevalence in a relevant population",
    "explanation": "Prevalence is the baseline chance.",
    "difficulty": "easy"
  },
  {
    "id": "stats_bayes_2",
    "type": "multiple-choice",
    "category": "Statistics",
    "question": "Why can a rare condition yield more false positives than true positives?",
    "options": [
      "The unaffected group is much larger",
      "Sensitivity is negative",
      "Prevalence stops mattering",
      "Every positive is random"
    ],
    "correctAnswer": "The unaffected group is much larger",
    "explanation": "A small error rate applied to a huge group can dominate.",
    "difficulty": "medium"
  },
  {
    "id": "stats_bayes_3",
    "type": "multiple-choice",
    "category": "Statistics",
    "question": "The same test gives a higher posterior in a high-risk population. What changed?",
    "options": [
      "The prior",
      "Sensitivity definition",
      "The result",
      "The meaning of positive"
    ],
    "correctAnswer": "The prior",
    "explanation": "The same evidence is combined with a higher starting probability.",
    "difficulty": "hard"
  },
  {
    "id": "econ_sd_1",
    "type": "multiple-choice",
    "category": "Economics",
    "question": "A price below equilibrium creates…",
    "options": [
      "A shortage",
      "A surplus",
      "Zero demand",
      "Automatic equality"
    ],
    "correctAnswer": "A shortage",
    "explanation": "Planned demand exceeds planned supply.",
    "difficulty": "easy"
  },
  {
    "id": "econ_sd_2",
    "type": "multiple-choice",
    "category": "Economics",
    "question": "Which is movement along a demand curve?",
    "options": [
      "The good’s own price changes",
      "Income changes",
      "A substitute changes price",
      "Population grows"
    ],
    "correctAnswer": "The good’s own price changes",
    "explanation": "Own-price change moves along the same relationship.",
    "difficulty": "medium"
  },
  {
    "id": "econ_sd_3",
    "type": "multiple-choice",
    "category": "Economics",
    "question": "Holding demand fixed, a supply disruption moves equilibrium toward…",
    "options": [
      "Higher price, lower quantity",
      "Lower price, higher quantity",
      "Higher price, higher quantity",
      "No change"
    ],
    "correctAnswer": "Higher price, lower quantity",
    "explanation": "A leftward supply shift intersects demand there.",
    "difficulty": "hard"
  },
  {
    "id": "cs_sort_1",
    "type": "multiple-choice",
    "category": "Computer Science",
    "question": "What is an algorithm?",
    "options": [
      "An explicit procedure transforming input to output",
      "Only the final answer",
      "Any fast animation",
      "A programming language"
    ],
    "correctAnswer": "An explicit procedure transforming input to output",
    "explanation": "Algorithms specify steps and stopping conditions.",
    "difficulty": "easy"
  },
  {
    "id": "cs_sort_2",
    "type": "multiple-choice",
    "category": "Computer Science",
    "question": "What invariant does insertion sort maintain?",
    "options": [
      "The processed prefix is sorted",
      "The last item is smallest",
      "No comparisons occur",
      "Every value is final immediately"
    ],
    "correctAnswer": "The processed prefix is sorted",
    "explanation": "Each insertion extends the sorted prefix.",
    "difficulty": "medium"
  },
  {
    "id": "cs_sort_3",
    "type": "multiple-choice",
    "category": "Computer Science",
    "question": "Why can simple sorts require work proportional to n²?",
    "options": [
      "Nested comparison sequences grow with input",
      "They store n² values",
      "Computers have n² processors",
      "They make one comparison"
    ],
    "correctAnswer": "Nested comparison sequences grow with input",
    "explanation": "Repeated scans compound as input grows.",
    "difficulty": "hard"
  },
  {
    "id": "music_poly_1",
    "type": "multiple-choice",
    "category": "Music",
    "question": "What does 3:2 polyrhythm mean?",
    "options": [
      "Three equal pulses share a cycle with two equal pulses",
      "Tempo is 32 BPM",
      "One rhythm is irregular",
      "Three instruments play twice"
    ],
    "correctAnswer": "Three equal pulses share a cycle with two equal pulses",
    "explanation": "The ratio describes two divisions of one duration.",
    "difficulty": "easy"
  },
  {
    "id": "music_poly_2",
    "type": "multiple-choice",
    "category": "Music",
    "question": "What is the smallest shared grid for 4:3?",
    "options": [
      "7",
      "8",
      "12",
      "16"
    ],
    "correctAnswer": "12",
    "explanation": "The least common multiple is 12.",
    "difficulty": "medium"
  },
  {
    "id": "music_poly_3",
    "type": "multiple-choice",
    "category": "Music",
    "question": "If 3:2 is played faster but the ratio stays, what changes?",
    "options": [
      "Cycle duration in seconds",
      "The ratio",
      "The LCM",
      "Pulse count per cycle"
    ],
    "correctAnswer": "Cycle duration in seconds",
    "explanation": "Tempo changes speed, not structure.",
    "difficulty": "hard"
  },
  {
    "id": "earth_energy_1",
    "type": "multiple-choice",
    "category": "Earth Science",
    "question": "What does higher albedo do, all else equal?",
    "options": [
      "Reflects more sunlight",
      "Absorbs more sunlight",
      "Stops infrared emission",
      "Raises solar input"
    ],
    "correctAnswer": "Reflects more sunlight",
    "explanation": "Higher albedo leaves less to absorb.",
    "difficulty": "easy"
  },
  {
    "id": "earth_energy_2",
    "type": "multiple-choice",
    "category": "Earth Science",
    "question": "If absorbed energy exceeds outgoing energy, the tendency is…",
    "options": [
      "Warming",
      "Cooling",
      "No change",
      "Instant freezing"
    ],
    "correctAnswer": "Warming",
    "explanation": "Net energy accumulates.",
    "difficulty": "medium"
  },
  {
    "id": "earth_energy_3",
    "type": "multiple-choice",
    "category": "Earth Science",
    "question": "Why are albedo and greenhouse behavior different controls?",
    "options": [
      "One changes incoming reflection; the other outgoing infrared escape",
      "Both only change solar input",
      "Albedo acts only at night",
      "Greenhouse gases create sunlight"
    ],
    "correctAnswer": "One changes incoming reflection; the other outgoing infrared escape",
    "explanation": "They act on different energy-flow stages.",
    "difficulty": "hard"
  }
];
