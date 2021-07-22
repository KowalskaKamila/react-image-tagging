import React, { useState } from 'react';
import { render } from "react-dom";
import styled from 'styled-components';

import { TaggableImage } from "./lib/TaggableImage.js";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Container = styled.div`
  width: 60%;
`

const BoldText = styled.span`
  font-weight: bold;
  font-size: 18px;
`

const App = () => {
  const img = "https://www.kamilaphotoart.com/wp-content/uploads/2019/06/IMG_7870.jpg"
  const [ myTags, setMyTag ] = useState([
    {x: 0.1, y: 0.6, content: "RodeoBeach", positionX: "13.861040276661893%", positionY: "62.207550630092484%"},
    {x: 0.9, y: 0.6, content: "ocean", positionX: "91.9970657071995%", positionY: "62.71057664596924%"},
    {x: 0.8, y: 0.5, content: "sunset", positionX: "79.70098159080588%", positionY: "49.7995755717991%"}
  ])
  const [ tagText, setTagText ] = useState('')

  function handleAddTag(newTag) {
    setTagText('')
    setMyTag ([...myTags, newTag])
  }

  function handleRemoveTag(tagToRemove) {
    const updatedTags = myTags.filter(tag => tag !== tagToRemove)
    setMyTag(updatedTags)
  }

  return (
    <div style={{fontFamily:'Verdana, Geneva, Tahoma, sans-serif'}}>
      <Row>
        <p><BoldText>Step 1.</BoldText> Type text that you want to tag on the image:</p>
        <input autoComplete='off' style={{marginLeft:10}} type='text' name='tag' value={tagText} onChange={(e) => setTagText(e.target.value)}/>
      </Row>
      <p><BoldText> Step 2.</BoldText> Click on the image to set the location of the tag.</p>
      <Container> 
        <TaggableImage 
          src = {img} 
          tags = {myTags} 
          newTag = {tagText} 
          onTagAdd= {handleAddTag}
          onTagRemove= {handleRemoveTag}
        />
      </Container>
    </div>
  )
}
render(<App />, document.getElementById("root"));
