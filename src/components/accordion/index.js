import Accordion from 'react-bootstrap/Accordion';

export const FormAccordion = ({header , children , key}) => {
  return (
    <Accordion defaultActiveKey="0" >
      <Accordion.Item eventKey={key} style={{borderStyle:"none"}}>
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Body>
          {children}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}