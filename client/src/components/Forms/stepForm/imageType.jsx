import React, { useMemo } from "react";
import { Button } from "@windmill/react-ui";
import { MdCloudUpload } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  color: "black",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
function ImageType({ renderPhotos, title, MultiStepForm, selectMessage }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: MultiStepForm.onDropType,
    maxFiles: String(title).includes("plan") ? 10 : 20
  });
  const { t } = useTranslation();
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : { borderColor: "gray" }),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <div
      className="flex-1"
      style={{
        borderWidth: 2,
        borderRadius: 2,
        borderColor: "#555",
        borderStyle: "dashed",
      }}
    >
      <div className="px-5 py-5 text-center">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {MultiStepForm.selectedType.length === 0 && (
            <div className="cloud-icon">
              {" "}
              <MdCloudUpload
                style={{
                  fontWeight: "700",
                  fontSize: "100px",
                  color: "gray",
                }}
              />
            </div>
          )}
          <p className="my-5">
            <span
              style={{
                fontWeight: "700",
              }}
            >
              {selectMessage}
            </span>{" "}
            {t("for your listing or drag them here.")}
          </p>
          <Button className="bg-blue-500 hover:bg-blue-700 active:bg-blue-800 ringtext-white font-semibold rounded active:ring-blue-300 focus:ring-blue-300 my-5">
            {title} {t("upload")}
          </Button>
        </div>
      </div>
      <div className=" gap-8 grid-cols-6 md:grid-cols-3 my-5 center-center items-center">
        {renderPhotos(MultiStepForm)}
      </div>
    </div>
  );
}

export default ImageType;