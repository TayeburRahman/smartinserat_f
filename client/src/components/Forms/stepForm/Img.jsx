import React, { useRef, useState } from "react";
import { Button, Input } from "@windmill/react-ui";
import { DeleteIcon, EditIcon } from "../../../icons";
function Img({ photo, element, file, index, handleChange, t, removeImage }) {
  const [read, setRead] = useState(true);
  const refInput = useRef();
  element.imgDetails =
    element.imgDetails.length > 0 ? element.imgDetails : file.name;
  return (
    <div className="px-4 pt-8 pb-8 bg-gray-100">
      <div className="flex gap-4" key={index}>
        <div className="flex-1">
          <div className="w-full h-40">
            <img src={photo} alt="" key={photo} className="w-full h-full object-cover" />
          </div>
          <p className="text-xs py-2">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>

        <div className="flex-1">
          <Input
            className={`text-center text-black my-2 ring-0 ${read && "border-0 bg-transparent"}`}
            readOnly={read}
            placeholder={t("enter image details")}
            type="text"
            name="imgDetails"
            value={element.imgDetails}
            onChange={(e) => !read && handleChange(index, e)}
            ref={refInput}
          />
          <Button
            layout=""
            onClick={() => {
              read ? refInput.current.focus() : refInput.current.blur();
              read ? refInput.current.select() : refInput.current.blur();
              setRead(!read);
            }}
            className={`${
              !read
                ? "bg-blue-500 hover:bg-blue-600 text-white text-[5px]"
                : "  hover:bg-gray-300 text-black text-[5px]"
            }  text-[10px] mt-1 w-full px-0`}
            size="small"
          >
            {read && <EditIcon className="w-4 mr-1" />}
            {read ? t("Titel ändern") : t("Titel speichern")}
          </Button>
          <Button
            layout=""
            iconLeft={DeleteIcon}
            onClick={(e) => removeImage(photo, file, index)}
            className="w-full mx-auto mt-1 bg-red-600 hover:bg-red-600 text-white hover:text-white"
            size="small"
          >
            {t("Entfernen")}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Img;