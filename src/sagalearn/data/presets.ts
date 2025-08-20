import React from 'react';
import type { WorldPreset, QuestionPack, HeroPreset } from '../types';
import { ForestIcon, CyberpunkIcon, DesertIcon, DetectiveIcon, MysticIcon, GardenerIcon, SolarSystemIcon, RomeIcon, PlantsIcon } from '../components/icons';

export const worldPresets: WorldPreset[] = [
  {
    id: 'forest',
    name: 'Mystical Forest',
    description: 'A realm of ancient trees and glowing flora.',
    prompt: 'A mystical, enchanted forest where ancient trees have faces, mushrooms glow with soft light, and ethereal spirits drift through the air.',
    icon: ForestIcon,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Megalopolis',
    description: 'Neon-drenched streets under corporate rule.',
    prompt: 'A high-tech, dystopian cyberpunk city in a perpetual state of night, illuminated by towering holographic ads and neon signs. Rain-slicked streets reflect the urban sprawl.',
    icon: CyberpunkIcon,
  },
  {
    id: 'desert',
    name: 'Sunken Desert',
    description: 'Vast dunes hiding the ruins of a lost civilization.',
    prompt: 'A vast, windswept desert under a scorching sun. The sand gives way to reveal the towering spires and crumbling ruins of a long-lost, advanced civilization.',
    icon: DesertIcon,
  },
];

export const heroPresets: HeroPreset[] = [
    {
        id: 'clockwork_detective',
        name: 'The Clockwork Detective',
        description: 'A brilliant mind in a brass body, searching for answers.',
        prompt: 'A clockwork automaton detective, clad in a trench coat. One of its eyes is a glowing blue lens that whirs softly. It is logical, observant, and surprisingly empathetic for a machine.',
        icon: DetectiveIcon,
    },
    {
        id: 'star_chartist',
        name: 'The Star-Chartist',
        description: 'A wanderer who reads fate in the constellations.',
        prompt: 'A nomadic mystic draped in robes the color of twilight, covered in celestial patterns. They carry an ancient astrolabe and their eyes shimmer with starlight. They are wise, enigmatic, and speak in cosmic metaphors.',
        icon: MysticIcon,
    },
    {
        id: 'sky_gardener',
        name: 'The Sky-Gardener',
        description: 'Tends to floating islands and cloud-borne ecosystems.',
        prompt: 'A cheerful and resourceful botanist who travels on a living, leafy glider. They wear practical, earth-toned clothes and have flowers woven into their hair. They are optimistic and deeply connected to the natural world.',
        icon: GardenerIcon,
    }
]

export const questionPacks: QuestionPack[] = [
  {
    id: 'solar_system',
    name: 'Solar System',
    description: 'Journey through our celestial neighborhood.',
    questions: [
        { topic: "Solar System", question: "Which planet is known as the Red Planet?", answer: "Mars", wrongOptions: ["Jupiter", "Venus", "Saturn"]},
        { topic: "Solar System", question: "What is the largest planet in our solar system?", answer: "Jupiter", wrongOptions: ["Earth", "Uranus", "Saturn"]},
        { topic: "Solar System", question: "Which planet is famous for its rings?", answer: "Saturn", wrongOptions: ["Mars", "Neptune", "Venus"]},
        { topic: "Solar System", question: "What is the name of the dwarf planet that was once considered the ninth planet?", answer: "Pluto", wrongOptions: ["Eris", "Ceres", "Makemake"]},
    ],
    icon: SolarSystemIcon
  },
  {
    id: 'ancient_rome',
    name: 'Ancient Rome',
    description: 'Explore the history of the Roman Empire.',
    questions: [
        { topic: "Ancient Rome", question: "Who was the first Emperor of Rome?", answer: "Augustus", wrongOptions: ["Julius Caesar", "Nero", "Constantine"]},
        { topic: "Ancient Rome", question: "What was the name of the amphitheater used for gladiatorial contests?", answer: "The Colosseum", wrongOptions: ["The Pantheon", "Circus Maximus", "The Forum"]},
        { topic: "Ancient Rome", question: "In what year did the Western Roman Empire fall?", answer: "476 AD", wrongOptions: ["1453 AD", "753 BC", "27 BC"]},
        { topic: "Ancient Rome", question: "What volcano famously erupted in 79 AD, destroying the city of Pompeii?", answer: "Mount Vesuvius", wrongOptions: ["Mount Etna", "Stromboli", "Mount Fuji"]},
    ],
    icon: RomeIcon
  },
  {
    id: 'photosynthesis',
    name: 'The Life of Plants',
    description: 'Discover the secrets of the green world.',
    questions: [
        { topic: "Photosynthesis", question: "What gas do plants release during photosynthesis?", answer: "Oxygen", wrongOptions: ["Carbon Dioxide", "Nitrogen", "Hydrogen"]},
        { topic: "Photosynthesis", question: "What pigment gives plants their green color and absorbs sunlight?", answer: "Chlorophyll", wrongOptions: ["Carotene", "Melanin", "Anthocyanin"]},
        { topic: "Photosynthesis", question: "What are the two main products of photosynthesis?", answer: "Glucose and Oxygen", wrongOptions: ["Water and Carbon Dioxide", "Sunlight and Water", "Oxygen and Nitrogen"]},
        { topic: "Photosynthesis", question: "Where in the plant cell does photosynthesis take place?", answer: "Chloroplasts", wrongOptions: ["Mitochondria", "Nucleus", "Ribosomes"]},
    ],
    icon: PlantsIcon
  }
];