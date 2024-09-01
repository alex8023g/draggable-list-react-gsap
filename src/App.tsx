import { useRef, useState } from 'react';
import './App.css';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import ListItem from './components/ListItem';
import { AddBtn } from './components/AddBtn';

type Sortable = {
  dragger: Draggable;
  element: Element;
  index: number;
  setIndex: (index: number) => void;
};

gsap.registerPlugin(Draggable);
gsap.registerPlugin(useGSAP);
function App() {
  const [data, setData] = useState(['1 Alfa', '2 Bravo', '3 Charlie', '4 Delta']);

  const actionType = useRef<'addItem' | 'delItem' | 'dragItem' | null>(null);

  const container = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const rowSize = 100; // => container height / number of items
      const listItems = Array.from(document.querySelectorAll('.g-list-item')); // Array of elements
      console.log('🚀 ~ App ~ listItems:', listItems);
      const sortables = listItems.map(Sortable); // Array of sortables
      const total = sortables.length;
      const dataClone = structuredClone(data);
      console.log(
        'useGSAP:',
        actionType.current,
        'sortables.length:',
        sortables.length,
        dataClone
      );

      function Sortable(element: Element, index: number) {
        const content = element.querySelector('.item-content');

        const animation = gsap.to(content, {
          boxShadow: 'rgba(0,0,0,0.2) 0px 16px 32px 0px',
          force3D: true,
          scale: 1.1,
          paused: true,
          delay: 0.1,
        });

        const dragger = new Draggable(element, {
          onPress: () => {
            animation.play();
          },

          onDrag: onDragFunc,
          onRelease: () => {
            if (actionType.current !== 'delItem') {
              animation.reverse();
              gsap.to(element, { y: sortable.index * rowSize });
              setData(dataClone);
            }
          },
          cursor: 'inherit',
          type: 'y',
          trigger: element.querySelector('.g-trigger'),
        });

        // Public properties and methods
        const sortable = {
          dragger: dragger,
          element: element,
          index: index,
          setIndex: setIndex,
        };

        if (actionType.current === 'addItem') {
          const fromIndex = index === data.length - 1 ? index - 1 : index;

          const tl = gsap.timeline();

          tl.set(element, { zIndex: -index })
            .fromTo(
              element,
              { y: fromIndex * rowSize },
              {
                y: index * rowSize,
                duration: 0.3,
              }
            )
            .set(element, { zIndex: 0 });
        } else if (
          actionType.current === 'delItem' ||
          actionType.current === 'dragItem'
        ) {
          console.log('delItem || dragItem');
          gsap.to(element, { y: index * rowSize });
        } else {
          console.log('else');
          gsap.set(element, { y: index * rowSize });
        }

        function setIndex(index: number) {
          sortable.index = index;

          // Don't layout if you're dragging
          if (!dragger.isDragging) {
            gsap.to(element, { y: sortable.index * rowSize });
          }
        }

        function onDragFunc(this: Draggable) {
          actionType.current = 'dragItem';
          // Calculate the current index based on element's position
          const index = clamp(Math.round(this.y / rowSize), 0, total - 1);

          if (index !== sortable.index) {
            changeIndex(sortable, index);
          }
        }

        return sortable;
      }

      // Clamps a value to a min/max
      function clamp(value: number, a: number, b: number) {
        return value < a ? a : value > b ? b : value;
      }
      function changeIndex(item: Sortable, to: number) {
        // Change position in array
        sortables.splice(to, 0, sortables.splice(item.index, 1)[0]);

        dataClone.splice(to, 0, dataClone.splice(item.index, 1)[0]);

        sortables.forEach((sortable, index) => sortable.setIndex(index));
      }
      actionType.current = null;
    },
    { scope: container, dependencies: [data] }
  );
  return (
    <>
      <h1 className='text-center bg-blue-500 sticky top-0 z-50 text-white py-3'>
        Tasks list
      </h1>
      <ul
        className='g-container relative top-[20px] left-[50%] w-[450px] h-[80%] -translate-x-1/2'
        ref={container}
      >
        {data.map((item) => (
          <ListItem key={item} item={item} setData={setData} actionType={actionType} />
        ))}
      </ul>
      <AddBtn setData={setData} actionType={actionType} />
    </>
  );
}

export default App;
