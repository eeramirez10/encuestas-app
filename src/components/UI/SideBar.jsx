import React from 'react'
import { Link } from 'wouter'

const SideBar = () => {


    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <div >
                        <button >
                        <Link  to='/encuesta/new'> New </Link>
                        </button>

                        
                    </div>
                </div>
                <nav>
  

                </nav>
            </div>



        </>
    )
}

export default SideBar