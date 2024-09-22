import PatientRecords from "@/components/PatientRecords/PatientRecords";
import Upload from "@/components/Upload/Upload";
import Visual from "@/components/Visual/Visual";

const DashBoard = () => {
  return (
    <div className="">
      <Upload />
      <Visual />
      <div className="">
        <PatientRecords />
      </div>
      <div className="bottom-list"></div>
    </div>
  );
};

export default DashBoard;
