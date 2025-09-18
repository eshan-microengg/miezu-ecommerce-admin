import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icons = (props) => {
    const {iconName} = props
    return (
        <FontAwesomeIcon icon={iconName} />
    );
  };
  
  export default Icons;