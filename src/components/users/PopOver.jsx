import React from 'react'
import Popover from 'react-bootstrap/Popover';
import ListOfUsers from './ListOfUsers';



const PopOver = ({ title, usuarios}) => {
  return (
    <Popover id="popover-basic">
    <Popover.Header as="h3">{title}</Popover.Header>
    <Popover.Body>
        <ListOfUsers  usuarios={usuarios} />
    </Popover.Body>
</Popover>
  )
}

export default PopOver