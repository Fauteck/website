/**
 * Bildmasse aus dem Dateikopf lesen — ohne Abhaengigkeit.
 *
 * Bewusst kein sharp/ImageMagick: der Guard laeuft in GitHub Actions, und dort
 * soll ausser Node nichts noetig sein. Fuer JPEG, PNG und WebP reicht der
 * Header; mehr Formate liegen nicht im Repo (und der Guard sagt Bescheid,
 * wenn sich das aendert).
 */
import { readFileSync } from 'node:fs';

function pngSize(buf) {
  // IHDR steht immer als erster Chunk ab Byte 16.
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  let i = 2; // FF D8 uebersprungen
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    // SOF0..SOF15, ohne DHT (C4), DNL (C8) und DAC (CC) — die tragen keine Masse.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) { i += 2; continue; }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function webpSize(buf) {
  const fourcc = buf.toString('ascii', 12, 16);
  if (fourcc === 'VP8 ') {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fourcc === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (fourcc === 'VP8X') {
    const w = buf[24] | (buf[25] << 8) | (buf[26] << 16);
    const h = buf[27] | (buf[28] << 8) | (buf[29] << 16);
    return { width: w + 1, height: h + 1 };
  }
  return null;
}

export function imageSize(file) {
  const buf = readFileSync(file);
  if (buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') return pngSize(buf);
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) return jpegSize(buf);
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return webpSize(buf);
  }
  return null;
}
