import { Download, CheckCircle, Shield } from 'lucide-react';

type ISO20022ReceiptProps = {
  receipt: {
    receipt_id: string;
    proofrails_id: string;
    message_type: string;
    debtor_name: string;
    debtor_account: string;
    creditor_name: string;
    creditor_account: string;
    amount: number;
    currency: string;
    value_date: string;
    settlement_method: string;
    verification_status: string;
    receipt_data: any;
  };
};

export default function ISO20022Receipt({ receipt }: ISO20022ReceiptProps) {
  const exampleReceiptData = {
    Document: {
      FIToFICstmrCdtTrf: {
        GrpHdr: {
          MsgId: receipt.receipt_id,
          CreDtTm: new Date().toISOString(),
          NbOfTxs: '1',
          SttlmInf: {
            SttlmMtd: receipt.settlement_method,
          },
        },
        CdtTrfTxInf: {
          PmtId: {
            InstrId: receipt.receipt_id,
            EndToEndId: receipt.proofrails_id,
          },
          IntrBkSttlmAmt: {
            '@Ccy': receipt.currency,
            '#text': receipt.amount.toString(),
          },
          IntrBkSttlmDt: receipt.value_date,
          ChrgBr: 'SLEV',
          Dbtr: {
            Nm: receipt.debtor_name,
          },
          DbtrAcct: {
            Id: {
              Othr: {
                Id: receipt.debtor_account,
                SchmeNm: {
                  Prtry: 'BLOCKCHAIN',
                },
              },
            },
          },
          DbtrAgt: {
            FinInstnId: {
              Nm: 'Flare Network',
              Othr: {
                Id: 'FLARE',
              },
            },
          },
          CdtrAgt: {
            FinInstnId: {
              Nm: 'Flare Network',
              Othr: {
                Id: 'FLARE',
              },
            },
          },
          Cdtr: {
            Nm: receipt.creditor_name,
          },
          CdtrAcct: {
            Id: {
              Othr: {
                Id: receipt.creditor_account,
                SchmeNm: {
                  Prtry: 'BLOCKCHAIN',
                },
              },
            },
          },
          RmtInf: {
            Ustrd: 'Payroll Payment',
          },
          SplmtryData: {
            PlcAndNm: 'ProofrailsVerification',
            Envlp: {
              ProofrailsId: receipt.proofrails_id,
              VerificationStatus: receipt.verification_status,
              BlockchainNetwork: 'Flare',
              MessageType: receipt.message_type,
            },
          },
        },
      },
    },
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(exampleReceiptData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `ISO20022_Receipt_${receipt.receipt_id}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-900">ISO 20022 Receipt</h3>
          </div>
          <p className="text-sm text-slate-600 mt-1">Proofrails-verified payment receipt</p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              receipt.verification_status === 'verified'
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}
          >
            {receipt.verification_status === 'verified' && (
              <CheckCircle className="w-3 h-3 mr-1" />
            )}
            {receipt.verification_status.toUpperCase()}
          </span>
          <button
            onClick={downloadJSON}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download JSON</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase">Receipt Information</p>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Receipt ID</span>
                <span className="text-sm font-medium text-slate-900">{receipt.receipt_id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Proofrails ID</span>
                <span className="text-sm font-mono text-slate-900">{receipt.proofrails_id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Message Type</span>
                <span className="text-sm font-medium text-slate-900">{receipt.message_type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Settlement Method</span>
                <span className="text-sm font-medium text-slate-900">
                  {receipt.settlement_method} (Cryptocurrency)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase">Payment Details</p>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Amount</span>
                <span className="text-sm font-bold text-green-600">
                  {receipt.amount.toLocaleString()} {receipt.currency}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Value Date</span>
                <span className="text-sm font-medium text-slate-900">
                  {new Date(receipt.value_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Network</span>
                <span className="text-sm font-medium text-slate-900">Flare Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-slate-50 rounded-lg">
          <p className="text-xs font-semibold text-slate-600 uppercase mb-3">Debtor (Payer)</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-slate-600">Name</p>
              <p className="text-sm font-medium text-slate-900">{receipt.debtor_name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Account</p>
              <p className="text-xs font-mono text-slate-900 break-all">{receipt.debtor_account}</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-xs font-semibold text-slate-600 uppercase mb-3">Creditor (Payee)</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-slate-600">Name</p>
              <p className="text-sm font-medium text-slate-900">{receipt.creditor_name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Account</p>
              <p className="text-xs font-mono text-slate-900 break-all">
                {receipt.creditor_account}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm font-semibold text-blue-900 mb-2">ISO 20022 pacs.008 Format</p>
        <p className="text-xs text-blue-800">
          This receipt follows the ISO 20022 pacs.008 (FIToFICustomerCreditTransfer) message
          standard for interbank customer credit transfers. It is verified and cryptographically
          signed by Proofrails on the Flare Network, ensuring compliance with international
          financial messaging standards while leveraging blockchain transparency and immutability.
        </p>
      </div>

      <div className="p-4 bg-slate-800 rounded-lg">
        <p className="text-sm font-semibold text-white mb-2">JSON Preview</p>
        <pre className="text-xs text-slate-300 overflow-x-auto">
          {JSON.stringify(exampleReceiptData, null, 2).slice(0, 500)}...
        </pre>
      </div>
    </div>
  );
}
