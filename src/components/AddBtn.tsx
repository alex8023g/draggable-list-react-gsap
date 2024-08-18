import { nanoid } from "nanoid";

type Props = {
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  actionType: React.MutableRefObject<
    "delItem" | "addItem" | "firstRender" | "dragItem" | null
  >;
};

export function AddBtn({ setData, actionType }: Props) {
  return (
    <button
      className="bg-blue-500 w-16 h-16 rounded-full fixed bottom-10 left-[50%] -translate-x-[50%] text-white"
      onClick={() => {
        setData((st) => [...st, nanoid()]);
        actionType.current = "addItem";
      }}
    >
      +
    </button>
  );
}
