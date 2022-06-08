import React,{ useState,useEffect} from 'react'

	import Example from './Example'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
    import { TouchBackend } from 'react-dnd-touch-backend'

function DragNDop() {

    const [isMobile,setMobile]=useState(false)
useEffect(()=>{
    if (typeof window !== 'undefined') {
        // detect window screen width function
      
    console.log(window?.screen?.width);
    if (window?.screen?.width < 768) {
        setMobile(true)
    }
    else{
        setMobile(false)
    }

}
},[])
  return (
    <div className="App">
				<DndProvider backend={isMobile?TouchBackend : HTML5Backend}>
					<Example />
				</DndProvider>
			</div>
  )
}

export default DragNDop