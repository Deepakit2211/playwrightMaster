import * as fs from 'fs';

export function generateRandomNumber(count:number):number{

    return Math.floor(Math.random()*count);


}

/**
 * Checks whether a storageState file exists AND is still "fresh" (not older
 * than maxAgeMs). Uses the file's last-modified time as a proxy for session age.
 */
export function isStorageStateValid(filePath: string, maxAgeMs: number): boolean {
    if (!fs.existsSync(filePath)) {
        return false;
    }

    const stats = fs.statSync(filePath);
    const ageMs = Date.now() - stats.mtimeMs;

    return ageMs < maxAgeMs;
}