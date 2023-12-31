

import JobCard from "./JobCard";
import { useState } from "react";
import Swal from 'sweetalert2'
import { useEffect } from "react";
import useAuthProvider from "../../../CustomHooks/useAuthProvider";
import { Helmet } from "react-helmet";

const MyPostedJobs = () => {
  const {user} = useAuthProvider()
    
  
    
    
    const [allPostedJobs, setAllPostedJobs] = useState([])
   
    useEffect(() => {
        fetch(`https://dream-job-finder-server.vercel.app/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setAllPostedJobs(data)
        })
    }, [])



    // console.log(postedJobs);
    console.log(allPostedJobs);





    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure to delete?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://dream-job-finder-server.vercel.app/addjobs/${id}`, {
                    method: 'DELETE'
                  })
                  .then(res => res.json())
                  .then(data => {
                    if(data.deletedCount > 0){
                      const remaining = allPostedJobs.filter(job => job._id !== id)
                      setAllPostedJobs(remaining)
                    }
                  })
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });



       
      }

    return (
       <div>
        <Helmet>
          <title>Dream Job | MyPostedJobs</title>
        </Helmet>
         <div className="max-w-7xl mx-auto">
            <h1 className="text-center mt-10 text-3xl uppercase border-b-4 border-secondary w-fit mx-auto">All Posted Jobs</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
            {
                allPostedJobs.map(job => <JobCard key={job._id} job={job} handleDelete={handleDelete}></JobCard>)
            }
           </div>
        </div>
       </div>
    );
};

export default MyPostedJobs;