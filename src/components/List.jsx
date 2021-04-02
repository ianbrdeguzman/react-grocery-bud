import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

class List extends Component {
    render() {
        const { title, id, onEdit, onDelete } = this.props;
        return (
            <article className='grocery-item'>
                <p className='title'>{title}</p>
                <div className='btn-container'>
                    <button onClick={() => onEdit(id)} className='edit-btn'>
                        <FaEdit />
                    </button>
                    <button onClick={() => onDelete(id)} className='delete-btn'>
                        <FaTrash />
                    </button>
                </div>
            </article>
        );
    }
}

export default List;
