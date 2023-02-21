import React, { useRef } from 'react';
import PropTypes from 'prop-types';
export class ComponentToPrint extends React.Component {
    render() {
        // console.log(this.props.record.record)
        const name = this.props.record.record.full_name;
        const order = this.props.record.record.order_name;
        console.log(order)
   
 
      return (
        <>
      <div> {name}    {order}</div>
      </>
 
      );
    }
  }
  ComponentToPrint.propTypes = {
    record: PropTypes.object
};
// export const ComponentToPrint = React.forwardRef((props, ref) =>  {
//     return (
//         <div>
//             {console.log(props.record.title)}
//         </div>
//     )
// })