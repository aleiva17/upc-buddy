import {ChangeEvent, ReactElement, useState} from "react";
import {toast} from "react-toastify";
import {JsonCoursesPreview} from "./JsonCoursesPreview.tsx";
import {Course} from "../../grades-calculator/models/course.entity.ts";
import {Button} from "primereact/button";
import {useCoursesStore} from "../../grades-calculator/stores/coursesStore.ts";


type UploadCoursesDataFormProps = {
  closeDialog: () => void;
}

export const UploadCoursesDataForm = ({ closeDialog }: UploadCoursesDataFormProps): ReactElement => {
  const [jsonData, setJsonData] = useState<object | null>(null);
  const [fileName, setFileName] = useState("");
  const setCourses = useCoursesStore((state) => state.setCourses);


  const uploadJson = () => {
    setCourses(jsonData as Array<Course>);
    setJsonData(null);
    toast.success("Data restored from file successfully");
    closeDialog();
  }

  const handleOnJsonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    if (!file) return;

    setFileName(file.name);

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setJsonData(json);
        toast.success("JSON loaded successfully");
      } catch (error) {
        toast.error("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  }


  return (
    <div>
      {
        jsonData == null ?
          <div className="relative flex items-center justify-center bg-white rounded-2xl border-2 border-black border-dashed h-32 w-full">
            <p className="absolute"><span className="font-semibold text-center text-blue-600">Drag</span> & <span className="font-semibold text-blue-600">Drop</span> file or <span className="font-semibold text-blue-600">Browse</span></p>
            <input
              className="hover:cursor-pointer h-full w-full opacity-0"
              type="file"
              accept=".json"
              multiple={false}
              onChange={ handleOnJsonChange }
            />
          </div>
          :
          <>
            <JsonCoursesPreview
              fileName={fileName}
              courses={ jsonData as Array<Course> }
            />
            <div className="flex justify-center items-center gap-2 mt-4">
              <Button
                label="Confirm"
                onClick={ uploadJson }
                severity="success"
                icon="pi pi-check"
              />
              <Button
                label="Cancel"
                onClick={ () => setJsonData(null) }
                severity="danger"
                icon="pi pi-times"
              />
            </div>
          </>
      }
    </div>
  );
};