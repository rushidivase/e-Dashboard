import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const params = useParams();

    useEffect(() => {
        getProductDetails();

    }, [])

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        // console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const navigator = useNavigate();

    const updateProduct = async () => {
        console.warn(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
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
                    <h1 className='display-6 mb-3'>Update Product</h1>
                    <input type='text' placeholder='Enter Product Name' className='form-control mb-2'
                        onChange={(e) => setName(e.target.value)} value={name} />


                    <input type='text' placeholder='Enter Product Price' className='form-control mb-2'
                        onChange={(e) => setPrice(e.target.value)} value={price} />


                    <input type='text' placeholder='Enter Product Category' className='form-control mb-2'
                        onChange={(e) => setCategory(e.target.value)} value={category} />


                    <input type='text' placeholder='Enter Product Company' className='form-control mb-2'
                        onChange={(e) => setCompany(e.target.value)} value={company} />


                    <button className='btn btn-info' onClick={updateProduct}>Update Product</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct
