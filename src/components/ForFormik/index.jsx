import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorMessage from '../ErrorMessage';
import styles from './styles.module.css';

export const InputForFormik = ({
  placeholder,
  colorLabel,
  label,
  type,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={label}
          className={classnames({
            [styles.white]: colorLabel === 'white',
            [styles.black]: colorLabel === 'black'
          })}
        >
          {label}
        </label>
      )}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        {...field}
      />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
};
export const TextareaForFormik = ({ label, colorLabel, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={label}
          className={classnames({
            [styles.white]: colorLabel === 'white',
            [styles.black]: colorLabel === 'black'
          })}
        >
          {label}
        </label>
      )}
      <textarea className={styles.textarea} {...field} />
      {meta.touched && meta.error ? (
        <ErrorMessage className="error">{meta.error}</ErrorMessage>
      ) : null}
    </div>
  );
};

export const SelectForFormik = ({ options, label, colorLabel, ...props }) => {
  const optionsPoint = options.map((el) => {
    return (
      <option key={el} value={el}>
        {el}
      </option>
    );
  });

  const [field] = useField(props);
  return (
    <div className={styles.wrapper}>
      {label && (
        <label
          htmlFor={label}
          className={classnames({
            [styles.white]: colorLabel === 'white',
            [styles.black]: colorLabel === 'black'
          })}
        >
          {label}
        </label>
      )}
      <select className={styles.input} {...field}>
        {/* <option value=""></option> */}
        {optionsPoint}
      </select>
    </div>
  );
};

export const SwitchForFormik = ({ id, interest, ...props }) => {
  const [field] = useField(props);
  return (
    <label
      className={
        field.value.some((idI) => idI === id)
          ? styles.activeCheckboxBlock
          : styles.checkboxBlock
      }
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        {...field}
        {...props}
        checked={field.value.some((idI) => idI === id)}
      />
      <p>{interest.name}</p>
    </label>
  );
};

export const CheckboxForFormik = ({ id, interest, ...props }) => {
  const [field] = useField(props);
  return (
    <label
      className={
        field.value.some((idI) => idI === id)
          ? styles.activeCheckboxBlock
          : styles.checkboxBlock
      }
    >
      <input
        className={styles.checkbox}
        type="checkbox"
        {...field}
        {...props}
        checked={field.value.some((idI) => idI === id)}
      />
      <p>{interest.name}</p>
    </label>
  );
};

export const RadioForFormik = ({ children, ...props }) => {
  const [field] = useField(props);
  return (
    <label className={styles.radio}>
      <input {...field} {...props} />
      {children}
    </label>
  );
};

InputForFormik.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  colorLabel: PropTypes.oneOf(['white', 'black'])
};
InputForFormik.defaultProps = {
  placeholder: '',
  label: '',
  type: 'text',
  colorLabel: 'black'
};

TextareaForFormik.propTypes = {
  label: PropTypes.string,
  colorLabel: PropTypes.oneOf(['white', 'black'])
};
TextareaForFormik.defaultProps = {
  label: '',
  colorLabel: 'black'
};

SelectForFormik.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  colorLabel: PropTypes.oneOf(['white', 'black'])
};
SelectForFormik.defaultProps = {
  label: '',
  colorLabel: 'black'
};

CheckboxForFormik.propTypes = {
  id: PropTypes.string.isRequired,
  interest: PropTypes.PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    tag: PropTypes.string
  }).isRequired
};

RadioForFormik.propTypes = {
  children: PropTypes.node.isRequired
};
