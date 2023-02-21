import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import  {ComponentToPrint}  from './ComponentToPrint';
import PropTypes from 'prop-types';

const Example = (record) => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} record={record} />
        </div>
    </div>
  );
};
Example.propTypes = {
    record: PropTypes.object
};
export default Example;