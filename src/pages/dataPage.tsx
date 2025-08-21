import Graph from "../components/dataPage/Graph";
import yearlyForecast from "../data/yearlyForecast.json";
import facilityNeeds from "../data/facilityNeeds.json";

const DataPage = () => {
  return (
    <div>
      <div style={{ width: "700px", height: "550px", margin: "50px auto" }}>
        <Graph {...yearlyForecast} datasets={yearlyForecast.datasets as any} />
      </div>
      <div style={{ width: "700px", height: "550px", margin: "50px auto" }}>
        <Graph {...facilityNeeds} datasets={facilityNeeds.datasets as any} />
      </div>
    </div>
  );
};

export default DataPage;
