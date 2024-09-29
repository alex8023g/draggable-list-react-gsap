import { nanoid } from 'nanoid';
import { ActionType, Data } from '../App';

type Props = {
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  actionType: React.MutableRefObject<ActionType>;
};

export function AddBtn({ setData, actionType }: Props) {
  return (
    <button
      className='bg-blue-500 w-16 h-16 rounded-full fixed bottom-10 left-[50%] -translate-x-[50%] text-white'
      onClick={() => {
        setData((st) =>
          st
            .filter((it) => !it.isDone)
            .concat({ id: nanoid(), text: nanoid().slice(0, 5), isDone: false })
            .concat(st.filter((it) => it.isDone))
        );
        actionType.current = 'addItem';
      }}
    >
      +
    </button>
  );
}
