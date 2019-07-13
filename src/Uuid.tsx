import React, { useState, useEffect } from 'react';
import v4 from 'uuid/v4';
import copy from 'copy-to-clipboard';
import './Uuid.css';

enum Icon {
  Copy = 'file_copy',
  Success = 'check',
  Error = 'clear'
}

const Uuid: React.FC = () => {
  const [uuid, setUuid] = useState(v4());
  const [copied, setCopied] = useState<boolean | undefined>(undefined);
  const [icon, setIcon] = useState(Icon.Copy);

  useEffect(() => {
    if (copied === true) setIcon(Icon.Success);
    else if (copied === false) setIcon(Icon.Error);
    else setIcon(Icon.Copy);
  }, [copied]);

  const copyToClipboard = () => {
    const success = copy(uuid, {format: 'plain/text'});
    setCopied(success);
  };

  const refreshUuid = () => {
    setCopied(undefined);
    setUuid(v4());
  };

  return (
    <div className="uuid-wrapper">
      <div className="uuid-container" onClick={copyToClipboard}>
        <i className="uuid-icon material-icons">{icon}</i>
        <p className="uuid-value">{uuid}</p>
      </div>
      <div className="uuid-container" onClick={refreshUuid}>
        <i className="uuid-icon uuid-refresh material-icons">refresh</i>
      </div>
    </div>
  );
};

export default Uuid;
