import React, { useEffect, useState } from 'react';
import { Users, User, Plus, Phone, Check, X } from 'lucide-react';
import StatusCard from './components/StatusCard';
import SearchBar from './components/SearchBar';
import UserTable from './components/UserTable';
import UserModel from './components/UserModel';
import { getUsers, searchUsers, getStatus, addUser, updateUser, deleteUser } from './api/UserApi';

const App = () => {

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [status, setStatus] = useState({ total: 0, active: 0, inactive: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active',
  });

  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerpage, setItemesPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const stats = ['Active', 'Inactive'];

  // fetch users
  useEffect(() => {
    fetchUsers();
  }, [currentPage, itemsPerpage]);

  useEffect(() => {
    if (searchTerm) handleSearch();
    else fetchUsers();
  }, [searchTerm]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone)
      return alert('Fill all fields');
    setLoading(true);

    try {
      if (editingItem) await updateUser(editingItem._id, formData);
      else await addUser(formData);
      fetchUsers();
      closeModel();
    } catch (error){
      alert(error.message);
    }
    setLoading(false);
  };

  const handleDelete = async(id) => {
    if(window.confirm('Are you sure')){
      await deleteUser(id);
      fetchUsers();
    }
  };

  const openModel = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: '', email: '', phone: '', status: 'Active'});
    }
    setIsModelOpen(true);
  };

  const closeModel = () => {
    setIsModelOpen(false);
    setEditingItem(null);
    setFormData({ name: '', email: '', phone: '', status: 'Active'});
  };

  // fetch status
  const fetchStatus = async () => {
    const data = await getStatus();
    setStatus(data);
  };

  const fetchUsers = async () => {
    const data = await getUsers(currentPage, itemsPerpage);
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setTotalUsers(data.setTotalUsers);
    fetchStatus();
  };

  const handleSearch = async() => {
    const data = await searchUsers(searchTerm, currentPage, itemsPerpage);
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setTotalUsers(data.totalPages);
  };

  return (
    <div className='min-h-screen bg-gray-950'>
      {/* Header */}
      <header className='bg-gray-900 shadow-xl border-b border-gray-800'>
        <div className='max-w-7xlmax-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-500 rounded-lg'>
              <Users size={28} className='text-gray-900'/>
            </div>
            <div>
              <h1 className='text-3xl font-bold text-white'>User Management</h1>
              <p className='text-gray-400 mt-1'>MERN Stack Application</p>
            </div>
          </div>
          <button className='flex items-center gap-2 bg-green-500 text-gray-900 px-5 py-2.5 rounded-lg hover:bg-reen-400 transition-colors shadow-lg font-semibold' onClick={() => openModel()}>
            <plus size={20}/> Add User
          </button>
        </div>
      </header>
      {/* Main */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          {/* Status */}
          <StatusCard title='Total Users' value={{ number: status.total }} icon={<Users/>} bgIcon='bg-indigo-500' iconColor='text-white' gradient='from-indgo-900 to-indgo-700' />
          <StatusCard title='Active Users' value={{ number: status.active }} icon={<Check/>} bgIcon='bg-green-500' iconColor='text-white' gradient='from-green-900 to-green-700' />
          <StatusCard title='Inactive Users' value={{ number: status.inactive }} icon={<X/>} bgIcon='bg-red-500' iconColor='text-white' gradient='from-red-900 to-red-700' />
        </div>
        {/* Search */}
        <SearchBar/>
        {/* User Table */}
        <UserTable/>
        {/* User Model */}
        <UserModel isOpen={isModelOpen} onClose={closeModel} />
      </main>
    </div>
  )
}

export default App
