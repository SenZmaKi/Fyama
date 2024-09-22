import PatientRecords from "@/components/PatientRecords/PatientRecords";
import Upload from "@/components/Upload/Upload";

const DashBoard = () => {
  return (
    <div className="">
      <Upload />
      <div className="">
        <PatientRecords />
      </div>
      <div className="bottom-list"></div>
    </div>
  );
};

export default DashBoard;
