import { useCallback, useMemo, useRef, useState, type InputEvent } from 'react'
import './App.css'


type menuType = 'button' | 'input'

const App = () => {
  const [menu, setMenu] = useState<menuType>("button")
  const onClickMoveButton = useRef(() => setMenu("button")).current
  const onClickMoveInput = useRef(() => setMenu("input")).current
  

  return (
    <>
      <div>
        <button
          id="moveButton"
          disabled={menu === "button"}
          onClick={onClickMoveButton}
        >
          type: button
        </button>
        <button
          id="moveInput"
          disabled={menu === "input"}
          onClick={onClickMoveInput}
        >
          type: input
        </button>
      </div>
      {menu === "button" && <ButtonDisplay />}
      {menu === "input" && <InputDisplay />}
    </>
  )
}

// 画面切り替え
// ボタン操作

const addNumber = 2
const downNumber = 2

const ButtonDisplay = () => {
  const [count, setCount] = useState(0)
  const [errorText, setError] = useState("")

  const setErrorText = useCallback((number: number) => {
    if (number >= 0) {
      setError("")
    } else {
      setError("数値がマイナスです")
    }
  }, [])

  const makeNextNumber = useCallback((baseNum: number, add: boolean): number => {
    let next = add ? baseNum + addNumber : baseNum - downNumber;
    if (next < 0) {
      next = 0
    }
    setErrorText(next)
    return next
  }, [])

  const addCount = useCallback(() => {
    setCount((v) => makeNextNumber(v, true))
  }, [])
  
  const downCount = useCallback(() => {
    setCount((v) => makeNextNumber(v, false))
  }, [])

  const errorDiv = useMemo(() => <div>{errorText}</div> ,[errorText])

  return (
    <>
      <div id="count-div">count: {count}</div>
      {errorText !== "" && errorDiv}
      <button id="add-count" onClick={addCount}>addCount</button>
      <button id="down-count" onClick={downCount}>addCount</button>
    </>
  )
}

// 画面切り替え
// 入力制御
const isIncludeZenkaku = (str: string): boolean => {
  return /[\u3000-\u30FF\u3400-\u9FFF\uFF01-\uFF60\uFFE0-\uFFE6]/.test(str);
}


const InputDisplay = () => {
  const [errorText, setError] = useState("")
  const onChange = useCallback((text: string) => {
    if (!isIncludeZenkaku(text)) {
      setError('全角が含まれています')
    } else {
      setError('')
    }
  }, [])
  return (
    <>
      <input
        id="first-input"
        onChange={(e) => onChange(e.target.value)}
      />
      {errorText != "" && <div>{errorText}</div>}
    </>
  )
}

export default App
