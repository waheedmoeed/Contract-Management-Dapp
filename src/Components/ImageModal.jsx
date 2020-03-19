import React from 'react';

import Modal from 'react-bootstrap/Modal'

class ImageModal extends React.Component{


    render(){
        return(
    <Modal show={this.props.cardShow} onHide={this.props.hideModal} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      </Modal>
        )
    }
}

export default ImageModal;