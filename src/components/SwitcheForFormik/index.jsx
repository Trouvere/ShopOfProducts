import React, { useState } from 'react';
import { Button, Checkbox } from 'semantic-ui-react';
import style from './styles.module.css';
import { useField } from 'formik';

const SwitcheForFormik = ({ labelChecked, labelUnchecked, ...props }) => {
  const [field] = useField(props);
  const textDiv= field?.value ?  labelChecked  :  labelUnchecked 
  console.log("🚀 ~ file: index.jsx ~ line 1119 ~ Switcher ~ textDiv", textDiv)

  return (
    <div className={style.switcher}>
      <label className={style.switch}>
        <input type="checkbox" {...field} {...props} />
        <div></div>
      </label>
      <div className={style.label}>
        {textDiv}
      </div>
    </div>
  );
};
SwitcheForFormik.propTypes = {
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
SwitcheForFormik.defaultProps = {
  // form: 'underlined',
  // type: 'input',
  // name: '',
  // placeholder: '',
  // onBlur: () => {},
  // label: ''
};

export default SwitcheForFormik;
