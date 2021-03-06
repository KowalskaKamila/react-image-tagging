import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BiX } from 'react-icons/bi';

const Wrapper = styled.div`
  position: relative; 
  display: inline-block;
`

const ImageTag = styled.div`
  width: fit-content;
  padding: 1px 2px 1px 8px;
  border-radius: 6px;
  filter: drop-shadow( 1px 1px 1px black);
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  position: absolute;
  ${props => props.color && `background-color: ${props.color};` }
  ${props => props.tag && props.tag.positionX && props.tag.positionY && `
    left: ${props.tag.positionX};
    top: ${props.tag.positionY};
  `}
`

const Image = styled.img`
  cursor: pointer; 
`

const TagText = styled.p`
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  max-width: 120px;
  padding-right: 6px;
  margin: auto;
  cursor: default;
  font-family: Verdana, Geneva, Tahoma, sans-serif; 
  font-size: 13px;
`

const RemoveIcon = styled.div`
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.color && `color: ${props.color};` }

  &:hover {
    ${props => props.hoverColor && `color: ${props.hoverColor};` }
  }
`

const TaggableImage = ({src, tags, newTag='', tagColor='#ffffff', tagTextStyle={}, onTagAdd, onTagRemove, alt='',
                      removable=true, deleteIconColor='#808080', hoverDeleteIconColor='#000000', showOnHover=false, 
                      allowEmptyTags=false, allowAddingTags=true}) => {
  const imageRef = useRef();
  const [ markedCoordinatesToWindow, setMarkedCoordinatesToWindow ] = useState(null)
  const [ hideTags, setHideTags ] = useState(showOnHover)

  useEffect(()=>{
    // Get image size and the position.
    const imageDetails = imageRef.current.getBoundingClientRect()

    if ((markedCoordinatesToWindow && newTag && newTag.length > 0 && allowAddingTags && !allowEmptyTags) || 
        (markedCoordinatesToWindow && allowAddingTags && allowEmptyTags)) {
        // Calculate the position of the tag relatively to the image.
        const x = markedCoordinatesToWindow.x - imageDetails.left
        const y = markedCoordinatesToWindow.y - imageDetails.top

        // Position of the tag in the percentage value.
        // Everytime user switches image the tag will be in the same position relatively to the image regardless of image size.
        const positionXInPercentage = `${(x*100) / imageDetails.width}%`
        const positionYInPercentage = `${(y*100) / imageDetails.height}%`

        // Normalize tag position to the range of 0.0???1.0.
        const normalizedXPosition = parseFloat(( x / imageDetails.width).toFixed(1))
        const normalizedYPosition = parseFloat(( y / imageDetails.height).toFixed(1))

        const newTagData = { x: normalizedXPosition, y: normalizedYPosition, content:newTag.trim(), positionX: positionXInPercentage, positionY: positionYInPercentage }
        onTagAdd(newTagData)
    }
  }, [imageRef, markedCoordinatesToWindow, src])

  function removeTag(tagToRemove) {
    onTagRemove(tagToRemove)
  }

  return (
    <Wrapper>
      <Image 
        ref={imageRef} 
        src={src} 
        alt={alt}
        width='100%'
        height='auto'
        onMouseOver={() => showOnHover && setHideTags(false)} 
        onMouseOut={() => showOnHover && setHideTags(true)} 
        onClick={(e) => setMarkedCoordinatesToWindow({'x': e.clientX, 'y': e.clientY})}
      />
      {tags && tags.length > 0 && !hideTags && 
        tags.map((tag, idx) =>
          <ImageTag
            key={idx}
            tag={tag}
            color={tagColor}
            onMouseEnter={() => showOnHover && setHideTags(false)}
            // Make sure tag doesn't go out of the image area.
            style={{transform: `${ tag.x >0.6 ? 'translateX(-100%)'.concat(tag.y > 0.6 ? 'translateY(-100%)': '') : tag.y >0.6 && 'translateY(-100%)' }`}}
          >
            <TagText style={tagTextStyle}> {tag.content} </TagText>
            {removable &&
              <RemoveIcon 
                onClick={() => removeTag(tag)} 
                hoverColor={hoverDeleteIconColor}
                color={deleteIconColor}
              >
                <BiX size={16} style={{marginTop:2}}/>
              </RemoveIcon>
            } 
          </ImageTag>
        )
      }
    </Wrapper>
  )
}

TaggableImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  tags: PropTypes.array.isRequired, 
  allowAddingTags: PropTypes.bool, 
  newTag: PropTypes.string,
  onTagAdd: PropTypes.func,
  onTagRemove: PropTypes.func,
  tagColor: PropTypes.string, 
  tagTextStyle: PropTypes.object, 
  removable: PropTypes.bool, 
  hoverDeleteIconColor: PropTypes.string, 
  deleteIconColor: PropTypes.string,
  showOnHover: PropTypes.bool,
  allowEmptyTags: PropTypes.bool
}

export default TaggableImage;