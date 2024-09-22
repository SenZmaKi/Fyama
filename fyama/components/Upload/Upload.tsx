import { useState } from "react";

const Upload = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <div className="flex justify-end ">
      <button
        onClick={() => setShowDialog(true)}
        className="bg-blue-500 px-3 py-1 text-white border rounded-md hover:cursor-pointer"
      >
        Upload
      </button>
      {showDialog && <UploadDialog onClose={setShowDialog} />}
    </div>
  );
};

interface UploadDialog {
  onClose: (value: boolean) => void;
}

const UploadDialog: React.FC<UploadDialog> = ({ onClose }) => {
  return (
    <div className="fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.3)] z-50"></div>
  );
};
export default Upload;
