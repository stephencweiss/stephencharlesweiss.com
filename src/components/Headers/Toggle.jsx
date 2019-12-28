import React from 'react'

// import Toggle from './Toggle'

const DarkModeToggle = props => {
  const { darkMode } = props

  return (
    <div>
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      {/* <Toggle checked={darkMode.value} onChange={darkMode.toggle} /> */}
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  )
}

export default DarkModeToggle
