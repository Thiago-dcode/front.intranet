import React, { useEffect, useState } from "react";
import useCheckDevice from "../../../hooks/useCheckDevice";
import ls from "localstorage-slim";
import Icon from "../icon/Icon";
import useAjax from "../../../hooks/useAjax";

import { AsideNav } from "./partials/AsideNav";
import AsideNavPhone from "./partials/AsideNavPhone";
export default function IntraNav({ modules, userId, company }) {
  const [result, error, isPending, setConfig] = useAjax();
  const [moduleActive, setModuleActive] = useState('');
  const device = useCheckDevice();

  const setUserModule = (mod) => {

    if (moduleActive === mod.name) return
    setConfig("/api/active-module", {
      user_id: userId,
      module: mod.id
    }, "POST");
  };

  useEffect(() => {

    if (result && result?.status === 200) {

      setModuleActive(result.data?.user?.module_active)
    }

  }, [result, error])
  useEffect(() => { console.log(moduleActive) }, [moduleActive])
  return (
    <>

      {company && modules &&
        <>
          {device.isDesktop && <AsideNav setModule={setUserModule} company={company} modules={modules} />}
          {(device.isPhone || device.isTablet) && <AsideNavPhone setModule={setUserModule} company={company} modules={modules} />}
        </>
      }


    </>
  );
}
