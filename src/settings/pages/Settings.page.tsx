import {BaseLayout} from "../../shared/components/BaseLayout.tsx";
import {Link} from "react-router-dom";
import {ReactElement} from "react";
import {BackgroundList} from "../components/BackgroundList.tsx";
import {HandleUploadDownloadData} from "../components/HandleUploadDownloadData.tsx";
import {DangerZone} from "../components/DangerZone.tsx";

export const SettingsPage = (): ReactElement => {
  return (
    <BaseLayout>
      <div className="flex justify-center p-8">
        <div className="flex flex-col w-[370px] md:w-[720px] bg-white shadow-2xl rounded-xl p-4 md:py-4 md:px-8 gap-4">
          <h2 className="text-3xl font-bold">Settings</h2>
          <BackgroundList />
          <HandleUploadDownloadData />
          <DangerZone />
          <Link
            to="/"
            className="flex items-center text-semibold gap-2 rounded-full hover:bg-blue-200 w-fit px-4 py-2 duration-300"
          >
            <span className="pi pi-home"/>
            Go back to home
          </Link>
        </div>
      </div>
    </BaseLayout>
  )
}