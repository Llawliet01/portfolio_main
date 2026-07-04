'use client';
import { useState } from 'react';
import IntroScreen from './IntroScreen';
import CustomCursor from './CustomCursor';

/**
 * Controls the intro → site transition.
 * - Shows IntroScreen first.
 * - Once it calls onComplete, activates the custom cursor.
 */
export default function IntroManager() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <IntroScreen onComplete={() => setIntroDone(true)} />
      {introDone && <CustomCursor />}
    </>
  );
}
