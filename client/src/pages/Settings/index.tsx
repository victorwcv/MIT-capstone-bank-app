import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { useUIStore } from '@/stores';
import { useTransactions } from '@/hooks/useTransactions';
import { exportCSV } from '@/utils';

export const Component = () => {
  const { theme, setTheme } = useUIStore();
  const { data: txs } = useTransactions();

  return (
    <div className="grid">
      <div className="col-12 md:col-6">
        <Card title="Preferences">
          <div className="flex align-items-center justify-content-between mb-3">
            <span>Dark theme</span>
            <InputSwitch
              checked={theme === 'dark'}
              onChange={(e) => setTheme(e.value ? 'dark' : 'light')}
            />
          </div>
        </Card>
      </div>
      <div className="col-12 md:col-6">
        <Card title="Data">
          <Button
            label="Export CSV"
            icon="pi pi-download"
            onClick={() => txs && exportCSV(txs)}
          />
        </Card>
      </div>
    </div>
  );
};