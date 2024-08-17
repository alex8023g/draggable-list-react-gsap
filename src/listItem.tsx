type Props = {
  item: string;
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  actionType: React.MutableRefObject<
    "delItem" | "addItem" | "firstRender" | "dragItem" | null
  >;
};

export default function ListItem({ item, setData, actionType }: Props) {
  return (
    <li
      className="g-list-item"
      key={item}
      // ref={(el) => (refItems.current[i] = el!)}
    >
      <div className="item-content">
        <span
          onClick={() => {
            setData((st) => st.filter((it) => it !== item));
            actionType.current = "delItem";
            // refItems.current.splice(i, 1);
          }}
        >
          del
        </span>{" "}
        {item}
      </div>
    </li>
  );
}
