import React, { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';

const getStoredList = () => {
    const storedList = JSON.parse(localStorage.getItem('list'));
    if (storedList) {
        return storedList;
    } else {
        return [];
    }
};

function App() {
    const [list, setList] = useState(getStoredList());
    const [input, setInput] = useState({ id: '', title: '' });
    const [alert, setAlert] = useState({ type: '', text: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.title) {
            showAlert('danger', 'please enter value');
            return;
        }
        if (input && isEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editId) {
                        return { ...item, title: input.title };
                    }
                    return item;
                })
            );
            setInput({ id: '', title: '' });
            setEditId(null);
            setIsEditing(false);
            showAlert('success', 'value changed');
            e.target.reset();
        } else if (input && !isEditing) {
            setList([...list, input]);
            setInput({ id: '', title: '' });
            showAlert('success', 'item added to list');
            e.target.reset();
        }
    };

    const handleDelete = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
        showAlert('danger', 'item removed');
    };

    const handleEdit = (id) => {
        const item = list.filter((item) => item.id === id);
        setIsEditing(true);
        setEditId(id);
        setInput({ id, title: item[0].title });
        showAlert('danger', 'editing...');
    };

    const handleClear = () => {
        setList([]);
        showAlert('danger', 'empty list');
    };

    const showAlert = (type, text) => {
        setAlert({ type, text });
    };
    useEffect(() => {
        if (list.length >= 0) {
            localStorage.setItem('list', JSON.stringify(list));
        }
    }, [list]);

    return (
        <section className='section-center'>
            <form className='grocery-form' onSubmit={handleSubmit}>
                {alert.type && <Alert {...alert} removeAlert={showAlert} />}
                <h3>grocery bud</h3>
                <div className='form-control'>
                    <input
                        className='grocery'
                        type='text'
                        name='grocery'
                        id='grocery'
                        value={input.title}
                        placeholder='e.g. eggs'
                        onChange={(e) => {
                            if (isEditing) {
                                setInput({ id: editId, title: e.target.value });
                            } else {
                                const id = new Date().getTime();
                                setInput({ id: id, title: e.target.value });
                            }
                        }}
                    />
                    <button className='submit-btn' type='submit'>
                        {isEditing ? 'edit' : 'add'}
                    </button>
                </div>
            </form>
            {list.length > 0 && (
                <div className='grocery-container'>
                    <div className='grocery-list'>
                        {list.map((item) => {
                            const { id, title } = item;
                            return (
                                <List
                                    key={id}
                                    id={id}
                                    title={title}
                                    onDelete={handleDelete}
                                    onEdit={handleEdit}
                                />
                            );
                        })}
                    </div>
                    <button onClick={handleClear} className='clear-btn'>
                        clear items
                    </button>
                </div>
            )}
        </section>
    );
}

export default App;
