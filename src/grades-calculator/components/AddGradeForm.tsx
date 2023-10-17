import {Dialog} from "primereact/dialog";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {useCoursesStore} from "../stores/coursesStore.ts";
import {toast} from "react-toastify";

type AddGradeFormProps = {
  courseIndex: number;
  isVisible: boolean;
  closeDialog: () => void;
}

export const AddGradeForm =({ courseIndex, isVisible, closeDialog }: AddGradeFormProps) => {
  const [name, setName] = useState<string>("");
  const [percentage, setPercentage] = useState<number>();
  const [score, setScore] = useState<number>();
  const addGrade = useCoursesStore((state) => state.addGrade);

  const submit = () => {
    if (name.length === 0 || percentage == undefined) return;

    addGrade({ name: name, percentage: percentage, score: score }, courseIndex);

    setName("");
    setPercentage(undefined);
    setScore(undefined);
    toast.success("Grade added successfully");

    closeDialog();
  }

  return (
    <Dialog
      header="Add a grade"
      visible={ isVisible }
      className="!w-5/6 md:!w-1/2 lg:!w-[360px]"
      onHide={ closeDialog }
      draggable={false}
    >
      <div className="flex flex-col justify-around gap-8">
        <div className="flex flex-col gap-2 py-2">
          <InputText
            value={ name }
            placeholder="Name. Ex: TB1"
            onChange={(e) => setName(e.target.value)}
          />
          <InputNumber
            value={percentage}
            onValueChange={(e) => setPercentage(e.value!)}
            mode="decimal"
            placeholder="Percentage. Ex: 15(%)"
            suffix="%"
            min={0}
            max={100}
          />
          <InputNumber
            value={score}
            onValueChange={(e) => setScore(e.value!)}
            mode="decimal"
            placeholder="(Optional) Score. Ex: 19.75"
            minFractionDigits={0}
            maxFractionDigits={2}
            min={0}
            max={20}
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