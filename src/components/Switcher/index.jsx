import React, { useState } from 'react';
import style from './styles.module.css';


const Switcher = ({ labelChecked, labelUnchecked, checked, onChange}) => {
 
  const textDiv= checked ?  labelChecked  :  labelUnchecked 
  console.log("🚀 ~ file: index.jsx ~ line 4449 ~ Switcher ~ textDiv", textDiv)

  return (
    <div className={style.switcher}>
      <label className={style.switch}>
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <div></div>
      </label>
      <div className={style.label}>
        {textDiv}
      </div>
    </div>
  );
};
Switcher.propTypes = {
  // type: PropTypes.string,
  // form: PropTypes.string,
  // name: PropTypes.string,
  // label: PropTypes.string,
  // placeholder: PropTypes.string,
  // onChange: PropTypes.func.isRequired,
  // onBlur: PropTypes.func,
  // value: PropTypes.string.isRequired,
  // icon: PropTypes.node.isRequired,
  // id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
Switcher.defaultProps = {
  // form: 'underlined',
  // type: 'input',
  // name: '',
  // placeholder: '',
  // onBlur: () => {},
  // label: ''
};

export default Switcher;
