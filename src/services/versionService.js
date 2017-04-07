import fs from 'fs';
import { getConfig } from '../config';

export function getApiVersion() {
    return JSON.parse(fs.readFileSync(getConfig().path.versionFile, 'utf8')).version;
}