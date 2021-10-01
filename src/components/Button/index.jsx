import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import Preloader from '../Preloader';

const Button = ({
  color,
  children,
  disabled,
  type,
  isLoading,
  size,
  onClick
}) => {
  return (
    <button
      className={classnames({
        [styles.button]: true,
        [styles.buttonWhite]: color === 'white',
        [styles.buttonBlack]: color === 'black',
        [styles.buttonFilling]: size === 'filling',
        [styles.buttonBig]: size === 'big',
        [styles.buttonMedium]: size === 'medium',
        [styles.buttonSmall]: size === 'small'
      })}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Preloader /> : children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  size: PropTypes.string,
  onClick: PropTypes.func
};
Button.defaultProps = {
  color: 'white',
  children: 'submit',
  disabled: false,
  type: 'button',
  isLoading: false,
  size: 'filling',
  onClick: () => {}
};

export default Button;
