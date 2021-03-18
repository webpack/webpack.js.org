import { Route } from 'react-router-dom';
import Site from './components/Site/Site';
export default function App() {
  return (
    <Route
      path="/"
      render={(props) => (
        <Site {...props} import={(path) => import(`./content/${path}`)} />
      )}
    />
  );
}
