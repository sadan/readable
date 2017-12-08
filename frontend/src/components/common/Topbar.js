import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default function Topbar () {
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
