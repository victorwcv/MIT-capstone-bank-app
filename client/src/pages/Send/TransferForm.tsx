import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { useTransfer } from '@/hooks/useTransfer';
import { useAccounts } from '@/hooks/useAccounts';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import type { TransferDto } from '@/types';

const schema = z.object({
  fromAccountId: z.string().min(1, 'Required'),
  to: z.string().email('Invalid email'),
  amount: z.number().positive().min(0.01),
  note: z.string().optional(),
});

type Form = z.infer<typeof schema>;

export const TransferForm = () => {
  const { data: accounts } = useAccounts();
  const { mutate, isPending: isLoading } = useTransfer();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { fromAccountId: accounts?.[0].id || '' },
  });

  const onSubmit = (data: Form) => {
    const dataToSubmit: TransferDto = { ...data, amount: { amount: data.amount, currency: 'USD' } };
    mutate(dataToSubmit, {
      onSuccess: () => {
        toast.success('Transfer sent!');
        nav('/activity');
      },
      onError: (e) => toast.error(e.message),
    });
  };

  const accountOptions = accounts?.map((a) => ({
    label: `${a.name} (${a.balance.currency})`,
    value: a.id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-3">
      <Dropdown
        options={accountOptions}
        placeholder="From account"
        value={watch('fromAccountId')}
        onChange={(e) => setValue('fromAccountId', e.value)}
      />
      {errors.fromAccountId && <small className="p-error">{errors.fromAccountId.message}</small>}

      <InputText placeholder="To (email)" {...register('to')} />
      {errors.to && <small className="p-error">{errors.to.message}</small>}

      <InputNumber
        placeholder="Amount"
        mode="currency"
        currency="USD"
        minFractionDigits={2}
        onValueChange={(e) => setValue('amount', e.value ?? 0)}
      />
      {errors.amount && <small className="p-error">{errors.amount.message}</small>}

      <InputText placeholder="Note (optional)" {...register('note')} />

      <Button label="Send" type="submit" loading={isLoading} />
    </form>
  );
};