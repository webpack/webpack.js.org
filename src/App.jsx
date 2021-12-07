import Site from './components/Site/Site';
export default function App() {
  return <Site import={(path) => import(`./content/${path}`)} />;
}
