import {ReactElement, useState} from "react";
import {Button} from "primereact/button";
import {useCoursesStore} from "../../grades-calculator/stores/coursesStore.ts";
import {classNames} from "primereact/utils";
import {ConfirmDialog} from "primereact/confirmdialog";
import {toast} from "react-toastify";

export const DangerZone = (): ReactElement => {
  const setCourses = useCoursesStore((state) => state.setCourses);
  const [isConfirmDeletionVisible, setIsConfirmDeletionVisible] = useState<boolean>(false);

  const deleteData = () => {
    setCourses([]);
    toast.success("Data deleted successfully");
  }

  return (
    <section className="py-4">
      <h3 className="text-xl font-semibold mb-4">Danger Zone</h3>
      <div className="relative">
        <Button
          onClick={ () => setIsConfirmDeletionVisible(true) }
          className="h-fit"
          severity="danger"
          label="Delete data"
          icon="pi pi-trash"
        />
        <ConfirmDialog
          pt={{
            footer: {
              className: classNames('flex justify-end items-end gap-2')
            },
            content: {
              className: classNames('')
            },
            root: {
              className: classNames('w-5/6 md:w-1/2 lg:w-[420px]')
            }
          }}
          header="Confirm data deletion"
          draggable={false}
          visible={isConfirmDeletionVisible}
          onHide={() => setIsConfirmDeletionVisible(false)}
          message={`Are you sure you want to delete all your data?`}
          icon="pi pi-exclamation-triangle"
          accept={ deleteData }
          acceptIcon="pi pi-trash"
          acceptClassName="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
          rejectClassName="p-button-text"
        />
      </div>
    </section>
  );
};