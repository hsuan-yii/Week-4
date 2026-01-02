
export enum EmotionType {
  HAPPY = 'Happy',
  SAD = 'Sad',
  ANGRY = 'Angry',
  SURPRISED = 'Surprised',
  SHY = 'Shy',
  SLEEPY = 'Sleepy',
  PROUD = 'Proud'
}

export enum ObjectShape {
  CIRCLE = 'Circle',
  SQUARE = 'Square',
  TRIANGLE = 'Triangle',
  CAPSULE = 'Capsule'
}

export interface MoodData {
  thought: string;
  color: string;
  emoji: string;
}
