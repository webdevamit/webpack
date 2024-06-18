import App from './App';
import ReactDOM from 'react-dom/client';
import './index.css';
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
