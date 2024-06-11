import axios from 'axios'
import React, { useEffect } from 'react'

export default function ListInforStudent() {
    //hiện ra all trong console.log
    // useEffect(() => {
    //     axios.get("http://localhost:8080/student")
    //     .then((data)=>console.log(data.data)
    //     )
    // }, [])
    

    // lấy thông tin chi tiết theo id
    // useEffect(() => {
    //     axios.get("http://localhost:8080/student/2")
    //     .then(data=>console.log(data.data))
    //     .catch(err=>console.log(err)
    //     )
    // }, [])
    
    // xoá theo id
    // useEffect(() => {
    //     axios.delete("http://localhost:8080/student/2")
    //     .then(data=>console.log(data.data))
    //     .catch(err=>console.log(err)
    //     )
    // },[])

    // thêm 
    // useEffect(() => {
    //     let newInfor = {
    //         student_name:"F",
    //         email: "nvF@gmail.com",
    //         address: "Nhà",
    //         phone: "0355483082",
    //         status: true,
    //         created_at: "11/02/2005"
    //     }
    //     axios.post("http://localhost:8080/student",newInfor)
    //     .then(data=>console.log(data))
    //     .catch(err=>console.log(err)
    //     )
    // },[])
    
    
    //cập nhật thông tin
    //  useEffect(() => {
    //   let updateInfor = {
    //     student_name: "Gia Thiều"
    //   }
    //   axios.patch("http://localhost:8080/student/1",updateInfor)
    //   .then(data=>console.log(data))
    //   .catch(err=>console.log(err)
    //   )
    // },[])
  return (
    <div>
        
    </div>
  )
}
