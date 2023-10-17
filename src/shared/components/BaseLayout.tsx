import {ReactElement} from "react";
import {Toolbar} from "./Toolbar.tsx";
import {useBackgroundStore} from "../../settings/stores/backgroundStore.ts";
import {getBackgroundClasses} from "../../settings/services/background.service.ts";

type BaseLayoutProps = {
  children: ReactElement | ReactElement[]
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  const background = useBackgroundStore((state) => state.background);
  // const [toast] = useToast();

  return (
    <div className={`min-h-screen ${ getBackgroundClasses(background) }`}>
      {/*<Toast ref={toast} />*/}
      <Toolbar />
      { children }
    </div>
  )
}