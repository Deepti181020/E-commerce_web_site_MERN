import React, { useState, useEffect } from 'react';
import location_icon from '../Asset/location_icon.png';
import home_icon from '../Asset/home_icon.png';
import axios from 'axios';

const Address = () => {
    const [showForm, setShowForm] = useState(false);
    const [addressData, setAddressData] = useState({
        address: '',
        locality: '',
        city: '',
        district: '',
        state: '',
        zipCode: '',
        phone: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isViewing, setIsViewing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const excludedFields = ['userId', '_id', 'date', '__v']; // Define fields to exclude

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
        setError(''); // Clear error when user starts typing
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    };

    const handleSubmit = async () => {
        // Check for mandatory fields
        if (!addressData.address || !addressData.city || !addressData.zipCode || !addressData.phone) {
            setError('Please fill all required fields.');
            return;
        }

        setIsSubmitting(true);
        setError('');
        const token = localStorage.getItem('auth-token');

        try {
            const response = await axios.post("http://localhost:4000/addaddress", addressData, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                setAddressData({
                    address: '',
                    locality: '',
                    city: '',
                    district: '',
                    state: '',
                    zipCode: '',
                    phone: ''
                });
                setShowForm(false);
                fetchAddresses();
                showSuccessMessage('Address Added!');
            } else {
                setError(response.data.message || 'Error submitting the address.');
            }
        } catch (error) {
            setError('Error submitting the address: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleEditSubmit = async () => {
        if (!addressData.address || !addressData.city || !addressData.zipCode || !addressData.phone) {
            setError('Please fill all required fields.');
            return;
        }

        setIsSubmitting(true);
        setError('');
        const token = localStorage.getItem('auth-token');

        try {
            const response = await axios.put(`http://localhost:4000/edit-address/${addressData._id}`, addressData, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setAddressData({
                    address: '',
                    locality: '',
                    city: '',
                    district: '',
                    state: '',
                    zipCode: '',
                    phone: ''
                });
                setShowForm(false);
                fetchAddresses(); // Refresh the list of addresses
                showSuccessMessage('Edited!');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error updating the address.';
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchAddresses = async () => {
        setIsLoading(true); // Start loading
        const token = localStorage.getItem('auth-token');

        try {
            const response = await axios.get("http://localhost:4000/view-address", {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            setSavedAddresses(response.data.addresses);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching addresses.';
            setError(errorMessage);
        } finally {
            setIsLoading(false); // End loading
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleViewAddresses = () => {
        setShowForm(false);
        setIsViewing(true);
        fetchAddresses();
    };

    const handleEdit = (address) => {
        setAddressData(address);
        setShowForm(true);
        setIsViewing(false);
    };

    const handleDelete = async (addressId) => {
        const token = localStorage.getItem('auth-token');
        try {
            const response = await axios.delete(`http://localhost:4000/delete-address/${addressId}`, {
                headers: {
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                fetchAddresses(); // Refresh the list of addresses
                showSuccessMessage('Deleted!');
            } else {
                setError('Error deleting address');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error deleting address';
            setError(errorMessage);
        }
    };



    return (
        <div className="w-full h-auto  lg:h-[700px] flex flex-col items-start justify-start my-2 mx-2 gap-5 bg-white p-4 md:p-6 lg:p-8">

            <div className="flex flex-row gap-5 flex-wrap">
                {/* New Address and View Address Icons */}
                <div className="flex flex-col items-center">
                    <div
                        className="border rounded-[10px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] p-4 box-border flex flex-col items-center justify-center bg-white shadow-md hover:bg-[#6b6969] cursor-pointer"
                        onClick={() => {
                            setShowForm(!showForm);
                            setIsViewing(false);
                        }}
                    >
                        <img src={location_icon} alt="New Address" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
                    </div>
                    <p className="text-sm lg:text-base text-center">New Address</p>
                </div>

                <div className="flex flex-col items-center" onClick={handleViewAddresses}>
                    <div className="border rounded-[10px] w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] p-4 box-border flex flex-col items-center justify-center bg-white shadow-md hover:bg-[#6b6969] cursor-pointer">
                        <img src={home_icon} alt="View Address" className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]" />
                    </div>
                    <p className="text-sm lg:text-base text-center">View Address</p>
                </div>
            </div>

            {showForm && (
                <div className="w-[90%] mt-5 flex flex-col gap-5">
                    {error && (
                        <p className="text-red-600 text-sm lg:text-base">{error}</p>
                    )}
                    {Object.keys(addressData)
                        .filter(key => !excludedFields.includes(key))
                        .map((key) => (
                            <input
                                key={key}
                                type="text"
                                name={key}
                                value={addressData[key]}
                                onChange={handleChange}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                className="border-b-2 border-black p-2 w-full focus:outline-none text-sm lg:text-base"
                                required
                            />
                        ))}
                    <button
                        onClick={addressData._id ? handleEditSubmit : handleSubmit}
                        disabled={isSubmitting}
                        className="bg-black text-white rounded p-2 mt-3 w-full lg:w-[50%] self-center md:self-start"
                    >
                        {isSubmitting ? 'Saving...' : addressData._id ? 'Edit Address' : 'Add Address'}
                    </button>
                </div>
            )}

            {/* Code for displaying saved addresses and success messages remains unchanged */}
            {isViewing && savedAddresses.length > 0 && (
                <div className="mt-5 w-full flex flex-col">
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">Saved Addresses:</h3>
                    {successMessage && (
                        <p className="text-black text-sm lg:text-base mt-2 transition-opacity">{successMessage}</p>
                    )}
                    {error && <p className="text-black text-sm lg:text-base mt-2">{error}</p>}
                    <div className="max-h-[400px] overflow-y-auto flex-grow">
                        {savedAddresses.map((address, index) => (
                            <div key={index} className="relative border p-3 my-2 rounded shadow-sm text-sm lg:text-base break-words">
                                <div className="flex justify-end gap-2 mb-2">
                                    <button
                                        onClick={() => handleEdit(address)}
                                        className="bg-transparent text-black border px-2 py-1 rounded text-xs lg:text-sm hover:bg-[#f0f0f0]"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(address._id)}
                                        className="bg-transparent text-black border px-2 py-1 rounded text-xs lg:text-sm hover:bg-[#f0f0f0]"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className="pl-2">
                                    <p><strong>Address:</strong> {address.address}</p>
                                    <p><strong>Locality:</strong> {address.locality}</p>
                                    <p><strong>City:</strong> {address.city}</p>
                                    <p><strong>District:</strong> {address.district}</p>
                                    <p><strong>State:</strong> {address.state}</p>
                                    <p><strong>Zip Code:</strong> {address.zipCode}</p>
                                    <p><strong>Phone:</strong> {address.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
              {isLoading && <p className="text-sm lg:text-base">Loading addresses...</p>}
              {successMessage && <p className="text-green-600 text-sm lg:text-base">{successMessage}</p>}

            {error && <p className="text-red-600 text-sm lg:text-base mt-2"></p>}
        </div>
    );
};

export default Address;