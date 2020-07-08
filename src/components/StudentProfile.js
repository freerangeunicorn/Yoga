import React from 'react';
import { useState, useEffect, useContext } from "react";
import { TokenContext } from "./Context";
import { useHistory } from 'react-router-dom';



function StudentProfile() {
  const [teacherData, setTeacherData]=useState({});
  const [show, setShow ] = useState(false);
  const [token, setToken] = useState(TokenContext);
  const history = useHistory();

  useEffect(() => {

  }

  )

  //aync? Fetch?

    return (
        <div>
            Namaste 
        </div>
    )
}

export default StudentProfile;