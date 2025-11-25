function PageLogin(){
    return(
        <><div className="sidenav">
            <div className="login-main-text">
                <h2>Application Login Page</h2>
                <p>Login or register from here to access.</p>
            </div>
        </div><div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>User Name</label>
                                
                                </div>
                            <div className="form-group">
                                <label>Password</label>
                                
                                </div>
                            <button type="submit" className="btn btn-black">Login</button>
                            <button type="submit" className="btn btn-secondary">Register</button>
                        </form>
                    </div>
                </div>
            </div></>

    )
}
export default PageLogin;