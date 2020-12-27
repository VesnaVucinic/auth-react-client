import React from 'react'

const Secrets = ({ secrets }) => {
    // we have incuming argument which is props, props is the main object
    //  and if has a property or key with name secrets I want to grab as variable
    //  now called secrets that will point to the value of whatever is in there 
    const secretsJSX = secrets.map(s => <p key={s.id}>{s.content}</p>)
    return (
        <div className="Secrets">
            {secretsJSX}
        </div>
    )
}

export default Secrets

// {}
// 1. to wrap functions
// 2. to wrap objects literals
// 3. to grab properties and deconstruction
// 4. to use in JSX kind of the same way we use in ARB 