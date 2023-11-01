import React, { useState } from 'react'
import AdminNav from '../Components/AdminNavBar';

function AdminDash() {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <AdminNav />
            <div className="contactBody">
                {loading ? (
                    <div className="loading">
                        <h2 style={{ fontWeight: "lighter", textAlign: "center" }}>Loading...</h2>
                        <div className="loader">
                        </div>
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDash