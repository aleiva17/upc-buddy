import {Button} from "primereact/button";
import {useCoursesStore} from "../../grades-calculator/stores/coursesStore.ts";
import {useState} from "react";
import {Dialog} from "primereact/dialog";
import {UploadCoursesDataForm} from "./UploadCoursesDataForm.tsx";


export const HandleUploadDownloadData = () => {
  const courses = useCoursesStore((state) => state.courses);
  const [uploadDialogIsVisible, setUploadDialogIsVisible] = useState<boolean>(false);

  const downloadCourses = () => {
    const jsonBlob = new Blob([JSON.stringify(courses, null, 2)], {
      type: 'application/json',
    });

    const url = window.URL.createObjectURL(jsonBlob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'upc-buddy-courses.json';
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  return (
    <section className="py-4">
      <h3 className="text-xl font-semibold mb-4">Download or Upload data</h3>
      <div className="flex gap-2">
        <Button
          icon="pi pi-download"
          severity="success"
          onClick={ downloadCourses }
          label="Download courses"
        />
        <Button
          icon="pi pi-upload"
          severity="warning"
          onClick={ () => setUploadDialogIsVisible(true) }
          label="Upload courses"
        />
      </div>
      <Dialog
        header="Upload courses data"
        className="!w-[90%] md:!w-1/2 lg:!w-fit"
        onHide={ () => setUploadDialogIsVisible(false) }
        visible={ uploadDialogIsVisible }
        draggable={false}
      >
        <UploadCoursesDataForm
          closeDialog={ () => setUploadDialogIsVisible(false) }
        />
      </Dialog>
    </section>
  );
};