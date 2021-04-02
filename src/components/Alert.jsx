import React, { useEffect } from 'react';

const Alert = (props) => {
    const { type, text } = props;
    useEffect(() => {
        const timeout = setTimeout(() => {
            props.removeAlert('', '');
        }, 3000);
        return () => clearTimeout(timeout);
    }, [props]);
    return <p className={`alert alert-${type}`}>{text}</p>;
};

export default Alert;
