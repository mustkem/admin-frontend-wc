import React from 'react'
import Container from 'react-bootstrap/Container'
import PrimaryHeader from './PrimaryHeader'

function Header(props) {
    return (
      <div className="header-wrap">
          <Container >
                <PrimaryHeader />
          </Container >

        </div>
     
    )
}

export default Header
