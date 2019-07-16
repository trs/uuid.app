import React, { useState, useEffect, createRef } from "react";
import v4 from "uuid/v4";
import Clipboard from "clipboard";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faClone, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Uuid.css";

library.add(faRedoAlt, faClone, faCheck, faTimes);

enum Icon {
  Copy = "clone",
  Success = "check",
  Error = "times"
}

enum Status {
  Idle = "",
  Success = "uuid-status--success",
  Error = "uuid-status--error"
}

const ICON_ROTATE_CLASS_NAME = "uuid-icon-rotate";

const Uuid: React.FC = () => {
  const [, setClipboard] = useState<Clipboard>();
  const [uuid, setUuid] = useState(v4());
  const [copySupported, setCopySupported] = useState(true);
  const [copySuccessful, setCopySuccessful] = useState<boolean | undefined>(undefined);
  const [copyIcon, setCopyIcon] = useState(Icon.Copy);
  const [copyStatusClassName, setCopyStatusClassName] = useState(Status.Idle);
  const refreshIconRef = createRef<HTMLElement>();

  useEffect(() => {
    if (!Clipboard.isSupported()) {
      setCopySupported(false);
      return;
    }

    const clipboard = new Clipboard(".uuid-copy");
    clipboard.on("error", () => setCopySuccessful(false));
    clipboard.on("success", () => setCopySuccessful(true));

    setClipboard(clipboard);

    return () => clipboard.destroy();
  }, []);

  useEffect(() => {
    if (copySuccessful === true) setCopyIcon(Icon.Success);
    else if (copySuccessful === false) setCopyIcon(Icon.Error);
    else setCopyIcon(Icon.Copy);
  }, [copySuccessful]);

  useEffect(() => {
    if (copySuccessful === true) setCopyStatusClassName(Status.Success);
    else if (copySuccessful === false) setCopyStatusClassName(Status.Error);
    else setCopyStatusClassName(Status.Idle);
  }, [copyStatusClassName, copySuccessful]);

  const refreshUuid = () => {
    setCopySuccessful(undefined);
    setUuid(v4());

    if (!refreshIconRef.current) return;

    const {classList} = refreshIconRef.current;
    classList.add(ICON_ROTATE_CLASS_NAME);
    setTimeout(() => classList.remove(ICON_ROTATE_CLASS_NAME), 250);
  };

  return (
    <div className="uuid-wrapper">
      <div className="uuid-container uuid-value">
        {uuid}
      </div>
      {copySupported ?
        <div className="uuid-container uuid-button uuid-copy" data-clipboard-target=".uuid-value">
          <FontAwesomeIcon icon={copyIcon} className={["uuid-icon", "material-icons", copyStatusClassName].filter(Boolean).join(" ")} />
        </div>
        : ""
      }
      <div className="uuid-container uuid-button uuid-refresh" onClick={refreshUuid}>
        <span ref={refreshIconRef}>
          <FontAwesomeIcon icon="redo-alt" className="uuid-icon material-icons" />
        </span>
        {/* <i className="uuid-icon material-icons" ref={refreshIconRef}>refresh</i> */}
      </div>
    </div>
  );
};

export default Uuid;
