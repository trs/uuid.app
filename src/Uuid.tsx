import React, { useState, useEffect, createRef } from "react";
import {useClipboard, useUuid} from './Hooks';

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
  const [uuid, setUuid] = useUuid();
  const [copyIcon, setCopyIcon] = useState(Icon.Copy);
  const [copySuccessful, setCopySuccessful] = useState<boolean | null>(null);
  const [copyStatusClassName, setCopyStatusClassName] = useState(Status.Idle);
  const refreshIconRef = createRef<HTMLElement>();
  const uuidElementRef = createRef<HTMLInputElement>();

  const [setClipboard] = useClipboard();

  const copySupported = true;

  useEffect(() => {
    if (copySuccessful === true) setCopyIcon(Icon.Success);
    else if (copySuccessful === false) setCopyIcon(Icon.Error);
    else setCopyIcon(Icon.Copy);
  }, [copySuccessful]);

  useEffect(() => {
    if (copySuccessful === true) setCopyStatusClassName(Status.Success);
    else if (copySuccessful === false) setCopyStatusClassName(Status.Error);
    else setCopyStatusClassName(Status.Idle);
  }, [copySuccessful]);

  useEffect(() => {
    setCopySuccessful(null);
  }, [uuid]);

  const copyUuid = () => {
    const success = setClipboard(uuid);
    setCopySuccessful(success);

    const uuidElement = uuidElementRef.current;
    if (!uuidElement) return;
    uuidElement.select();
  };

  const refreshUuid = () => {
    setCopySuccessful(null);
    setUuid();

    if (!refreshIconRef.current) return;

    const {classList} = refreshIconRef.current;
    classList.add(ICON_ROTATE_CLASS_NAME);
    setTimeout(() => classList.remove(ICON_ROTATE_CLASS_NAME), 250);
  };

  return (
    <div className="uuid-wrapper">
      <input className="uuid-container uuid-value" type="text" readOnly size={uuid.length} value={uuid} ref={uuidElementRef} />
      {copySupported ?
        <div className="uuid-container uuid-button uuid-copy" onClick={copyUuid}>
          <FontAwesomeIcon icon={copyIcon} className={["uuid-icon", copyStatusClassName].filter(Boolean).join(" ")} />
        </div>
        : ""
      }
      <div className="uuid-container uuid-button uuid-refresh" onClick={refreshUuid}>
        <span ref={refreshIconRef}>
          <FontAwesomeIcon icon="redo-alt" className="uuid-icon" />
        </span>
      </div>
    </div>
  );
};

export default Uuid;
