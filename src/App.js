import { useState } from 'react';
import ShulteTable from './ShulteTable';
import Settings from './Settings';
import './App.css';

function App() {
  const updateSettings = (settings) => {
    localStorage.setItem('settings', JSON.stringify(settings));
    setSettings(settings);
  };

  const [settings, setSettings] = useState(
    () => JSON.parse(localStorage.getItem('settings')) || {}
  );

  const onSizeChange = (newSize) =>
    updateSettings({...settings, size: newSize});

  const onGridWidthChange = (newWidth) =>
    updateSettings({...settings, width: newWidth});

  return (
    <div className="app">
      <Settings
        size={settings.size}
        onSizeChange={onSizeChange}
        gridWidth={settings.width}
        onGridWidthChange={onGridWidthChange} />
      <ShulteTable
        size={settings.size}
        width={settings.width} />
    </div>
  );
}

export default App;
