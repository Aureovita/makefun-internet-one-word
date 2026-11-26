// Entry for the make.fun bounty "The Internet in One Word".
//
// The whole internet, summed up in a single word: Catfished.
// Nothing online is quite what it claims to be — the profiles, the
// photos, the follower counts, the five-star reviews. This program
// does one small, honest thing in response: it writes that word,
// exactly as given, to entry.txt in the output directory.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry itself. One word, no decoration.
const WORD = 'Catfished';

// The word has to stay a word: non-empty, at most 140 characters,
// and free of any whitespace (spaces, tabs, newlines) that would
// smuggle in a second word or a stray line break.
function validateWord(word: string): void {
  if (word.length === 0) {
    throw new Error('the entry word is empty');
  }
  if (word.length > 140) {
    throw new Error(`the entry word is ${word.length} characters; the limit is 140`);
  }
  if (/\s/.test(word)) {
    throw new Error('the entry must be a single word with no whitespace');
  }
}

// Where the grader expects the entry file: the directory named by
// MAKEFUN_OUTPUT_DIR, or /output when the variable is not set.
function outputDirectory(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  return fromEnv !== undefined && fromEnv !== '' ? fromEnv : '/output';
}

function main(): void {
  validateWord(WORD);

  const dir = outputDirectory();
  mkdirSync(dir, { recursive: true });

  // The word plus exactly one trailing newline, encoded as UTF-8,
  // so every run produces byte-identical output.
  const target = join(dir, 'entry.txt');
  writeFileSync(target, WORD + '\n', 'utf8');

  // Echo the word to stdout so the operator's log shows what was
  // entered without having to open the file.
  console.log(`entry written to ${target}: ${WORD}`);
}

main();
