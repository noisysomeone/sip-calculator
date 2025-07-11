import { h } from 'preact';
import { useState } from 'preact/hooks';

export default function SIPForm({ onCalculate }) {
  const [form, setForm] = useState({
    monthlyInvestment: 10000,
    years: 10,
    interestRate: 12,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate(form);
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
}