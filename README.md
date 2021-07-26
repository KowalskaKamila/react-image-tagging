# React Image Tagging Component

<img src="https://github.com/KowalskaKamila/react-image-tagging/blob/master/demo.gif" width="500"  />

## Installation

```
npm i react-image-tagging
```

## Usage

```javascript
import React, { useState } from "react";
import TaggableImage from "react-image-tagging";

const ImageTaggingExample = () => {
  const img = "https://www.kamilaphotoart.com/wp-content/uploads/2019/06/IMG_7870.jpg"
  const [ myTags, setMyTag ] = useState([])
  const [ tagText, setTagText ] = useState('')

  function handleAddTag(newTag) {
    setTagText('')
    setMyTag([...myTags, newTag])
  }

  function handleRemoveTag(tagToRemove) {
    const updatedTags = myTags.filter(tag => tag !== tagToRemove)
    setMyTag(updatedTags)
  }

  return (
    <>
      <input 
        autoComplete='off' 
        style={{marginLeft:10}} 
        type='text' name='tag' 
        value={tagText} 
        onChange={(e) => setTagText(e.target.value)}
      />
      <div style={{width:'60%'}}> 
        <ImageTagging 
          imageURL = {img} 
          tags = {myTags} 
          newTag = {tagText} 
          onTagAdd= {handleAddTag}
          onTagRemove= {handleRemoveTag}
        />
      </div>
    </>
  )
}

```

## Props

| Prop | Type | Description | Default/Required |
| --- | --- | --- | --- |
| `src` | string | Image src attribute | **Required** |
| `alt` | string | Image alt attribute | |
| `tags` | array | Array of tags | **Required** |
| `newTag` | string | Text of new tag | |
| `onTagAdd` | function | Returns new added tag | |
| `allowAddingTags` | boolean | Allow to add new tags | `true` |
| `allowEmptyTags` | boolean | Allow to add empty tags | `true` |
| `onTagRemove` | function | Returns tag to remove | |
| `removable` | boolean | Allow to remove tags | `true`|
| `showOnHover` | boolean | Show tags only when image hovering | `false`|
| `tagColor` | string | Background color of a tag | '#ffffff' |
| `deleteIconColor` | string | Color of the remove tag icon | '#808080' |
| `hoverDeleteIconColor` | string | Color of the remove tag icon when icon hovering | '#000000' |
| `tagTextStyle` | object | Style attributes for tag text | |






