import React, { Component } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

class List extends Component {
    state = {};
    render() {
        return (
            <article className='grocery-item'>
                <p className='title'>{this.props.title}</p>
                <div className='btn-container'>
                    <button
                        onClick={() => this.props.onEdit(this.props.id)}
                        className='edit-btn'
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => this.props.onDelete(this.props.id)}
                        className='delete-btn'
                    >
                        <FaTrash />
                    </button>
                </div>
            </article>
        );
    }
}

export default List;
