# Fishing Line Calculator

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

Fishing Line Calculator is a web application that helps anglers calculate the amount of backing and/or main line required to spool a fishing reel. It supports both metric and imperial units, is mobile-friendly, and features a modern, accessible UI.

![Screenshot](Website-Images/home.png)

## Features

* **Instant Calculation**: Get the required length of main line or backing line for your reel.
* **Unit Conversion**: Switch between metric (mm, m) and imperial (in, ft) units.
* **Responsive Design**: Optimized for both desktop and mobile devices.
* **Modern UI**: Built with Next.js, React, Mantine, and CSS Modules.
* **Dark/Light Mode**: Adapts to your system color scheme.
* **Input Validation**: Warns if the main line exceeds reel capacity.

---

## How to Run the Project

<details>
<summary>View Instructions</summary>

### 1. Clone the Repository

```bash
git clone https://github.com/Noah-Bakr/Fishing-Line-Calculator.git
cd Fishing-Line-Calculator
```

### 2. Install Dependencies

Make sure you have **Node.js (v18+)** and npm installed. Then run:

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the calculator.

</details>

---

## Usage

* Select the calculator type (Single Line or Backing Line).
* Enter your reel and line measurements.
* Instantly see the calculated result, with unit conversion support.
* The app will warn you if your main line exceeds the reel's capacity.

---

## Project Structure

```bash
Fishing-Line-Calculator/
├── package.json                # Project metadata and dependencies
├── next.config.ts              # Next.js configuration and runtime options
├── postcss.config.cjs          # PostCSS config for Mantine and CSS processing
├── public/                     # Static assets (background image, icons, etc.)
├── src/
│   └── app/
│       ├── layout.tsx          # Root layout, global providers, and fonts
│       ├── globals.css         # Global styles and background image/overlay
│       ├── page.tsx            # Main calculator UI and logic
│       ├── page.module.css     # Calculator-specific styles (responsive, modern)
│       └── ...                 # Other app routes/components
├── .gitignore                  # Files and folders to ignore in git
└── README.md                   # Project documentation
```

---

## Dependencies

| Package                   | Description                                                        |
|---------------------------|--------------------------------------------------------------------|
| `react`                   | JavaScript library for building UI                                 |
| `next`                    | React framework for SSR and routing                                |
| `typescript`              | Static typing for JavaScript                                       |
| `jest`                    | Testing framework                                                  |
| `@testing-library/react`  | Unit testing library for React components                          |
| `nodemon`                 | Utility that automatically restarts the server on file changes     |
| `eslint`                  | Linter for JavaScript/TypeScript                                   |
| `@mantine/core`           | Component library                                                  |

---

## Assets

All images and icons used in the project are sourced from royalty-free websites:

* Images: [Adobe Stock](https://stock.adobe.com)
