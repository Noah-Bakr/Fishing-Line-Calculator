"use client"

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function Home() {
  const [mode, setMode] = useState<'single' | 'backing'>('single');
  const [inputs, setInputs] = useState({
    reelCapacityDiameter: '',
    reelCapacityLength: '',
    backingDiameter: '',
    mainLineDiameter: '',
    mainLineLength: '',
  });
  const [result, setResult] = useState<string>('');

  // Calculate result automatically
  useEffect(() => {
    if (mode === 'single') {
      const { reelCapacityDiameter, reelCapacityLength, mainLineDiameter } = inputs;
      if (reelCapacityDiameter && reelCapacityLength && mainLineDiameter) {
        const mainLineLength = (Number(reelCapacityLength) * Math.pow(Number(reelCapacityDiameter), 2)) / Math.pow(Number(mainLineDiameter), 2);
        setResult(`You need ${Math.round(mainLineLength * 100) / 100} meters of main line.`);
      } else {
        setResult('');
      }
    } else {
      const { reelCapacityDiameter, reelCapacityLength, backingDiameter, mainLineDiameter, mainLineLength } = inputs;
      if (reelCapacityDiameter && reelCapacityLength && backingDiameter && mainLineDiameter && mainLineLength) {
        const backingLineLength = (Number(reelCapacityLength) * Math.pow(Number(reelCapacityDiameter), 2) - Number(mainLineLength) * Math.pow(Number(mainLineDiameter), 2)) / Math.pow(Number(backingDiameter), 2);
        setResult(`You need ${Math.round(backingLineLength * 100) / 100} meters of backing line.`);
      } else {
        setResult('');
      }
    }
  }, [inputs, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.squareWrapper}>
          <h1>Fishing Line Calculator</h1>
          <p>An online tool to calculate the amount of backing and/or main line required to spool a reel.</p>
          {result && <div className={styles.result}>{result}</div>}
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setMode(mode === 'single' ? 'backing' : 'single')}
            style={{ marginBottom: '1rem' }}
          >
            Switch to {mode === 'single' ? 'Backing Line' : 'Single Line'} Calculator
          </button>
          <form className={styles.calculatorForm}>
            <label>
              Reel Capacity Diameter (mm):
              <input
                type="number"
                name="reelCapacityDiameter"
                value={inputs.reelCapacityDiameter}
                onChange={handleInputChange}
                step="any"
              />
            </label>
            <label>
              Reel Capacity Length (m):
              <input
                type="number"
                name="reelCapacityLength"
                value={inputs.reelCapacityLength}
                onChange={handleInputChange}
                step="any"
              />
            </label>
            {mode === 'backing' && (
              <>
                <label>
                  Backing Diameter (mm):
                  <input
                    type="number"
                    name="backingDiameter"
                    value={inputs.backingDiameter}
                    onChange={handleInputChange}
                    step="any"
                  />
                </label>
                <label>
                  Main Line Diameter (mm):
                  <input
                    type="number"
                    name="mainLineDiameter"
                    value={inputs.mainLineDiameter}
                    onChange={handleInputChange}
                    step="any"
                  />
                </label>
                <label>
                  Main Line Length (m):
                  <input
                    type="number"
                    name="mainLineLength"
                    value={inputs.mainLineLength}
                    onChange={handleInputChange}
                    step="any"
                  />
                </label>
              </>
            )}
            {mode === 'single' && (
              <label>
                Main Line Diameter (mm):
                <input
                  type="number"
                  name="mainLineDiameter"
                  value={inputs.mainLineDiameter}
                  onChange={handleInputChange}
                  step="any"
                />
              </label>
            )}
          </form>
        </div>

        <div className={styles.ctas}>
          {/* <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a> */}
          <a
            className={styles.primary}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Backing Line + Main Line
          </a>
          {/* <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a> */}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Single Line (Main Line Only)
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
