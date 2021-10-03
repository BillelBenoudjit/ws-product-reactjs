import Charts from "./components/charts/Charts"
import DataTable from "./components/dataTable/DataTable"
import GeoVisualization from "./components/geoVisualization/GeoVisualization"

import './App.css';
import { Container, Row } from "react-bootstrap";

function App() {
  return (
    < div className="App" >
      <Container>
        <Row>
          <h1>
            EQ Works Internship
          </h1>
        </Row>
        <Row>
          <div>
            <h1 style={{ textAlign: 'left' }}>Charts</h1>
            <Charts />
          </div>
        </Row>
        <Row>
          <div>
            <h1 style={{ textAlign: 'left' }}>Data Tables</h1>
            <DataTable />
          </div>
        </Row>
        <Row>
          <div>
            <h1 style={{ textAlign: 'left' }}>Geo Visualization</h1>
            <GeoVisualization />
          </div>
        </Row>
      </Container>
    </div >
  );
}

export default App;
