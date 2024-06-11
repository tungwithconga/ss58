import React, { useEffect, useState } from 'react';
import './listStudents.css';
import axios from 'axios';

interface ListStudent {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function ListStudents() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listStudent, setListStudent] = useState<ListStudent[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<ListStudent | null>(null);
  const [newStudent, setNewStudent] = useState<ListStudent>({
    id: 0,
    student_name: '',
    email: '',
    address: '',
    phone: '',
    status: true,
    created_at: new Date().toISOString()
  });

  const handleAddEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:8080/student", newStudent)
      .then(response => {
        setListStudent([...listStudent, response.data]);
        setShowAddModal(false);
        setNewStudent({
          id: 0,
          student_name: '',
          email: '',
          address: '',
          phone: '',
          status: true,
          created_at: new Date().toISOString()
        });
      })
      .catch(error => console.error('There was an error adding the data!', error));
  };

  const handleEditEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedStudent) {
      axios.put(`http://localhost:8080/student/${selectedStudent.id}`, selectedStudent)
        .then(response => {
          setListStudent(listStudent.map(student => student.id === selectedStudent.id ? response.data : student));
          setShowEditModal(false);
        })
        .catch(error => console.error('There was an error updating the data!', error));
    }
  };

  const handleDeleteEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedStudent) {
      axios.delete(`http://localhost:8080/student/${selectedStudent.id}`)
        .then(() => {
          setListStudent(listStudent.filter(student => student.id !== selectedStudent.id));
          setShowDeleteModal(false);
        })
        .catch(error => console.error('There was an error deleting the data!', error));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (showAddModal) {
      setNewStudent({ ...newStudent, [name]: value });
    } else if (showEditModal && selectedStudent) {
      setSelectedStudent({ ...selectedStudent, [name]: value } as ListStudent);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8080/student")
      .then(response => setListStudent(response.data))
      .catch(error => console.error('There was an error fetching the data!', error));
  }, []);

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>Manage <b>Employees</b></h2>
              </div>
              <div className="col-sm-6">
                <button onClick={() => setShowAddModal(true)} className="btn btn-success">
                  <i className="material-icons">&#xE147;</i> <span>Add New Employee</span>
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="btn btn-danger">
                  <i className="material-icons">&#xE15C;</i> <span>Delete</span>
                </button>						
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>
                  <span className="custom-checkbox">
                    <input type="checkbox" id="selectAll" />
                    <label htmlFor="selectAll"></label>
                  </span>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listStudent.map(student => (
                <tr key={student.id}>
                  <td>
                    <span className="custom-checkbox">
                      <input type="checkbox" id={`checkbox${student.id}`} name="options[]" value={student.id} />
                      <label htmlFor={`checkbox${student.id}`}></label>
                    </span>
                  </td>
                  <td>{student.student_name}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td>{student.phone}</td>
                  <td>
                    <button onClick={() => {
                      setSelectedStudent(student);
                      setShowEditModal(true);
                    }} className="edit">
                      <i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
                    </button>
                    <button onClick={() => {
                      setSelectedStudent(student);
                      setShowDeleteModal(true);
                    }} className="delete">
                      <i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
            <ul className="pagination">
              <li className="page-item disabled"><a href="#">Previous</a></li>
              <li className="page-item"><a href="#" className="page-link">1</a></li>
              <li className="page-item"><a href="#" className="page-link">2</a></li>
              <li className="page-item active"><a href="#" className="page-link">3</a></li>
              <li className="page-item"><a href="#" className="page-link">4</a></li>
              <li className="page-item"><a href="#" className="page-link">5</a></li>
              <li className="page-item"><a href="#" className="page-link">Next</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" id="addEmployeeModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAddEmployee}>
                <div className="modal-header">						
                  <h4 className="modal-title">Add Employee</h4>
                  <button type="button" className="close" onClick={() => setShowAddModal(false)}>&times;</button>
                </div>
                <div className="modal-body">					
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="student_name"
                      value={newStudent.student_name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      value={newStudent.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea 
                      className="form-control" 
                      name="address"
                      value={newStudent.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="phone"
                      value={newStudent.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>					
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Add</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedStudent && (
        <div className="modal fade show d-block" id="editEmployeeModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleEditEmployee}>
                <div className="modal-header">						
                  <h4 className="modal-title">Edit Employee</h4>
                  <button type="button" className="close" onClick={() => setShowEditModal(false)}>&times;</button>
                </div>
                <div className="modal-body">					
                  <div className="form-group">
                    <label>Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="student_name"
                      value={selectedStudent.student_name}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      name="email"
                      value={selectedStudent.email}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea 
                      className="form-control" 
                      name="address"
                      value={selectedStudent.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      name="phone"
                      value={selectedStudent.phone}
                      onChange={handleChange}
                      required 
                    />
                  </div>					
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-info">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedStudent && (
        <div className="modal fade show d-block" id="deleteEmployeeModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleDeleteEmployee}>
                <div className="modal-header">						
                  <h4 className="modal-title">Delete Employee</h4>
                  <button type="button" className="close" onClick={() => setShowDeleteModal(false)}>&times;</button>
                </div>
                <div className="modal-body">					
                  <p>Are you sure you want to delete these Records?</p>
                  <p className="text-warning"><small>This action cannot be undone.</small></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-danger">Delete</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
