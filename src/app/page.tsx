"use client"

import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import { SegmentedControl } from '@mantine/core';

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
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Conversion helpers
  // const mmToInches = (mm: number) => mm / 25.4;
  const inchesToMm = (inches: number) => inches * 25.4;
  const mToFeet = (m: number) => m * 3.28084;
  const feetToM = (feet: number) => feet / 3.28084;

  // Calculate result automatically
  useEffect(() => {
    if (mode === 'single') {
      const { reelCapacityDiameter, reelCapacityLength, mainLineDiameter } = inputs;
      if (reelCapacityDiameter && reelCapacityLength && mainLineDiameter) {
        let rcd = Number(reelCapacityDiameter);
        let rcl = Number(reelCapacityLength);
        let mld = Number(mainLineDiameter);
        if (unitSystem === 'imperial') {
          rcd = inchesToMm(rcd);
          rcl = feetToM(rcl);
          mld = inchesToMm(mld);
        }
        const mainLineLength = (rcl * Math.pow(rcd, 2)) / Math.pow(mld, 2);
        const displayLength = unitSystem === 'imperial' ? mToFeet(mainLineLength) : mainLineLength;
        const rounded = Math.round(displayLength * 100) / 100;
        const unit = unitSystem === 'imperial'
          ? (rounded === 1 ? 'foot' : 'feet')
          : (rounded === 1 ? 'meter' : 'meters');
        setResult(`You need ${rounded} ${unit} of main line.`);
      } else {
        setResult('');
      }
    } else {
      const { reelCapacityDiameter, reelCapacityLength, backingDiameter, mainLineDiameter, mainLineLength } = inputs;
      if (reelCapacityDiameter && reelCapacityLength && backingDiameter && mainLineDiameter && mainLineLength) {
        let rcd = Number(reelCapacityDiameter);
        let rcl = Number(reelCapacityLength);
        let bd = Number(backingDiameter);
        let mld = Number(mainLineDiameter);
        let mll = Number(mainLineLength);
        if (unitSystem === 'imperial') {
          rcd = inchesToMm(rcd);
          rcl = feetToM(rcl);
          bd = inchesToMm(bd);
          mld = inchesToMm(mld);
          mll = feetToM(mll);
        }
        const backingLineLength = (rcl * Math.pow(rcd, 2) - mll * Math.pow(mld, 2)) / Math.pow(bd, 2);
        const displayLength = unitSystem === 'imperial' ? mToFeet(backingLineLength) : backingLineLength;
        const rounded = Math.round(displayLength * 100) / 100;
        const unit = unitSystem === 'imperial'
          ? (Math.abs(rounded) === 1 ? 'foot' : 'feet')
          : (Math.abs(rounded) === 1 ? 'meter' : 'meters');
        if (rounded < 0) {
          setResult(`The main line length exceeds the capacity of the reel by ${Math.abs(rounded)} ${unit}.`);
        } else {
          setResult(`You need ${rounded} ${unit} of backing line.`);
        }
      } else {
        setResult('');
      }
    }
  }, [inputs, mode, unitSystem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.squareWrapper}>
          <div className={styles.squareWrapperHeading}>
            <h1>Fishing Line Calculator</h1>
            <p>An online tool to calculate the amount of backing and/or main line required to spool a reel.</p>
          </div>
          <div className={styles.controls}>
            <SegmentedControl
              value={mode}
              onChange={(value) => setMode(value as 'single' | 'backing')}
              data={[
                { label: 'Single Line', value: 'single' },
                { label: 'Backing Line', value: 'backing' },
              ]}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
            <SegmentedControl
              value={unitSystem}
              onChange={(value) => setUnitSystem(value as 'metric' | 'imperial')}
              data={[
                { label: 'Metric (mm, m)', value: 'metric' },
                { label: 'Imperial (in, ft)', value: 'imperial' },
              ]}
              fullWidth
              style={{ marginBottom: '1rem' }}
            />
          </div>
          <div className={styles.result}>
            <p>{result ? result : "Please enter your inputs below to see the result."}</p>
          </div>

          <form className={styles.calculatorForm}>
            <label>
              Reel Capacity Diameter ({unitSystem === 'imperial' ? 'inches' : 'mm'}):
              <input
                type="number"
                name="reelCapacityDiameter"
                value={inputs.reelCapacityDiameter}
                onChange={handleInputChange}
                step="any"
              />
            </label>
            <label>
              Reel Capacity Length ({unitSystem === 'imperial' ? 'feet' : 'm'}):
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
                  Backing Diameter ({unitSystem === 'imperial' ? 'inches' : 'mm'}):
                  <input
                    type="number"
                    name="backingDiameter"
                    value={inputs.backingDiameter}
                    onChange={handleInputChange}
                    step="any"
                  />
                </label>
                <label>
                  Main Line Diameter ({unitSystem === 'imperial' ? 'inches' : 'mm'}):
                  <input
                    type="number"
                    name="mainLineDiameter"
                    value={inputs.mainLineDiameter}
                    onChange={handleInputChange}
                    step="any"
                  />
                </label>
                <label>
                  Main Line Length ({unitSystem === 'imperial' ? 'feet' : 'm'}):
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
                Main Line Diameter ({unitSystem === 'imperial' ? 'inches' : 'mm'}):
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
          {/* <a
            className={styles.primary}
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            Backing Line + Main Line
          </a> */}
          {/* <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a> */}
          {/* <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Single Line (Main Line Only)
          </a> */}
        </div>
      </main>
      {/* <footer className={styles.footer}>
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
      </footer> */}
    </div>
  );
}
