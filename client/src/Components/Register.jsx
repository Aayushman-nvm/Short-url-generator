import React from 'react'

function Register({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
}) {
    return (
        <div>Register
            <input
                placeholder="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name || ""}
                name="name" />
            {touched.name && errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
            )}
        </div>
    )
}

export default Register