export const PROJEKT_REPO_URL = "https://github.com/saadh393/Projekt";
export const PROJEKT_RELEASES_URL = `${PROJEKT_REPO_URL}/releases/latest`;
export const PROJEKT_ISSUES_URL = `${PROJEKT_REPO_URL}/issues`;
export const PROJEKT_LATEST_RELEASE_API =
    "https://api.github.com/repos/saadh393/Projekt/releases/latest";

export const PROJEKT_DESCRIPTION =
    "Projekt is a free desktop app for macOS and Windows that keeps all your coding projects in one place. Open any project in VS Code or the terminal with one click and run commands like npm run dev or docker compose up without typing them again.";

export const PROJEKT_PLATFORMS = {
    mac: {
        label: "macOS",
        assetSuffix: "_macos_universal.dmg",
        note: "Works on Apple Silicon and Intel Macs.",
        firstLaunch: "The first time you open it, right-click Projekt in Applications and choose Open.",
    },
    windows: {
        label: "Windows",
        assetSuffix: "_windows_x64-setup.exe",
        note: "Works on 64-bit Windows 10 and 11.",
        firstLaunch: "If SmartScreen shows a warning, click More info and then Run anyway.",
    },
} as const;

export type ProjektPlatform = keyof typeof PROJEKT_PLATFORMS;

export const PROJEKT_PROBLEMS = [
    {
        title: "All your projects in one list",
        body: "Add a project folder once and it stays in your list with its path, tags and color. Search by name, tag or path instead of digging through Finder or File Explorer.",
        image: "/projekt/projects-list.webp",
        alt: "Projekt showing a list of projects grouped under section dividers",
    },
    {
        title: "Open your editor or terminal in one click",
        body: "Right-click a project to open it in VS Code, Antigravity, Finder or Terminal. You can add any other app you use as a launcher.",
        image: "/projekt/open-in-tools.webp",
        alt: "Right-click menu with options to open a project in Finder, VS Code, Antigravity or Terminal",
    },
    {
        title: "Run the commands you type every day",
        body: "Save commands like npm run dev, docker compose up or git pull with each project and run them with one click. They can run in your own terminal app or in the terminal built into Projekt.",
        image: "/projekt/commands.webp",
        alt: "Project panel with a saved Run Dev command and its run button",
    },
    {
        title: "Organize it the way you work",
        body: "Group projects by client, team or side project. Add dividers, drag projects into the order you want and Projekt opens right where you left off.",
        image: "/projekt/categories.webp",
        alt: "Creating a new category in Projekt with an icon and color picker",
    },
] as const;

export const PROJEKT_FAQ = [
    {
        question: "What is Projekt?",
        answer: "Projekt is a desktop app that keeps all your local coding projects in one place. From one window you can open any project in your code editor, file manager or terminal and run the commands you use often.",
    },
    {
        question: "Is Projekt free?",
        answer: "Yes. Projekt is free to download and use, and the source code is on GitHub.",
    },
    {
        question: "Which operating systems does Projekt support?",
        answer: "Projekt runs on macOS (Apple Silicon and Intel) and on 64-bit Windows 10 and 11. Linux is not supported yet.",
    },
    {
        question: "Why does my computer warn me when I open Projekt?",
        answer: "Projekt is not signed with a paid Apple or Microsoft developer certificate yet, so your system asks you to confirm the first launch. On macOS right-click the app and choose Open. On Windows click More info and then Run anyway. You only need to do this once.",
    },
    {
        question: "Can I run commands like npm run dev or docker compose up?",
        answer: "Yes. Save any shell command with a project and run it with one click. Choose whether it opens in your own terminal app or in the terminal panel inside Projekt. Commands you use everywhere can be set up once in Settings and added to any project.",
    },
    {
        question: "Where does Projekt store my data?",
        answer: "Everything stays on your computer in a local database. There is no account to create and Projekt does not upload your projects anywhere.",
    },
    {
        question: "How can I contribute to Projekt?",
        answer: "Open an issue on GitHub to report a bug or suggest an idea, or send a pull request. To run it locally, clone the repository, run npm install and then npm run tauri:dev. You need Node.js and the Rust toolchain installed.",
    },
] as const;
