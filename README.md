# JXL Convert

Recursively walks through source directory, converts all supported images to JXL, and prints a summary of the disk space savings of the compression process.

## Setup

Run `npm ci` to install dependencies.

## Usage

```bash
npm start [base_dir]
```

## To do

- [ ] Make options configurable
  - [ ] Optimization level
  - [ ] Path to ImageMagick binary in CLI arguments
  - [ ] Valid filetypes
- [ ] Allow setting options via CLI arguments
- [ ] Allow setting options via config file
