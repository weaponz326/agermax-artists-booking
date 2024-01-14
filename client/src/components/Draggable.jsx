import React, { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Draggable from 'react-draggable'

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragging, setDragging] = useState(false)

  const handleStart = () => {
    setDragging(true)
  }

  const handleStop = (e, data) => {
    setDragging(false)

    // Calculate the new index based on the drag distance
    const newIndex = Math.round((data.x / data.node.offsetWidth) % items.length)
    setCurrentIndex((currentIndex + newIndex + items.length) % items.length)
  }

  return (
    <div className='carousel'>
      <TransitionGroup>
        {items.map((item, index) => (
          <CSSTransition key={index} classNames='item' timeout={500} onExited={() => handleClick(index)}>
            <Draggable
              key={index}
              disabled={!dragging}
              defaultPosition={{ x: 0, y: 0 }}
              position={null}
              grid={[1, 1]}
              scale={1}
              onStart={handleStart}
              onStop={handleStop}
            >
              <div
                className={`item ${currentIndex === index ? 'active' : ''}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {item}
              </div>
            </Draggable>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <div className='indicators'>
        {items.map((item, index) => (
          <button
            key={index}
            className={`indicator ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleClick(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
