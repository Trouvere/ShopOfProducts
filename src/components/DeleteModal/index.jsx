import React, { useState } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import style from './styles.module.css';

const DeleteModal= ({text, actionConfirmation, actionCancel} ) => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button className={style.btnTrigger}>Delete</Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      style={{ margin: 'auto', position: 'fixed' }}
    >
      <Header
        style={{ textAlign: 'center ' }}
        content={text}
      />
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            console.log('\x1b[31m%s\x1b[0m', 'red');
            setOpen(false);
            actionCancel();
          }}
        >
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          onClick={() => {
            console.log('\x1b[31m%s\x1b[0m', 'green');
            setOpen(false);

            actionConfirmation();
          }}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
DeleteModal.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.func,
  colorLabel: PropTypes.func,
};
DeleteModal.defaultProps = {
  actionConfirmation: () => {},
  actionCancel: () => {},
};

export default DeleteModal;
