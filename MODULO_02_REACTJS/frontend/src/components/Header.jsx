import React from 'react'

export default function Header({title, children}) {
    return (
        <div>
             <header><h1>{title}</h1>
                {children}
             </header>
        </div>
    )
}
