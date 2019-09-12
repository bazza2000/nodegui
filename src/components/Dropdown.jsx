import React from 'react';

const Dropdown = ( ...values ) => {
  const obj = new Object(...values);
  return (
    <div className = "form-group">
      <select
        id = {obj.id}
        value = {obj.value}
        onChange = {obj.onChange}
        className = {obj.className}
        aria-labelledby = {obj.ariaLabel}
      >
        {obj.value ? <option value={obj.value} disabled="disabled" hidden={true}>*</option> : <option value="" disabled="disabled" hidden={true}></option>}
        {(obj.options).map((option, i) => {
          return <option key={i} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
};


export default Dropdown;
