import React from 'react';
import { Navbar } from 'react-bootstrap';

const Topbar = () => {
  return (
    <div>
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Readable</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    </div>
  )
}

export default Topbar
