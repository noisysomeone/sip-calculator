import { h } from 'preact';
import { useState } from 'preact/hooks';
import ChartComponent from './ChartComponent.jsx';

export default function SIPCalculator() {
  const [form, setForm] = useState({
    monthlyInvestment: 10000,
    years: 10,
    interestRate: 12,
  });

  const [result, setResult] = useState(null);

  const calculateSIP = () => {
    const { monthlyInvestment, years, interestRate } = form;
    const months = years * 12;
    const monthlyRate = interestRate / 12 / 100;
    let total = 0;
    const chartYears = [];
    const chartValues = [];

    for (let i = 1; i <= months; i++) {
      total = total * (1 + monthlyRate) + monthlyInvestment;
      if (i % 12 === 0) {
        chartYears.push(`Year ${i / 12}`);
        chartValues.push(Math.round(total));
      }
    }

    setResult({
      invested: monthlyInvestment * months,
      value: Math.round(total),
      gain: Math.round(total - monthlyInvestment * months),
      chart: { years: chartYears, values: chartValues }
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); calculateSIP(); }}>
        <label>
          Monthly Investment (₹)
          <input type="number" name="monthlyInvestment" value={form.monthlyInvestment} onChange={handleChange} />
        </label>
        <label>
          Investment Period (Years)
          <input type="number" name="years" value={form.years} onChange={handleChange} />
        </label>
        <label>
          Expected Return Rate (% p.a)
          <input type="number" name="interestRate" value={form.interestRate} onChange={handleChange} />
        </label>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div>
          <h2>Results</h2>
          <ul>
            <li>Total Invested: ₹{result.invested}</li>
            <li>Final Value: ₹{result.value}</li>
            <li>Estimated Gain: ₹{result.gain}</li>
          </ul>
          <ChartComponent chartData={result.chart} />
        </div>
      )}
    </div>
  );
}