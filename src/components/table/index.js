import React from 'react';
import Table from 'react-bootstrap/Table';

export const AccordionTable = ({ children }) => {
  return (
    <Table striped bordered hover>
      {children}
    </Table>
  );
};
