# JXL Convert

Recursively walks through source directory, converts all supported images to JXL, and prints a summary of the disk space savings of the compression process.

## Setup

Run `npm ci` to install dependencies.

## Usage

```bash
npm start [base_dir]
```

## To do

- [ ] Allow setting options via CLI arguments
- [ ] Rewrite to make processing loop asynchronous and process `X` number of files at a time
- [x] Make basic functionality asynchronous
- [x] Make options configurable
  - [x] Optimization level
  - [x] Path to ImageMagick binary
  - [x] Valid filetypes
- [x] Allow setting options via config file
