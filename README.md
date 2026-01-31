# Leo Backend

A TypeScript isomorphic framework for building modern backends, libraries, and applications.

## Features

- **TypeScript** – Full TypeScript support for type-safe development
- **Angular** – Angular libraries and PWA apps
- **Node.js** – Backend APIs deployable on any server
- **Electron** – Desktop application support
- **TypeORM** – Database ORM with SQL.js, MySQL, MariaDB
- **Express** – REST API server with middleware support

## Requirements

- **Node.js** >= 22
- **Git** (Git Bash or PowerShell on Windows)
- **Linux**: Increase watchers limit if needed:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
  ```

## Supported Platforms

- Windows 10/11 (Git Bash, PowerShell)
- macOS
- Linux

## Installation

```bash
npm install
```

## Usage

```bash
# Start development server
npm run leo start

# Build library
npm run leo build:lib

# Run migrations
npm run leo migration:run
```

## Project Structure

```
├── src/           # Source code
├── bin/           # CLI entry points
├── environments/  # Environment configs
└── docs/          # Documentation
```

## Repository

- **GitHub:** [https://github.com/leomark-sio/leo-backend](https://github.com/leomark-sio/leo-backend)

## Contact

- **Email:** [leomarksio386@gmail.com](mailto:leomarksio386@gmail.com)
- **GitHub:** [https://github.com/leomark-sio](https://github.com/leomark-sio)

## License

MIT
