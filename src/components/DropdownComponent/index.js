import './index.css';
import React, { useState, useEffect } from 'react'

function DropdownComponent(props) {
    const [label, setLabel] = useState("")
    const [data, setData] = useState([])
    const [isActive, setIsActive] = useState({})
    const [selectAll, setSelectAll] = useState(false)
    const [selectNone, setSelectNone] = useState(true)
    const [selectedText, setSelectedText] = useState("")
    const [isMulti, setIsMulti] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    useEffect(() => {
        setLabel(props.label)
    }, [props.label])

    useEffect(() => {
        setIsMulti(props.isMulti)
    }, [props.isMulti])


    useEffect(() => {
        console.log(data)
        let temp = {...isActive}
        for(let value of data){
            temp[value] = false
        }
        setIsActive(temp)
    }, [data])

    
    useEffect(() => {
        setSelectedText("")
        let selected = []
        let allActive = true
        for(let value in isActive){
            if(isActive[value]){
                selected.push(value)
            } else{
                allActive = false
            }
        }
        if(allActive){
            setSelectAll(true)
        } else {
            setSelectAll(false)
        }
        setSelectedText(selected.join(", "))
    }, [isActive])

    useEffect(() => {
        if(selectNone){
            let temp = {...isActive}
            for(let value of data){
                temp[value] = false
            }
            setIsActive(temp)
        }
        setIsOpen(false)
    }, [selectNone])

    function toggleAll(){
        let temp = {...isActive}
        for(let value of data){
            temp[value] = !selectAll
        }
        setIsActive(temp)
        setSelectAll(!selectAll)
    }

    function resetAndUpdate(item){
        let temp = {...isActive}
        for(let value of data){
            temp[value] = false
        }
        temp[item] = true
        setIsActive(temp)
        setSelectNone(false)
        setIsOpen(false)
    }

    return (
        <div className="container">
            <div className="custom-field" onClick={() => setIsOpen(!isOpen)}>
                <h1><span>{label}</span></h1>
                <div className='dropdown-row row'>
                    <div className='col-9'>{selectedText}</div>
                    <div className="dropdown-arrow col-3"><img src= {isOpen ? "icons/caret-up-solid.svg" : "icons/caret-down-solid.svg"}></img></div>
                </div>
            </div>
            <div className="row" style={isOpen ? {"display": "block"} : {"display": "none"}}>
                {isMulti ? 
                    (<div className="dropdown-list">
                        <div className= {selectAll ? "dropdown-list-item isActive" : "dropdown-list-item"} onClick={() => toggleAll()}>    
                            <input className='m-2' type="checkbox" checked={selectAll}/>
                            Select All
                        </div>
                        {data.map(item => 
                        <div className= {isActive[item] ? "dropdown-list-item isActive" : "dropdown-list-item"} onClick={() => setIsActive({...isActive, [item]: !isActive[item]})}>    
                            <input className='m-2' type="checkbox" checked={isActive[item]}  value={item}/>
                            {item}
                        </div>
                    )}
                    </div>) :
                    (<div className="dropdown-list">
                        <div className={selectNone ? "dropdown-list-item isActive" : "dropdown-list-item"} onClick={() => setSelectNone(true)}>    
                            None
                        </div>
                        {data.map(item => 
                        <div className={isActive[item] ? "dropdown-list-item isActive" : "dropdown-list-item"} onClick={() => resetAndUpdate(item)}>    
                            {item}
                        </div>
                    )}
                    </div>)
                }
            </div>
        </div>
    );
}

export default DropdownComponent;
