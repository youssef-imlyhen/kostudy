// src/utils/soundManager.ts
import { Howl, Howler } from 'howler';

// Sound file imports from the new directory
import correctSound from '../assets/quiz_sounds/correct/correct_ding.mp3';
import incorrectSound from '../assets/quiz_sounds/wrong/wrong_buzzer.mp3';
import levelCompleteSound from '../assets/quiz_sounds/milestone/level_complete.mp3';
import streakSound from '../assets/quiz_sounds/milestone/milestone_fanfare.wav';

// Define sound types
export type SoundType = 'correct' | 'incorrect' | 'levelComplete' | 'streak';

class SoundManager {
  private sounds: Record<SoundType, Howl> = {} as Record<SoundType, Howl>;
  private soundEnabled: boolean = true;

  constructor() {
    this.initializeSounds();
  }

  private initializeSounds() {
    // Initialize all sounds
    this.sounds.correct = new Howl({
      src: [correctSound],
      volume: 0.7,
      preload: true,
      onloaderror: (error: any) => {
        console.warn(`Failed to load correct sound:`, error);
      }
    });

    this.sounds.incorrect = new Howl({
      src: [incorrectSound],
      volume: 0.7,
      preload: true,
      onloaderror: (error: any) => {
        console.warn(`Failed to load incorrect sound:`, error);
      }
    });

    this.sounds.levelComplete = new Howl({
      src: [levelCompleteSound],
      volume: 0.8,
      preload: true,
      onloaderror: (error: any) => {
        console.warn(`Failed to load level complete sound:`, error);
      }
    });

    this.sounds.streak = new Howl({
      src: [streakSound],
      volume: 0.8,
      preload: true,
      onloaderror: (error: any) => {
        console.warn(`Failed to load streak sound:`, error);
      }
    });
  }

  // Play a specific sound
  play(soundType: SoundType) {
    if (!this.soundEnabled) return;
    
    try {
      const sound = this.sounds[soundType];
      if (sound) {
        sound.play();
      }
    } catch (error) {
      console.warn(`Failed to play sound ${soundType}:`, error);
    }
  }

  // Stop a specific sound
  stop(soundType: SoundType) {
    try {
      const sound = this.sounds[soundType];
      if (sound) {
        sound.stop();
      }
    } catch (error) {
      console.warn(`Failed to stop sound ${soundType}:`, error);
    }
  }

  // Set sound enabled/disabled
  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  // Check if sound is enabled
  isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  // Set global volume
  setVolume(volume: number) {
    Howler.volume(volume);
  }

  // Get global volume
  getVolume(): number {
    return Howler.volume();
  }
}

// Create singleton instance
const soundManager = new SoundManager();

export default soundManager;