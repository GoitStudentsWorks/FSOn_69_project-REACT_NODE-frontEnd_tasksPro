import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { columnsOperations } from 'redux/columns';

const useColumn = (currentColumn, columnIndex, boardId, closeModal) => {
  const [title, setTitle] = useState(currentColumn ? currentColumn?.title : '');
  const [titleChecker, seTitleChecker] = useState(false);

  const dispatch = useDispatch();

  const handleColumnSubmit = () => {
    if (title === '' && !currentColumn) {
      seTitleChecker(true);
      setTimeout(() => {
        seTitleChecker(false);
      }, 500);
      return;
    }
    const { id, ...rest } = currentColumn;
    currentColumn
      ? dispatch(
          columnsOperations.updateColumn({
            columnId: id,
            updatedData: { ...rest, title },
          })
        )
      : dispatch(
          columnsOperations.addColumn({
            title,
            columnOwner: boardId,
            orderColumn: columnIndex,
          })
        );
    closeModal();
  };

  const handleTitle = useCallback(e => {
    setTitle(e.currentTarget.value);
  }, []);

  return { titleChecker, handleTitle, handleColumnSubmit };
};

export default useColumn;
