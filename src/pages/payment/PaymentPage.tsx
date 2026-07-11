import React from 'react';
import { Wallet, ArrowDownLeft, ArrowUpRight, Send, CheckCircle2, Clock3, XCircle } from 'lucide-react';

type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

type Transaction = {
  id: number;
  amount: string;
  sender: string;
  receiver: string;
  status: TransactionStatus;
};

const transactions: Transaction[] = [
  { id: 1, amount: '$2,500.00', sender: 'You', receiver: 'Nova Labs', status: 'Completed' },
  { id: 2, amount: '$800.00', sender: 'Ava Ventures', receiver: 'You', status: 'Pending' },
  { id: 3, amount: '$1,200.00', sender: 'You', receiver: 'Northstar Capital', status: 'Failed' },
];

const statusStyles: Record<TransactionStatus, string> = {
  Completed: 'bg-green-100 text-green-700',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
};

const statusIcons: Record<TransactionStatus, React.ReactNode> = {
  Completed: <CheckCircle2 size={16} />,
  Pending: <Clock3 size={16} />,
  Failed: <XCircle size={16} />,
};

export const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-primary-100">
                <Wallet size={18} /> Wallet Balance
              </p>
              <h1 className="text-4xl font-semibold">$24,580.00</h1>
              <p className="mt-2 text-sm text-primary-100">Available for deposits, transfers, and payouts.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-xl bg-white px-4 py-2 font-medium text-primary-700 transition hover:bg-primary-50">
                Deposit
              </button>
              <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/20">
                Withdraw
              </button>
              <button className="rounded-xl border border-white/30 bg-white/10 px-4 py-2 font-medium text-white transition hover:bg-white/20">
                Transfer
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h2>
            <div className="space-y-3">
              <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:bg-gray-50">
                <span className="flex items-center gap-3 font-medium text-gray-700">
                  <ArrowDownLeft size={18} className="text-green-600" /> Deposit Funds
                </span>
                <span className="text-sm text-gray-500">Instant</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:bg-gray-50">
                <span className="flex items-center gap-3 font-medium text-gray-700">
                  <ArrowUpRight size={18} className="text-amber-600" /> Withdraw Funds
                </span>
                <span className="text-sm text-gray-500">1-3 days</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left transition hover:bg-gray-50">
                <span className="flex items-center gap-3 font-medium text-gray-700">
                  <Send size={18} className="text-primary-600" /> Transfer Money
                </span>
                <span className="text-sm text-gray-500">Secure</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
              <span className="text-sm text-gray-500">Latest activity</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="px-3 py-3 font-medium">Amount</th>
                    <th className="px-3 py-3 font-medium">Sender</th>
                    <th className="px-3 py-3 font-medium">Receiver</th>
                    <th className="px-3 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-100 last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-gray-900">{tx.amount}</td>
                      <td className="px-3 py-3 text-gray-700">{tx.sender}</td>
                      <td className="px-3 py-3 text-gray-700">{tx.receiver}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[tx.status]}`}>
                          {statusIcons[tx.status]}
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
