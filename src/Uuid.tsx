import React, { useState, useEffect, createRef } from 'react';
import v4 from 'uuid/v4';
import Clipboard from 'clipboard';
import './Uuid.css';

enum Icon {
  Copy = 'file_copy',
  Success = 'check',
  Error = 'clear'
}

enum Status {
  Idle = '',
  Success = 'uuid-status--success',
  Error = 'uuid-status--error'
}

const ICON_ROTATE_CLASS_NAME = 'uuid-icon-rotate';

const Uuid: React.FC = () => {
  const [, setClipboard] = useState<Clipboard>();
  const [uuid, setUuid] = useState(v4());
  const [copySupported, setCopySupported] = useState(true);
  const [copySuccessful, setCopySuccessful] = useState<boolean | undefined>(undefined);
  const [copyIcon, setCopyIcon] = useState(Icon.Copy);
  const [copyStatusClassName, setCopyStatusClassName] = useState(Status.Idle);
  const refreshIcon = createRef<HTMLElement>();

  useEffect(() => {
    if (!Clipboard.isSupported()) {
      setCopySupported(false);
      return;
    }

    const clipboard = new Clipboard('.uuid-copy');
    clipboard.on('error', () => setCopySuccessful(false));
    clipboard.on('success', () => setCopySuccessful(true));

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

    if (!refreshIcon.current) return;

    const {classList} = refreshIcon.current;
    classList.add(ICON_ROTATE_CLASS_NAME);
    setTimeout(() => classList.remove(ICON_ROTATE_CLASS_NAME), 150);
  };

  return (
    <div className="uuid-wrapper">
      <div className={['uuid-container', 'uuid-copy', !copySupported ? 'uuid-container--ignore-hover' : ''].filter(Boolean).join(' ')} data-clipboard-text={uuid}>
        {copySupported ?
          <i className={['uuid-icon', 'material-icons', copyStatusClassName].filter(Boolean).join(' ')}>{copyIcon}</i>
          : ''
        }
        <p className="uuid-value">{uuid}</p>
      </div>
      <div className="uuid-container uuid-refresh" onClick={refreshUuid}>
        <i className="uuid-icon material-icons" ref={refreshIcon}>refresh</i>
      </div>
    </div>
  );
};

export default Uuid;
