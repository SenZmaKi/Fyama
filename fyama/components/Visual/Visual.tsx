import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryStack,
  VictoryTheme,
} from "victory";

const Visual = () => {
  const patientData = [
    { month: "Jan 18", patients: 1500, cost: 3500 },
    { month: "Feb 18", patients: 1700, cost: 4000 },
    { month: "Mar 18", patients: 1400, cost: 3200 },
    { month: "Apr 18", patients: 1800, cost: 4500 },
    { month: "May 18", patients: 1600, cost: 3800 },
    { month: "Jun 18", patients: 1900, cost: 4700 },
    { month: "Jul 18", patients: 1750, cost: 4300 },
    { month: "Aug 18", patients: 1600, cost: 3900 },
    { month: "Sep 18", patients: 1850, cost: 4600 },
    { month: "Oct 18", patients: 2000, cost: 5000 },
    { month: "Nov 18", patients: 1900, cost: 4900 },
    { month: "Dec 18", patients: 1800, cost: 4600 },
  ];

  const ageBmiData = [
    { x: "20-30 years", Normal: 12, Overweight: 8, Obese: 5 },
    { x: "31-40 years", Normal: 15, Overweight: 10, Obese: 7 },
    { x: "41-50 years", Normal: 10, Overweight: 12, Obese: 8 },
    { x: "51-60 years", Normal: 8, Overweight: 7, Obese: 9 },
    { x: "61-70 years", Normal: 5, Overweight: 6, Obese: 4 },
  ];

  return (
    <div>
      <div className="lg:flex flex-row">
        <div className="pie2">
          <div className="max-w-[700px]">
            <VictoryChart
              width={800}
              theme={VictoryTheme.material}
              domainPadding={20}
            >
              {/* X-axis for months */}
              <VictoryAxis
                tickValues={patientData.map((d) => d.month)}
                tickFormat={patientData.map((d) => d.month)}
              />

              {/* Y-axis for patients and cost */}
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `$${x / 1000}k`} // Format cost values
              />

              {/* Area chart for costs */}
              <VictoryArea
                style={{
                  data: { fill: "rgba(0, 188, 212, 0.3)", stroke: "#00ACC1" },
                }}
                data={patientData}
                x="month"
                y="cost"
              />

              {/* Bar chart for patient numbers */}
              <VictoryBar
                style={{ data: { fill: "#0277BD" } }}
                data={patientData}
                x="month"
                y="patients"
                barWidth={15}
              />
            </VictoryChart>
            <VictoryChart theme={VictoryTheme.material}>
              {/* X-axis for age groups */}
              <VictoryAxis />

              {/* Y-axis for patient counts */}
              <VictoryAxis dependentAxis tickFormat={(x) => `${x}`} />

              <VictoryStack colorScale={["#4caf50", "#ff9800", "#f44336"]}>
                {/* Normal BMI */}
                <VictoryBar data={ageBmiData} x="x" y="Normal" />
                {/* Overweight BMI */}
                <VictoryBar data={ageBmiData} x="x" y="Overweight" />
                {/* Obese BMI */}
                <VictoryBar data={ageBmiData} x="x" y="Obese" />
              </VictoryStack>
            </VictoryChart>
          </div>
        </div>
        <div className="pie2">
          <div className="max-w-[300px]">
            <h3 className="text-center">Overall Patient Bloodtypes</h3>
            <VictoryPie
              animate={{
                duration: 2000,
              }}
              innerRadius={85}
              colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
              data={[
                { x: "A+", y: 10 },
                { x: "B+", y: 8 },
                { x: "O+", y: 12 },
                { x: "AB+", y: 5 },
              ]}
            />
            <h3 className="text-center">Gender vs. Blood Type</h3>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 1, y: 5 }}
              height={180}
            >
              {/* Y Axis (Blood Types) */}
              <VictoryAxis />
              <VictoryBar
                horizontal
                style={{
                  data: { fill: "#c43a31" },
                }}
                labels={({ datum }) => `${(datum.y / 100) * 100}%`}
                animate={{
                  duration: 2000,
                }}
                barWidth={30}
                data={[
                  { x: "Male", y: 45 },
                  { x: "Female", y: 55 },
                  { x: "Other", y: 10 },
                ]}
              />
            </VictoryChart>
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={{ x: 1, y: 5 }}
              height={400}
            >
              {/* Y Axis (Blood Types) */}
              <VictoryAxis />
              <VictoryBar
                horizontal
                barWidth={30}
                style={{
                  data: { fill: "#c43a31" },
                }}
                labels={({ datum }) => `${(datum.y / 100) * 100}%`}
                animate={{
                  duration: 2000,
                }}
                data={[
                  { x: "A+", y: 30 },
                  { x: "A-", y: 15 },
                  { x: "B+", y: 20 },
                  { x: "B-", y: 10 },
                  { x: "O+", y: 40 },
                  { x: "O-", y: 5 },
                  { x: "AB+", y: 8 },
                  { x: "AB-", y: 2 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visual;
