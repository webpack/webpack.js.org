import Site from "./components/Site/Site.jsx";

export default function App() {
  return <Site import={(path) => import(`./content/${path}`)} />;
}
