import React from 'react';
import PropTypes from 'prop-types';

import style from './styles.module.css';

const Switcher = ({ labelChecked, labelUnchecked, checked, onChange }) => {
  const textDiv = checked ? labelChecked : labelUnchecked;

  return (
    <div className={style.switcher}>
      <label className={style.switch}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <div />
      </label>
      <div className={style.label}>{textDiv}</div>
    </div>
  );
};
Switcher.propTypes = {
  labelChecked: PropTypes.string,
  labelUnchecked: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};
Switcher.defaultProps = {
  labelChecked: '',
  labelUnchecked: '',
  onChange: () => {}
};

export default Switcher;
