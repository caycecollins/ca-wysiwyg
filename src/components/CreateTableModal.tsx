import { SyntheticEvent, useEffect, useRef } from 'react';
import { Button } from './Button';
import Portal from './Portal';

interface CreateTableModalProps {
  active: boolean;
  onClose: (event: SyntheticEvent) => void;
  onCreate: ({ rows, columns }: { rows: number; columns: number }) => void;
}

// TODO: Handle form validation

const CreateTableModal = ({
  active,
  onClose,
  onCreate,
}: CreateTableModalProps) => {
  const rowsRef = useRef();
  const columnsRef = useRef();

  useEffect(() => {
    if (active && rowsRef?.current) {
      rowsRef?.current?.focus();
    }
  }, [active]);

  const handleOnCreate = () => {
    onCreate({
      rows: parseInt(rowsRef?.current?.value),
      columns: parseInt(columnsRef?.current?.value),
    });
  };

  return active ? (
    <Portal>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Create Table</h4>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-field-group">
                <div className="form-field">
                  <label htmlFor="rows">Rows:</label>
                  <input
                    ref={rowsRef}
                    id="rows"
                    name="rows"
                    type="text"
                    maxLength={3}
                    minLength={1}
                    defaultValue={3}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="columns">Columns:</label>
                  <input
                    ref={columnsRef}
                    id="columns"
                    name="columns"
                    type="text"
                    maxLength={3}
                    minLength={1}
                    defaultValue={3}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Button secondary={true} onClick={onClose}>
              Cancel
            </Button>
            <Button primary={true} onClick={handleOnCreate}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  ) : null;
};

export default CreateTableModal;
