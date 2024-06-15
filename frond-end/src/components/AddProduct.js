import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const navigator = useNavigate();

    const addProduct = async () => {
        console.warn(name, price, category, company);

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.warn(userId);
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        console.warn(result);
        result = await result.json(); //to convert JSON.
        if (result) {
            navigator('/');
        }
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-6 offset-3 border shadow p-4  text-center'>
                    <h1 className='display-6 mb-3'>Add Product</h1>
                    <input type='text' placeholder='Enter Product Name' className='form-control mb-2'
                        onChange={(e) => setName(e.target.value)} value={name} />
                    {error && !name && <span className='invalid-input mb-2'>Enter Valid Name</span>}

                    <input type='text' placeholder='Enter Product Price' className='form-control mb-2'
                        onChange={(e) => setPrice(e.target.value)} value={price} />
                    {error && !price && <span className='invalid-input mb-2'>Enter Valid Price</span>}

                    <input type='text' placeholder='Enter Product Category' className='form-control mb-2'
                        onChange={(e) => setCategory(e.target.value)} value={category} />
                    {error && !category && <span className='invalid-input mb-2'>Enter Valid Category</span>}

                    <input type='text' placeholder='Enter Product Company' className='form-control mb-2'
                        onChange={(e) => setCompany(e.target.value)} value={company} />
                    {error && !company && <span className='invalid-input mb-2'>Enter Valid Company </span>}

                    <button className='btn btn-info' onClick={addProduct}>Add Product</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
