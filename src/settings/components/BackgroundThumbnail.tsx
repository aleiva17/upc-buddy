import {ReactElement} from "react";
import {useBackgroundStore} from "../stores/backgroundStore.ts";
import {BackgroundType} from "../../shared/models/backgroundType.enum.ts";
import { getBackgroundClasses } from "../services/background.service.ts";

type BackgroundThumbnailProps = {
  name: string;
  background: BackgroundType;
}

export const BackgroundThumbnail = ({ name, background }: BackgroundThumbnailProps): ReactElement => {
  const currentBackground = useBackgroundStore((state) => state.background);
  const setBackground = useBackgroundStore((state) => state.setBackground);

  const normalizeName = (name: string) => {
    return name.replace("_", " ").toLowerCase();
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <button
        onClick={ () => setBackground(background) }
        className={`w-24 h-24 rounded-full p-1 ${
          background === currentBackground
            ? 'border-2 border-black dark:border-white'
            : 'border hover:border-2 border-gray-500'
        }`}
      >
        <div className={`w-full h-full rounded-full ${getBackgroundClasses(background)}`} />
      </button>
      <p
        className={`
          text-sm md:text-base text-gray-800 text-center capitalize
          ${background === currentBackground && "font-bold"}
        `}
      >
        { normalizeName(name) }
      </p>
    </div>
  );
};