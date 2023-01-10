import React from 'react'
import styles from '../../styles/navbar.module.css'
import { FaUserAlt,FaHistory } from 'react-icons/fa'
import { useRouter } from 'next/router';

const NavBar = ({name,setIsHistoryModelOpen}:{name:string,setIsHistoryModelOpen:React.Dispatch<React.SetStateAction<boolean>>}): JSX.Element => {

    const router = useRouter()

    function delete_cookie(name:string) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    
      const logOutHandler = async() =>{
        const res = await fetch(`/api/logout`)
    
        let response = await res.json();
    
        if(response.message = 'Success'){
          delete_cookie('token')
          router.reload()
        }
      }


    return (
        <div className={'wrapper ' + styles.navbar}>

          
                <span className={styles.user}>
                    <FaUserAlt color='#4d54bd' size={22} style={{ marginRight: '0.8rem' }} />
                    {name}
                </span>
 

            <div>


                <button onClick={()=>setIsHistoryModelOpen(prv=>!prv)}>History<FaHistory color='#f65a41'/></button>
                <button onClick={logOutHandler}>Logout</button>

            </div>

        </div>
    )

}

export default NavBar