const Login = () => {
    return (
        <fieldset>
            <div className="row mb-3">
                <label htmlFor="email" className="col-sm-3 col-form-label">
                Email
                </label>
                <div className="col-sm-9">
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Ingresar correo"
                    />
                </div>
            </div>

            <div className="row mb-3">

                <label htmlFor="password" className="col-sm-3 col-form-label">
                Contraseña
                </label>

                <div className="col-sm-9">

                    <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Ingresar contraseña"
                    />
                </div>
            </div>
        <div className="row mt-4">
            <div className="col-sm-12">
                <button className="btn btn-danger w-100 fw-bold">
                Ingresar
                </button>
            </div>
        </div>
    </fieldset>
    );
};

export default Login;
