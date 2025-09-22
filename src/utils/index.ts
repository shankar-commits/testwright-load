import { test } from '@baseTest';
import fs from 'fs';
import path from 'path';

export function getRootDir(): string {
  const currentDir = module.paths.find((p) => fs.existsSync(path.join(p, '../package.json')));
  if (!currentDir) {
    throw new Error('Could not find root directory');
  }
  return path.resolve(currentDir, '..');
}

export function isPerformanceTestRunning(): boolean {
  return (globalThis as any).artilleryTestStep !== undefined;
}

export function performanceTestStep(): any {
  return (globalThis as any).artilleryTestStep;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const testStep = async (stepName: string, action: () => Promise<unknown>): Promise<any> => {
  if (!isPerformanceTestRunning()) {
    return await test.step(stepName, action);
  } else {
    return await action();
  }
};
