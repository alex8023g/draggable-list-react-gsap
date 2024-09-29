import { GripVertical } from 'lucide-react';
import { ActionType, Data } from '../App';

type Props = {
  item: Data;
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  actionType: React.MutableRefObject<ActionType>;
};

export default function ListItem({ item, setData, actionType }: Props) {
  return (
    <li className='g-list-item absolute top-0 left-0 h-[90px] w-full'>
      {/* <div className='item-content'> */}
      <div className='item-content h-full bg-gray-100 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] text-2xl px-4 flex items-center border-solid border-gray-200'>
        <span
          className='mr-2 '
          onClick={() => {
            setData((st) => st.filter((it) => it.id !== item.id));
            actionType.current = 'delDoneItem';
          }}
        >
          del
        </span>
        <span
          className='mr-2 '
          onClick={() => {
            setData((st) => {
              const modSt = st.map((it) =>
                it.id === item.id ? { ...it, isDone: !it.isDone } : it
              );
              return modSt
                .filter((it) => !it.isDone)
                .concat(modSt.filter((it) => it.isDone));
            });
            actionType.current = 'delDoneItem';
          }}
        >
          done
        </span>
        <span className={`${item.isDone && 'line-through'}`}>{item.text}</span>
        <span className='ml-auto g-trigger'>
          <GripVertical />
        </span>
      </div>
    </li>
  );
}
