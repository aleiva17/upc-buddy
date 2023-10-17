import {Dialog} from "primereact/dialog";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {toast} from "react-toastify";

type AddCourseFormProps = {
  isVisible: boolean;
  closeDialog: () => void;
}

export const AddCourseForm = ({ isVisible, closeDialog }: AddCourseFormProps) => {
  const [name, setName] = useState<string>("");
  const [credits, setCredits] = useState<number>(2);
  const addCourse = useCoursesStore((state) => state.addCourse);

  const submit = () => {
    if (name.length === 0) return;
    addCourse({ name: name, credits: credits, grades: [] });
    setName("");
    setCredits(2);
    toast.success("Course added successfully");
    closeDialog();
  };

  return (
    <Dialog
      header="Add a course"
      visible={ isVisible }
      className="!w-5/6 md:!w-1/2 lg:!w-[360px]"
      onHide={ closeDialog }
      draggable={false}
    >
      <div className="flex flex-col justify-around gap-8">
        <div className="flex flex-col gap-2 py-2">
          <InputText
            value={ name }
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <InputNumber
            value={credits}
            onValueChange={(e) => setCredits(e.value!)}
            mode="decimal"
            showButtons
            min={2}
            max={12}
            suffix=" credits"
          />
        </div>
        <Button
          label="Add"
          onClick={submit}
        />
      </div>
    </Dialog>
  );
};