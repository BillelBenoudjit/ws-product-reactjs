import Charts from "./components/charts/Charts"
import DataTable from "./components/dataTable/DataTable"
import GeoVisualization from "./components/geoVisualization/GeoVisualization"

import './App.css';
import { Container } from "react-bootstrap";

function App() {
  return (
    < div className="App" >
      <Container>
        <h1>
          EQ Works Internship
      </h1>
        <div>
          <h1 style={{ textAlign: 'left' }}>Charts</h1>
          <Charts />
        </div>
        <div>
          <h1 style={{ textAlign: 'left' }}>Data Tables</h1>
          <DataTable />
        </div>
        <div>
          <h1 style={{ textAlign: 'left' }}>Geo Visualization</h1>
          <GeoVisualization />
        </div>
      </Container>
    </div >
  );
}

export default App;
