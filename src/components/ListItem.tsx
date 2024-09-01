import { GripVertical } from 'lucide-react';

type Props = {
  item: string;
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  actionType: React.MutableRefObject<
    'delItem' | 'addItem' | 'firstRender' | 'dragItem' | null
  >;
};

export default function ListItem({ item, setData, actionType }: Props) {
  return (
    <li className='g-list-item absolute top-0 left-0 h-[90px] w-full'>
      {/* <div className='item-content'> */}
      <div className='item-content h-full bg-gray-100 rounded-xl shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] text-2xl px-4 flex items-center border-solid border-gray-200'>
        <span
          onClick={() => {
            setData((st) => st.filter((it) => it !== item));
            actionType.current = 'delItem';
          }}
        >
          del
        </span>{' '}
        <span>{item}</span>
        <span className='ml-auto g-trigger'>
          <GripVertical />
        </span>
      </div>
    </li>
  );
}
