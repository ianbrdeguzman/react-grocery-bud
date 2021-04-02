import React, { useState, useEffect } from 'react';
import List from './components/List';

function App() {
    const [list, setList] = useState('');
    const [input, setInput] = useState({ id: '', title: '' });
    const [alert, setAlert] = useState({ class: '', text: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.title === '') return;
        setList([...list, input]);
        setAlert({ class: 'alert-success', text: 'item added to list' });
        e.target.reset();
        // setTimeout(() => {
        //     setAlert({ class: '', text: '' });
        // }, 3000);
    };

    const handleDelete = (id) => {
        const newList = list.filter((item) => {
            return item.id !== id;
        });
        setList(newList);
        setAlert({ class: 'alert-danger', text: 'item removed' });
        // setTimeout(() => {
        //     setAlert({ class: '', text: '' });
        // }, 3000);
    };

    const handleEdit = (id) => {
        const item = list.filter((item) => {
            return item.id === id;
        });
        console.log(item[0].id);
        console.log(item[0].title);
    };

    const handleClear = () => {
        setList([]);
        setAlert({ class: 'alert-danger', text: 'empty list' });
        // setTimeout(() => {
        //     setAlert({ class: '', text: '' });
        // }, 3000);
    };
    useEffect(() => {
        if (list.length === 0) {
            setList('');
        }
        setTimeout(() => {
            setAlert({ class: '', text: '' });
        }, 3000);
    }, [list]);
    return (
        <section className='section-center'>
            <form className='grocery-form' onSubmit={handleSubmit}>
                {alert && (
                    <p className={`alert ${alert.class}`}>{alert.text}</p>
                )}
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
            {list && (
                <div className='grocery-container'>
                    <div className='grocery-list'>
                        {list.map((item, index) => {
                            const { id, title } = item;
                            return (
                                <List
                                    key={index}
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
