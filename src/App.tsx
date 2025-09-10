import 'reactflow/dist/style.css';
import { LogsProvider } from './features/logs/LogProvider';
import WorkflowSimulator from './features/workflows/WorkflowSimulator';

const App = () => {
  return (
    <LogsProvider>
      <WorkflowSimulator></WorkflowSimulator>
    </LogsProvider>
  );
};

export default App;
