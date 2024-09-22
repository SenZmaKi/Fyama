import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";

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
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const clickableElement = useRef(null);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    // fetch("YOUR_UPLOAD_ENDPOINT", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("File uploaded successfully:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error uploading file:", error);
    //   });
  };

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        clickableElement.current &&
        !clickableElement.current.contains(event.target)
      ) {
        onClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 justify-center items-center flex">
      <div
        ref={clickableElement}
        className="lg:min-w-[65%] rounded-lg lg:max-w-[65%] bg-white p-4"
      >
        <div className="flex justify-end">
          <IoIosClose onClick={() => onClose(false)} size={30} />
        </div>
        <div>
          <h3 className="text-center">Upload patient data</h3>
        </div>
        <div className="mt-3 border-[1px] py-32 border-red-500 rounded-md border-dashed">
          <p className="text-center text-lg">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept=".csv"
            />
            <span
              onClick={triggerUpload}
              className="text-blue-500 hover:cursor-pointer"
            >
              Click here
            </span>{" "}
            to upload file
          </p>
        </div>
      </div>
    </div>
  );
};
export default Upload;
