import { useState } from "react";
import "./PatientTable.css";

const PatientRecords = () => {
  const patients = [
    {
      id: "PATIENT_1",
      name: "Rita Moos",
      gender: "Male",
      age: 48,
      bloodType: "A+",
      weight: "70 kg",
      bodyMass: "22 kg",
      bmiWeight: "Normal",
    },
    {
      id: "PATIENT_2",
      name: "Simon Rout",
      gender: "Female",
      age: 49,
      bloodType: "B+",
      weight: "64 kg",
      bodyMass: "21 kg",
      bmiWeight: "Normal",
    },
    {
      id: "PATIENT_3",
      name: "Matti More",
      gender: "Male",
      age: 57,
      bloodType: "O+",
      weight: "70 kg",
      bodyMass: "23 kg",
      bmiWeight: "Normal",
    },
    {
      id: "PATIENT_4",
      name: "Pikko Nina",
      gender: "Female",
      age: 53,
      bloodType: "AB+",
      weight: "55 kg",
      bodyMass: "23 kg",
      bmiWeight: "Normal",
    },
    {
      id: "PATIENT_5",
      name: "Fran Tonins",
      gender: "Male",
      age: 48,
      bloodType: "O+",
      weight: "49 kg",
      bodyMass: "34 kg",
      bmiWeight: "Obese",
    },
  ];

  const metrics = [
    { id: 1, value: "80.56 bph", label: "Heart Rate", icon: "❤️" },
    { id: 2, value: "119.43 mmHg", label: "Blood Pressure", icon: "🩸" },
    { id: 3, value: "16 bpm", label: "Respiration Rate", icon: "🌬️" },
    { id: 4, value: "170 mg/dL", label: "Blood Glucose", icon: "🩹" },
    { id: 5, value: "31.60 °C", label: "Body Temperature", icon: "🌡️" },
    { id: 6, value: "210 mg/dL", label: "Blood Cholesterol", icon: "🍔" },
  ];

  const [currentPatient, setCurrentPatient] = useState<string>(
    patients[0].name
  );

  return (
    <div className="table-container max-w-[100vw]">
      <h2>Patient Health Summary</h2>
      <div className="lg:flex flex-row justify-between">
        <table className="patient-table lg:max-w-[60%]">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Blood Type</th>
              <th>Weight</th>
              <th>Body Mass</th>
              <th>BMI Weight</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className={
                  patient.name === currentPatient ? "current-patient" : ""
                }
                onClick={() => setCurrentPatient(patient.name)}
              >
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.gender}</td>
                <td>{patient.age}</td>
                <td>{patient.bloodType}</td>
                <td>{patient.weight}</td>
                <td>{patient.bodyMass}</td>
                <td
                  className={patient.bmiWeight === "Obese" ? "obese" : "normal"}
                >
                  {patient.bmiWeight}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="metrics-container lg:max-w-[40%]">
          {metrics.map((metric) => (
            <div key={metric.id} className="metric-card">
              <div className="metric-value">
                <span className="metric-icon">{metric.icon}</span>
                {metric.value}
              </div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientRecords;
