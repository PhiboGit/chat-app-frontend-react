import React from 'react';

export default function InputField({ label, type, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}