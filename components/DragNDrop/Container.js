import update from "immutability-helper";
import { useCallback} from "react";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import { useState,useEffect } from "react";

// const styles = {
// //   width: 300,
// width: window?.screen?.width,
//   height: 300,
//   border: "1px solid black",
//   position: "relative"
// };
export const Container = ({ hideSourceOnDrag }) => {


    const [size,setSize]=useState("300")
useEffect(()=>{
    if (typeof window !== 'undefined') {
        // detect window screen width function
      
    console.log(window?.screen?.width);
    if (window?.screen?.width < 768) {
        setSize(window?.screen?.width)
    }
    // else{
    //     setSize(false)
    // }

}
},[])

const styles = {
    //   width: 300,
    width: size,
      height: 300,
      border: "1px solid black",
      position: "relative"
    };

  const [boxes, setBoxes] = useState({
    a: { top: 20, left: size<1400?80/1.92:80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" }
  });
  console.log(boxes);
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top }
          }
        })
      );
      console.log(boxes);
    },
    [boxes, setBoxes]
  );

  console.log(moveBox);
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        console.log(item.id);
        console.log(item);
        moveBox(item.id, left, top);
        return undefined;
      }
    }),
    [moveBox]
  );
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => {
        const { left, top, title } = boxes[key];
        return (
          <Box
            key={key}
            id={key}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
          >
            {title}
          </Box>
        );
      })}
    </div>
  );
};
