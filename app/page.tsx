// app/tneb-bill-calculator/page.tsx or pages/tneb-bill-calculator.tsx (Next.js route)

"use client"; // only if you're using app router

import { useState } from "react";
// constants/tariff.ts
const TNEB_TARIFF_UPTO_500 = [
  { min: 0, max: 100, rate: 0 },
  { min: 101, max: 200, rate: 2.35 },
  { min: 201, max: 400, rate: 4.7 },
  { min: 401, max: 500, rate: 6.30 }, // Flat above 500
];

const TNEB_TARIFF_ABOVE_500 = [
  { min: 0, max: 100, rate: 0 },
  { min: 101, max: 400, rate: 4.7 },
  { min: 401, max: 500, rate: 6.30 },
  { min: 501, max: 600, rate: 8.40 },
  { min: 601, max: 800, rate:  9.45 },
  { min: 801, max: 1000, rate:  10.50 },
  { min: 1001, max: null, rate:  11.55 },
];
  const calculateBillForUnits = (units: number) => {
  const breakdown = [];

  const TNEB_TARIFF = units <= 500 ? TNEB_TARIFF_UPTO_500 : TNEB_TARIFF_ABOVE_500;

    for (const slab of TNEB_TARIFF) {
       const from = slab.min;
    const to = slab.max ?? Infinity;

    if (units < from) continue;

    const slabStart = from;
    const slabEnd = Math.min(to, units);

    const slabUnits = slabEnd - slabStart + 1;

    if (slabUnits > 0) {
      breakdown.push({
        range: `${slabStart} - ${to === Infinity ? units : to}`,
        units: slabUnits,
        rate: slab.rate,
        amount: slabUnits * slab.rate,
      });
    }

   }

  const total = breakdown.reduce((sum, slab) => sum + slab.amount, 0);
  return { total, breakdown };

  };

export default function TnebBillCalculator() {
  const [units, setUnits] = useState("");
  const [billDetails, setBillDetails] = useState<null | {
    total: number;
    breakdown: { range: string; units: number; rate: number; amount: number }[];
  }>(null);
  const calculateBill = () => {
    const { total, breakdown }=  calculateBillForUnits(Number(units));
    setBillDetails({ total, breakdown });
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-green-800 text-white text-center py-4 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">TNEB Bill Calculator</h1>
         <h6 className="">As per revised tariff on 01.07.2024</h6>
        
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <label htmlFor="units" className="block text-gray-700 mb-2 font-medium">
            Enter Units Consumed:
          </label>
          <input
            id="units"
            type="number"
            min="0"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="e.g., 350"
          />

          <button
            onClick={calculateBill}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
          >
            Calculate Bill
          </button>

          {billDetails && (
            <div className="mt-6">
              <h2 className="text-lg font-bold text-green-700 text-center mb-2">
                Total Bill: ₹{billDetails.total.toFixed(2)}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full table-auto text-sm border mt-2">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="px-2 py-1 border">Slab</th>
                      <th className="px-2 py-1 border">Units</th>
                      <th className="px-2 py-1 border">Rate (₹)</th>
                      <th className="px-2 py-1 border">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billDetails.breakdown.map((slab, idx) => (
                      <tr key={idx} className="text-center">
                        <td className="px-2 py-1 border">{slab.range}</td>
                        <td className="px-2 py-1 border">{slab.units}</td>
                        <td className="px-2 py-1 border">{slab.rate}</td>
                        <td className="px-2 py-1 border">{slab.amount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
