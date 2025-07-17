import { Landing } from './components/Landing';
import { DevModeApp, Container } from './lib/dev-container';
import { componentRegistry, COMPONENT_IDS } from './registry';

function App() {
  return (
    <DevModeApp registry={componentRegistry}>
      <Container componentId={COMPONENT_IDS.APP_ROOT}>
        <div className="App">
          <Landing />
        </div>
      </Container>
    </DevModeApp>
  );
}

export default App;