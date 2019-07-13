import React, { useState, useEffect } from 'react';
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

const Uuid: React.FC = () => {
  const [, setClipboard] = useState<Clipboard>();
  const [uuid, setUuid] = useState(v4());
  const [copied, setCopied] = useState<boolean | undefined>(undefined);
  const [icon, setIcon] = useState(Icon.Copy);
  const [statusClass, setStatusClass] = useState(Status.Idle);

  useEffect(() => {
    const clipboard = new Clipboard('.uuid-copy');
    clipboard.on('error', () => setCopied(false));
    clipboard.on('success', () => setCopied(true));

    setClipboard(clipboard);
  }, []);

  useEffect(() => {
    if (copied === true) setIcon(Icon.Success);
    else if (copied === false) setIcon(Icon.Error);
    else setIcon(Icon.Copy);
  }, [copied]);

  useEffect(() => {
    if (copied === true) setStatusClass(Status.Success);
    else if (copied === false) setStatusClass(Status.Error);
    else setStatusClass(Status.Idle);
  }, [statusClass, copied]);

  const refreshUuid = () => {
    setCopied(undefined);
    setUuid(v4());
  };

  return (
    <div className="uuid-wrapper">
      <div className="uuid-container uuid-copy" data-clipboard-text={uuid}>
        <i className={['uuid-icon', 'material-icons', statusClass].filter(Boolean).join(' ')}>{icon}</i>
        <p className="uuid-value">{uuid}</p>
      </div>
      <div className="uuid-container uuid-refresh" onClick={refreshUuid}>
        <i className="uuid-icon material-icons">refresh</i>
      </div>
    </div>
  );
};

export default Uuid;
