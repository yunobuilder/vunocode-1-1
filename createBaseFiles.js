const fs = require('fs');
const files = [
  { path: 'pages/index.jsx', content: "export default function Home() { return <h1>VUNOCode - Home</h1>; }" },
  { path: 'pages/_app.jsx', content: "import '../styles/globals.css'; export default function MyApp({ Component, pageProps }) { return <Component {...pageProps} />; }" },
  { path: 'components/Header.jsx', content: "export default function Header() { return <header>Header VUNOCode</header>; }" },
  { path: 'components/Footer.jsx', content: "export default function Footer() { return <footer>Footer VUNOCode</footer>; }" },
  { path: 'styles/globals.css', content: "@tailwind base;\n@tailwind components;\n@tailwind utilities;" }
];

files.forEach(file => {
  if (!fs.existsSync(file.path)) {
    fs.writeFileSync(file.path, file.content);
    console.log(`Arquivo criado: ${file.path}`);
  } else {
    console.log(`Arquivo já existe: ${file.path}`);
  }
});
