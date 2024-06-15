import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        //  console.warn(id)
        let result = await fetch(`http://localhost:5000/products/${id}`, {
            method: "Delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts();
        }


    }

    console.warn("products", products);

    return (
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-6    border offset-3 p-4 shadow-lg'>
                    <h3>Product List</h3>
                    <input type='text' className='form -control' onChange={searchHandle} />
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.length > 0 ? products.map((item, index) =>
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.category}</td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => deleteProduct(item._id)}>Delete</button>
                                            <Link className='btn btn-info' to={"/update/" + item._id}>Update</Link>
                                        </td>
                                    </tr>
                                )
                                    : <h1>No Result Found..!</h1>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
