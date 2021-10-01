import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const SwitcheForFormik = ({ labelChecked, labelUnchecked, ...props }) => {
  const [field] = useField(props);
  const textDiv = field?.value ? labelChecked : labelUnchecked;

  return (
    <div className={style.switcher}>
      <label className={style.switch}>
        <input type="checkbox" {...field} {...props} />
        <div />
      </label>
      <div className={style.label}>{textDiv}</div>
    </div>
  );
};
SwitcheForFormik.propTypes = {
  labelChecked: PropTypes.string,
  labelUnchecked: PropTypes.string
};
SwitcheForFormik.defaultProps = {
  labelChecked: 'Checked',
  labelUnchecked: 'Unchecked'
};

export default SwitcheForFormik;
