import React, { useState, useEffect } from 'react';
import List from './components/List';
import Alert from './components/Alert';

function App() {
    const getStoredList = () => {
        const storedList = JSON.parse(localStorage.getItem('list'));
        if (storedList) {
            return storedList;
        } else {
            return [];
        }
    };

    const [list, setList] = useState(getStoredList());
    const [input, setInput] = useState({ id: '', title: '' });
    const [alert, setAlert] = useState({ type: '', text: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.title) {
            showAlert('danger', 'please enter value');
            return;
        }
        setList([...list, input]);
        setInput({ id: '', title: '' });
        showAlert('success', 'item added to list');
        e.target.reset();
    };

    const handleDelete = (id) => {
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
        showAlert('danger', 'item removed');
    };

    const handleEdit = (id) => {
        const item = list.filter((item) => item.id === id);
        console.log(item[0].id);
        console.log(item[0].title);
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
                        placeholder='e.g. eggs'
                        onChange={(e) => {
                            const id = new Date().getTime();
                            setInput({ id: id, title: e.target.value });
                        }}
                    />
                    <button className='submit-btn' type='submit'>
                        submit
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
