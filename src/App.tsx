import { Provider } from 'react-redux';
import './App.css';
import Dashboard from './Page/Dashboard';
import { store } from './Store/Index';

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
