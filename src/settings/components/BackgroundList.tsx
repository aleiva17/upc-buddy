import {ReactElement} from "react";
import {BackgroundType} from "../../shared/models/backgroundType.enum.ts";
import {BackgroundThumbnail} from "./BackgroundThumbnail.tsx";

export const BackgroundList = (): ReactElement => {
  return (
    <section className="py-4">
      <h3 className="text-xl font-semibold mb-4">Select a background</h3>
      <div className="grid grid-cols-3 md:grid-cols-4 md:grid-rows-3 grid-rows-4 place-items-center gap-4">
        {
          Object.keys(BackgroundType)
            .filter((v) => isNaN(Number(v)))
            .map((background, index) => (
                <BackgroundThumbnail
                  key={index}
                  background={ BackgroundType[background as keyof typeof BackgroundType] }
                  name={background}
                />
              )
            )
        }
      </div>
    </section>
  );
};